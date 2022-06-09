import express from "express";
import { 
    watch,
    getEdit,
    postEdit,
    deleteVideo,
    getUpload,
    postUpload
} from "../controllers/videoController";
import { protectorMiddleware, uploadVideo } from "../middleware";

const videoRouter = express.Router();

videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadVideo.single("uploadVideo"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})",watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, deleteVideo);

export default videoRouter;