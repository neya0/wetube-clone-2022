import express from "express";
import { homepage, search } from "../controllers/videoController";
import { joinPage, login } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/",homepage);
globalRouter.get("/join", joinPage);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;