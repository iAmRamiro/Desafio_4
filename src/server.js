import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./dirname.js";
import { join } from "path";
import homeRouter from "./routes/home.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));
console.log(join(__dirname, "views"));

app.use("/api", homeRouter);

app.listen(8080, () => {
  console.log("escuchando puerto 8080");
});
