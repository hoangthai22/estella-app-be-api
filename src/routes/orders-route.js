import express from "express";
import { OrderController } from "../controllers/OrderController.js";

const router = express.Router();

router.route("/orders").get(OrderController.getAllOrders);
router.route("/orders/search").get(OrderController.searchByKeyOrder);
router.route("/orders/finish").get(OrderController.getOrderIsFinish);
router.route("/orders/revenue").get(OrderController.getOrderRevenue);
router.route("/orders").delete(OrderController.remove);
router.route("/orders").post(OrderController.createOrder);
router.route("/orders/:id").get(OrderController.getOrderById);
router.route("/orders/:id").put(OrderController.updateOrder);
export const apiOrder = router;
