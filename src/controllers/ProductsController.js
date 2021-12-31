import { ProductModel } from "../models/products-model.js";
import { HttpStatusCode } from "./../utils/constants.js";

const getAllProducts = async (req, res) => {
  try {
    const result = await ProductModel.getAllProducts();
    res.status(HttpStatusCode.CREATED).json(result);
  } catch (error) {
    console.log("errorController: " + error);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error,
    });
  }
};

export const ProductController = { getAllProducts };