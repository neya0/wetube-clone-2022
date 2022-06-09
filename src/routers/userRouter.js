import express from "express";
import { getEdit, postEdit, seeProfile, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatar.single("avartar"), postEdit);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id([0-9a-f]{24})", seeProfile);


export default userRouter;