import { ProductModel } from "../models/products-model.js";
import { HttpStatusCode } from "./../utils/constants.js";

const getAllProducts = async (req, res) => {
  try {
    const { permission } = req.query;
    const result = await ProductModel.getAllProducts(permission);
    res.status(HttpStatusCode.SUCCESS).json(result);
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

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductModel.getProduct(id);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { categoryId, page, limit } = req.query;
    const result = await ProductModel.getProductsByCategory(categoryId, page, limit);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductModel.updateProduct(id, req.body);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};
export const ProductController = { getAllProducts, remove, createProduct, getProduct, getProductByCategory, updateProduct };
