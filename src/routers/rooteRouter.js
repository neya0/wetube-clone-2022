import express from "express";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userController";

const rooteRouter = express.Router();

rooteRouter.get("/",home);
rooteRouter.route("/join").get(getJoin).post(postJoin);
rooteRouter.route("/login").get(getLogin).post(postLogin);
rooteRouter.get("/search", search);

export default rooteRouter;