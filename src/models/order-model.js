import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb.js";

//Defint Board collection
const ordersCollection = "orders";
const ordersCollectionSchema = Joi.object({
    productOrders: Joi.array().required(),
    information: Joi.string().required().min(0).max(500).trim(),
    _destroy: Joi.boolean().default(false),
    isFinish: Joi.boolean().default(false),
    pay: Joi.number().integer(),
    total: Joi.number().integer(),
    createdAt: Joi.date().timestamp(),
    updatedAt: Joi.date().timestamp().default(null),
});

// khi có abortEarly thì khi nó validate bth nó sẽ là true thì khi gặp lỗi nó sẽ dừng 1
//lỗi đầu tiên và quăng lỗi đó ra mà k quăng các lỗi phía dưới, còn khi set nó false thì
//nó sẽ qunawg tất cả lỗi ra
const validateSchema = async (data) => {
    return await ordersCollectionSchema.validateAsync(data, { abortEarly: false });
};

const getAllOrders = async (limit, page) => {
    try {
        console.log(limit, page);
        const result = await getDB()
            .collection(ordersCollection)
            .find({ _destroy: false, isFinish: false })
            .skip(parseInt(page - 1))
            .limit(parseInt(limit))
            .sort({
                createdAt: 1,
            })
            .toArray();

        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};

const getOrderIsFinish = async (limit, page) => {
    try {
        const result = await getDB()
            .collection(ordersCollection)
            .find({ _destroy: false, isFinish: true })
            .skip(parseInt(page - 1))
            .limit(parseInt(limit))
            .sort({
                createdAt: 1,
            })
            .toArray();

        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const getOrderById = async (id) => {
    try {
        const result = await getDB()
            .collection(ordersCollection)
            .findOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};

const searchByKeyOrder = async (key) => {
    try {
        const result = await getDB()
            .collection(ordersCollection)
            .find({ _destroy: false, information: { $regex: key } })
            .sort({
                createdAt: 1,
            })
            .toArray();
        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const remove = async (id) => {
    try {
        const result = await getDB().collection(ordersCollection).remove();
        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const createOrder = async (data) => {
    try {
        let total = 0;
        for (let index = 0; index < data.productOrders.length; index++) {
            total = data.productOrders[index].price + total;
        }
        const newData = { ...data, createdAt: Date.now(), total: total };
        const value = await validateSchema(newData);
        const result = await getDB().collection(ordersCollection).insertOne(value);

        return result;
    } catch (error) {
        throw new Error(error?.details[0]?.message);
    }
};
const updateOrder = async (id, data) => {
    try {
        const newData = { ...data, updatedAt: Date.now() };
        const result = await getDB()
            .collection(ordersCollection)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                {
                    $set: {
                        ...newData,
                    },
                },
                { returnDocument: "after" }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};
export const OrderModel = { createOrder, getAllOrders, getOrderIsFinish, remove, updateOrder, searchByKeyOrder, getOrderById };
