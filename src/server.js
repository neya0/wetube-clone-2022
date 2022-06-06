import express from "express";
import morgan from "morgan";
import session from "express-session";
import mongoStore from "connect-mongo";
import rooteRouter from "./routers/rooteRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const middlewareLogger = morgan("dev"); 

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(middlewareLogger);
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);

app.use(localsMiddleware);
app.use("/", rooteRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;