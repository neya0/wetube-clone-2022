import express from "express";
import { edit, remove, see, logout, fake } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout",logout);
userRouter.get("/edit",edit);
userRouter.get("/remove",remove);
userRouter.get("/:id",see);

export default userRouter;