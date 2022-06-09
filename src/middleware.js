import multer from "multer";
import req from "express/lib/request";


export const localsMiddleware = (req, res,next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const protectorMiddleware = (req, res, next) =>{
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) =>{
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
};

export const uploadAvatar = multer({dest: "uploads/avatar", limits: 1048576});
export const uploadVideo = multer({dest: "uploads/video", limits: 10485760});