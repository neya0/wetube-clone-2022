import Video from "../models/Video";
import User from "../models/User";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({createdAt: "desc"});
        return res.render("home", {pageTitle: "Home", videos});
    }catch{
        return res.render("Server-error");
    }
};
export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner");
    if(!video){
        return res.status(404).render("404",{pageTitle: "Video not found."});
    }
    return res.render("watch", {pageTitle: video.title, video});
};
export const getEdit = async (req, res) => {
    const { 
        session: { user: {_id}},
        params: {id} } = req;
    const video = await Video.findById(id);
    if(String(video.owner) !== String(_id)){
        return res.redirect("/");
    };
    if(!video){
        return res.status(404).render("404",{pageTitle: "Video not found."});
    }
    return res.render("editVideo", {pageTitle: `Edit: ${video.title}`, video});
};
export const postEdit = async (req, res) => {
    const {
        params: {id},
        body: {title, description, hashtags},
        session: {_id: sessionId}
    } =req;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404",{pageTitle: "Video not found."});
    };
    if(String(video.owner) !== String(sessionId)){
        return res.redirect("/");
    };
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload"});
};
export const postUpload = async (req, res) => {
    const {
        session: {user: {_id}},
        body: {title, description, hashtags},
        file
    } = req;
    try{
        const newVideo = await Video.create({
            videoUrl: file.path,
            title,
            description,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo);
        user.save();
        return res.redirect("/");
    } catch(error){
        return res.status(400).render("upload", {
            pageTitle: "Upload", 
            errorMessage: error._message,
        });
    }
};

export const deleteVideo = async (req, res) => {
    const { 
        session: {user: {_id}},
        params: {id}
    } = req;
    const video = await Video.findById(id);
    if(String(video.owner) !== String(_id)){
        return res.redirect("/");
    };
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};
export const search = async (req, res) => {
    const {keyword} = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"),
            },
        });
    }
    res.render("search", {pageTitle: "Search Video", videos});
};