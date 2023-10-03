import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./dirname.js";

import homeRouter from "./routes/home.router.js";
import productRouter from "./routes/products.router.js";
import { Server } from "socket.io";

import { manager } from "./utils/managers/productManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//---------------------------------------------------//
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//---------------------------------------------------//
app.use("/products", productRouter);
app.use("/", homeRouter);

const httpServer = app.listen(8080, () => {
  console.log("escuchando puerto 8080");
});

// generar socket del lado del servidor
const socketServer = new Server(httpServer);
