import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./dirname.js";
import { join } from "path";
import homeRouter from "./routes/home.router.js";
import productRouter from "./routes/products.router.js";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//---------------------------------------------------//
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

//---------------------------------------------------//
app.use("/products", productRouter);
app.use("/", homeRouter);

app.listen(8080, () => {
  console.log("escuchando puerto 8080");
});

// const socketServer = new Server(httpServer);
