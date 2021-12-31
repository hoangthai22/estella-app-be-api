import express from "express";
import { ProductController } from "../controllers/ProductsController.js";

const router = express.Router();

//Get v1/status
router.get("/status", (req, res) =>
  res.status(200).json({
    status: "OK Nha!",
  })
);

router.route("/products").get(ProductController.getAllProducts);

export const api = router;
