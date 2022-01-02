import Joi from "joi";
import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

//Defint Board collection
const categoryCollection = "categorys";
const categorysCollectionSchema = Joi.object({
  categoryImg: Joi.string().required().min(3).max(500).trim(),
  categoryName: Joi.string().required().min(3).max(50).trim().messages({
    "string.base": `Product Name should be a type of 'text'`,
    "string.empty": `Product Name cannot be an empty field`,
    "string.min": `"a" should have a minimum length of {#limit}`,
    "any.required": `Product Name is a required field`,
  }),
  _destroy: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  slug: Joi.string().required().min(1).max(50).trim(),
});

// khi có abortEarly thì khi nó validate bth nó sẽ là true thì khi gặp lỗi nó sẽ dừng 1
//lỗi đầu tiên và quăng lỗi đó ra mà k quăng các lỗi phía dưới, còn khi set nó false thì
//nó sẽ qunawg tất cả lỗi ra
const validateSchema = async (data) => {
  return await categorysCollectionSchema.validateAsync(data, { abortEarly: false });
};

const getAllCategorys = async () => {
  try {
    const result = await getDB().collection(categoryCollection).find({ _destroy: false }).toArray();

    console.log("data", result);
    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};
const remove = async (id) => {
  try {
    const result = await getDB().collection(categoryCollection).remove();
    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};

const createCategory = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB().collection(categoryCollection).insertOne(value);

    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};

const updateCategory = async (id, data) => {
  try {
    const result = await getDB()
      .collection(categoryCollection)
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
    throw new Error(error?.details[0]?.message);
  }
};

// const getProductsByCategory = async (data) => {
//   try {
//     const result = await getDB().collection(productCollection).findOne({ _id: new ObjectId(data) });
//     return result;
//   } catch (error) {
//     throw new Error(error?.details[0]?.message);
//   }
// };

export const CategoryModel = { getAllCategorys, remove, createCategory, updateCategory };
