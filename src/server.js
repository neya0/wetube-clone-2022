import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4500;

const app = express();
const middlewareLogger = morgan("dev"); 

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(middlewareLogger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const habdleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, habdleListening);