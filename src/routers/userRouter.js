import express from "express";
import { getEdit, postEdit, remove, see, logout, startGithubLogin, finishGithubLogin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout",logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/remove",remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id",see);

export default userRouter;