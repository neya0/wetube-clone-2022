import Video from "../models/Video";

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
    const video = await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle: "Video not found."});
    }
    return res.render("watch", {pageTitle: video.title, video});
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle: "Video not found."});
    }
    return res.render("edit-video", {pageTitle: `Edit: ${video.title}`, video});
};
export const postEdit = async (req, res) => {
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id: id});
    if(!video){
        return res.render("404",{pageTitle: "Video not found."});
    }
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
    const {title, description, hashtags} = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch(error){
        console.log(error);
        return res.render("upload", {
            pageTitle: "Upload", 
            errorMessage: error._message,
        });
    }
};

export const deleteVideo = async (req, res) => {
    const {id} = req.params;
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