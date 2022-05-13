let videos = [
    {
        title: "video #1",
        rating: 5,
        comments: 2,
        createdAt: "jisung",
        views: 59,
        id: 1,
    },
    {
        title: "video #2",
        rating: 5,
        comments: 2,
        createdAt: "jisung",
        views: 59,
        id: 2,
    },
    {
        title: "video #3",
        rating: 5,
        comments: 2,
        createdAt: "jisung",
        views: 59,
        id: 3,
    },
];


export const homepage = (req, res) => {
    return res.render("home", {pageTitle: "Home", videos});
};
export const watch = (req, res) => {
    const {id} = req.params;
    const video = videos[id -1]
    return res.render("watch", {pageTitle: `Watching: ${video.title}`, video});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id -1]
    return res.render("edit-video", {pageTitle: `Editing: ${video.title}`, video});
};
export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    videos[id -1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload", videos});
};
export const postUpload = (req, res) => {
    const {tie} = req.body;
    const newVideo ={
        title: tie,
        rating: 5,
        comments: 2,
        createdAt: "jisung",
        views: 59,
        id: videos.length + 1,
    }
    videos.push(newVideo);
    return res.redirect("/");
};

export const remove = (req, res) => res.render("delete-video", {pageTitle: "Delete Video"});
export const search = (req, res) => res.render("search", {pageTitle: "Search Video"});