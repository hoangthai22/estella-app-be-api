import { CategoryModel } from "../models/category-model.js";
import { HttpStatusCode } from "../utils/constants.js";

const getAllCategorys = async (req, res) => {
  try {
    const result = await CategoryModel.getAllCategorys();
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
    const result = await CategoryModel.remove();
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

const createCategory = async (req, res) => {
  try {
    const result = await CategoryModel.createCategory(req.body);

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
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CategoryModel.updateCategory(id, req.body);
    res.status(HttpStatusCode.SUCCESS).json(result);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

// const getProductsByCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await CategoryModel.getProductsByCategory(id);
//     res.status(HttpStatusCode.SUCCESS).json(result);
//   } catch (error) {
//     res.status(HttpStatusCode.INTERNAL_SERVER).json({
//       errors: error.message,
//     });
//   }
// };
export const CategoryController = { getAllCategorys, remove, createCategory, updateCategory };
