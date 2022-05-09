import express from "express";
import { watch, edit, remove, upload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload",upload);
videoRouter.get("/:id",watch);
videoRouter.get("/:id/edit",edit);
videoRouter.get("/:id/remove",remove);

export default videoRouter;