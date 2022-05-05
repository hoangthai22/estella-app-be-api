import express from "express";
import { ProductOrderController } from "../controllers/ProductOrderController.js";

const router = express.Router();

router.route("/product-order").get(ProductOrderController.getAllProductOrders);
router.route("/product-order").delete(ProductOrderController.remove);
router.route("/product-order").post(ProductOrderController.createProductOrder);
router.route("/product-order/:id").get(ProductOrderController.getProductOrderById);
router.route("/product-order/:id").put(ProductOrderController.updateProductOrder);
export const apiProductOrder = router;
