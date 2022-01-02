import express from "express";
import { CategoryController } from "../controllers/CategoryController.js";

const router = express.Router();

//Get v1/status
router.get("/status", (req, res) =>
  res.status(200).json({
    status: "OK Nha!",
  })
);

router.route("/categorys").get(CategoryController.getAllCategorys);
router.route("/categorys").delete(CategoryController.remove);
router.route("/categorys").post(CategoryController.createCategory);
router.route("/category/:id").put(CategoryController.updateCategory);
export const apapiCategory = router;
