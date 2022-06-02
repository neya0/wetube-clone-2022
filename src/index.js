import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { promise } from "bcrypt/promises";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

const promise1 = new promise((resolve, reject) =>{
  resolve();
});
promise1
  .then(()=>{
    console.log("Then!");
  })
  .catch(()=>{console.log("Carch!");});

// Codesanbox does not need PORT :)
app.listen(4000, () => console.log(`Listening!`));
