import Joi from "joi";
import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

//Defint Board collection
const productOrdersCollection = "productOrders";
const productOrdersCollectionSchema = Joi.object({
    productOrderImage: Joi.string().required().min(3).max(500).trim(),
    productOrderName: Joi.string().required().min(3).max(50).trim(),
    originalPrice: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    _destroy: Joi.boolean().default(false),
    isChecked: Joi.boolean().default(false),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
});

// khi có abortEarly thì khi nó validate bth nó sẽ là true thì khi gặp lỗi nó sẽ dừng 1
//lỗi đầu tiên và quăng lỗi đó ra mà k quăng các lỗi phía dưới, còn khi set nó false thì
//nó sẽ qunawg tất cả lỗi ra
const validateSchema = async (data) => {
    return await productOrdersCollectionSchema.validateAsync(data, { abortEarly: false });
};

const getAllProductOrders = async (page, limit) => {
    try {
        const result = await getDB()
            .collection(productOrdersCollection)
            .find({ _destroy: false })
            .skip(parseInt(page - 1))
            .limit(parseInt(limit))
            .sort({
                createdAt: -1,
            })
            .toArray();

        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const getProductOrderById = async (id) => {
    try {
        const result = await getDB()
            .collection(productOrdersCollection)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const remove = async (id) => {
    try {
        const result = await getDB().collection(productOrdersCollection).remove();
        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const createProductOrder = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(productOrdersCollection).insertOne(value);

        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const updateProductOrder = async (id, data) => {
    try {
        const result = await getDB()
            .collection(productOrdersCollection)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                {
                    $set: {
                        ...data,
                        updatedAt: Date.now(),
                    },
                },
                { returnDocument: "after" }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const ProductOrderModel = { createProductOrder, getAllProductOrders, remove, updateProductOrder, getProductOrderById };
