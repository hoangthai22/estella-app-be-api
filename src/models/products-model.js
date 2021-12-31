import Joi from "joi";
import { getDB } from "./../config/mongodb.js";
import { ObjectId } from "mongodb";

//Defint Board collection
const productCollection = "products";
const productsCollectionSchema = Joi.object({
  productId: Joi.string().required().min(3).max(20).trim(),
});

// khi có abortEarly thì khi nó validate bth nó sẽ là true thì khi gặp lỗi nó sẽ dừng 1
//lỗi đầu tiên và quăng lỗi đó ra mà k quăng các lỗi phía dưới, còn khi set nó false thì
//nó sẽ qunawg tất cả lỗi ra
const validateSchema = async (data) => {
  return await productsCollectionSchema.validateAsync(data, { abortEarly: false });
};

const getAllProducts = async () => {
  try {
    // const value = await validateSchema();
    // const result = await getDB()
    //   .collection(productCollection)
    //   .insertOne(value);
    // const findModel = await getDB()
    //   .collection(productCollection)
    //   .findOne({
    //     _id: new ObjectId(result.insertedId.toString()),
    //   });
    console.log("data", "ok");
    return true;
  } catch (error) {
    throw new Error(error);
  }
};



export const ProductModel = { getAllProducts };
