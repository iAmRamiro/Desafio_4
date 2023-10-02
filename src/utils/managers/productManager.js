import fs from "fs";
const path = "productsManager.json";

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async getProducts(queryObject) {
    try {
      const exist = fs.existsSync(this.path);
      const { limit } = queryObject;
      if (exist) {
        const productFile = await fs.promises.readFile(this.path, "utf-8");
        const productData = JSON.parse(productFile);
        return limit ? productData.slice(0, limit) : productData;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(prod) {
    try {
      const products = await this.getProducts({});

      const existingProduct = products.find(
        (product) =>
          product.title === prod.title &&
          product.description === prod.description &&
          product.price === prod.price &&
          product.thumbnail === prod.thumbnails &&
          product.code === prod.code &&
          product.stock === prod.stock &&
          product.category === prod.category
      );

      if (existingProduct) {
        console.log("El producto ya existe.");
        return existingProduct;
      }

      if (
        !prod.title ||
        !prod.description ||
        !prod.price ||
        !prod.thumbnails ||
        !prod.code ||
        !prod.stock ||
        !prod.category
      ) {
        return "All the fields are requiered. The product must contain: Title, Description, Price, Thumbnail, Code, Stock";
      }

      let id = !products.length ? 1 : products[products.length - 1].id + 1;
      const newProduct = { id, ...prod, status: true };
      products.push(newProduct);
      await fs.promises.writeFile(path, JSON.stringify(products));
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts({});
      const productFound = products.find((prod) => prod.id === id);
      return productFound;
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProducts({});
      const productIndex = products.findIndex((p) => p.id === id);
      productIndex === -1 && null;
      const updateProduct = { ...products[productIndex], ...obj };
      products.splice(productIndex, 1, updateProduct);
      await fs.promises.writeFile(path.JSON.stringify(products));
      return updateProduct;
    } catch (error) {
      throw new Error("product not found");
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts({});
      const product = products.find((prod) => prod.id === id);
      if (product) {
        const newArray = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      }
      return product;
    } catch (error) {
      return error;
    }
  }
}

export const manager = new ProductManager(path);
