import express from "express";

const PORT = 4500;

const app = express();

const urlLogger = (req, res, next) =>{
    console.log(`Path: ${req.method} ${req.path}`);
    next();
}

const timeLogger = (req,res,next) =>{
    const date = new Date();
    console.log(`Time: ${date.getFullYear()}. ${date.getMonth()}. ${date.getDay()}`);
    next();
}

const securityLogger = (req, res, next) =>{
    const proto = req.protocol; 
    if(proto === "https"){
        console.log("secure");
    }
    console.log("insecure");
    next();
}

const protectorMiddleware = (req, res) =>{
    return res.end();
}

app.use(urlLogger, timeLogger, securityLogger);
app.use('/protected', protectorMiddleware);
app.get("/", 
    (req, res) => { return res.send("<h1>Hello</h1>");
});

const habdleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, habdleListening);