import { ProductOrderModel } from "../models/productOrder-model.js";
import { HttpStatusCode } from "../utils/constants.js";

const getAllProductOrders = async (req, res) => {
    try {
        const { page, limit } = req.params;
        const result = await ProductOrderModel.getAllProductOrders(page, limit);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};
const getProductOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProductOrderModel.getProductOrderById(id);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};

const createProductOrder = async (req, res) => {
    try {
        const result = await ProductOrderModel.createProductOrder(req.body);

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
        const result = await ProductOrderModel.remove();
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
const updateProductOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ProductOrderModel.updateProductOrder(id, req.body);
        res.status(HttpStatusCode.SUCCESS).json(result);
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            errors: error.message,
        });
    }
};
export const ProductOrderController = { createProductOrder, getAllProductOrders, remove, updateProductOrder, getProductOrderById };
