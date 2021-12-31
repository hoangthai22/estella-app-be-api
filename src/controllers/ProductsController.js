import { ProductModel } from "../models/products-model.js";
import { HttpStatusCode } from "./../utils/constants.js";

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductModel.getAllProducts();
    res.status(HttpStatusCode.CREATED).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const result = await ProductModel.remove();
    if (result.acknowledged) {
      res.status(HttpStatusCode.CREATED).json({
        Message: "OK",
      });
    }
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const result = await ProductModel.createProduct(req.body);

    if (result.acknowledged) {
      res.status(HttpStatusCode.CREATED).json({
        Message: "OK",
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const ProductController = { getAllProducts, remove, createProduct };
