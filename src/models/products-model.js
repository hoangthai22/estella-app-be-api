import Joi from "joi";
import { getDB } from "./../config/mongodb.js";
import { ObjectId } from "mongodb";

//Defint Board collection
const productCollection = "products";
const productsCollectionSchema = Joi.object({
  productImg: Joi.string().required().min(3).max(500).trim(),
  productName: Joi.string().required().min(3).max(50).trim().messages({
    "string.base": `Product Name should be a type of 'text'`,
    "string.empty": `Product Name cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`,
    "any.required": `Product Name is a required field`,
  }),
  price: Joi.number().integer().required(),
  sale: Joi.number().integer().required(),
  _destroy: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  totalSize: Joi.array().required(),
  size: Joi.array().required(),
  listImgDetail: Joi.array().required(),
  category: Joi.object().required(),
  slug: Joi.string().required().min(1).max(50).trim(),
});

// khi có abortEarly thì khi nó validate bth nó sẽ là true thì khi gặp lỗi nó sẽ dừng 1
//lỗi đầu tiên và quăng lỗi đó ra mà k quăng các lỗi phía dưới, còn khi set nó false thì
//nó sẽ qunawg tất cả lỗi ra
const validateSchema = async (data) => {
  return await productsCollectionSchema.validateAsync(data, { abortEarly: false },function(err, value){
    if(err) console.log({err});
    return catched(err.message);
  });
};

const getAllProducts = async () => {
  try {
    const result = await getDB().collection(productCollection).find({ _destroy: false }).toArray();

    console.log("data", result);
    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};
const remove = async (id) => {
  try {
    const result = await getDB().collection(productCollection).remove();
    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};

const createProduct = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB().collection(productCollection).insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};
export const ProductModel = { getAllProducts, remove, createProduct };
