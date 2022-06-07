import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middleware";

const rooteRouter = express.Router();

rooteRouter.get("/",home);
rooteRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rooteRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rooteRouter.get("/search", search);

export default rooteRouter;