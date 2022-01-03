import express from "express";
import { ProductController } from "../controllers/ProductsController.js";
import cloudinary from "cloudinary";
import { uploadImgMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();

//Get v1/status
router.get("/status", (req, res) =>
  res.status(200).json({
    status: "OK Nha!",
  })
);
router.route("/product").get(ProductController.getProductByCategory);
router.route("/products").get(ProductController.getAllProducts);
router.route("/products").delete(ProductController.remove);
router.route("/product").post(uploadImgMiddleware, ProductController.createProduct);
router.route("/product/:id").put(ProductController.updateProduct);
router.route("/product/:id").get(ProductController.getProduct);


export const apiProduct = router;
