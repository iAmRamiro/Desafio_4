import { manager } from "/managers/productManager.js";

const form = document.getElementById("form");
const boton = document.getElementById("addProduct");

const addProduct = async () => {
  const inputTitle = document.getElementById("title");
  const inputPrice = document.getElementById("price");
  const inputStock = document.getElementById("stock");
  const inputCategory = document.getElementById("category");
  const inputCode = document.getElementById("code");
  const inputThumbnails = document.getElementById("thumbnails");

  const data = {
    inputTitle,
    inputPrice,
    inputStock,
    inputCategory,
    inputCode,
    inputThumbnails,
  };

  await manager.addProduct(data);
};

boton.addEventListener("click", addProduct);
