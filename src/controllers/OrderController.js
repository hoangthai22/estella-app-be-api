import { OrderModel } from "../models/order-model.js";
import { HttpStatusCode } from "../utils/constants.js";

const getAllOrders = async (req, res) => {
    const { limit, page } = req.query;
    try {
        const result = await OrderModel.getAllOrders(limit, page);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};
const getOrderIsFinish = async (req, res) => {
    const { limit, page } = req.query;
    try {
        const result = await OrderModel.getOrderIsFinish(limit, page);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OrderModel.getOrderById(id);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};
const searchByKeyOrder = async (req, res) => {
    try {
        const { q } = req.query;
        const result = await OrderModel.searchByKeyOrder(q);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};

const createOrder = async (req, res) => {
    try {
        const result = await OrderModel.createOrder(req.body);

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
const remove = async (req, res) => {
    try {
        const result = await OrderModel.remove();
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

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await OrderModel.updateOrder(id, req.body);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};
export const OrderController = { createOrder, getAllOrders, getOrderIsFinish, remove, updateOrder, searchByKeyOrder, getOrderById };
