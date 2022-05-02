import express from "express";

const PORT = 4500;

const app = express();

app.get("/", (req, res) => {
    return res.send("I still love you");
});

app.get("/login", (req, res) =>{
    return res.send("login here");
});

const habdleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, habdleListening);