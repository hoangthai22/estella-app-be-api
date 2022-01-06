import Joi from "joi";
import { getDB } from "./../config/mongodb.js";
import { ObjectId } from "mongodb";
import slug from "slug";
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
  hotProduct: Joi.boolean().default(false),
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
  return await productsCollectionSchema.validateAsync(data, { abortEarly: false }, function (err, value) {
    if (err) console.log({ err });
    return catched(err.message);
  });
};

const getAllProducts = async (permission) => {
  try {
    console.log({ permission });
    if (permission === "admin") {
      const result = await getDB().collection(productCollection).find().toArray();
      return result;
    } else {
      const result = await getDB().collection(productCollection).find({ _destroy: false }).toArray();
      return result;
    }
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
    console.log({data});
    const slugtest = slug(data.productName, "-")
    console.log({slugtest});
    const value = await validateSchema(data);
    // const result = await getDB().collection(productCollection).insertOne(value);

    return true;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};

const getProduct = async (data) => {
  try {
    const result = await getDB()
      .collection(productCollection)
      .findOne({ _id: new ObjectId(data) });
    return result;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};

const getProductsByCategory = async (slug, page, limit) => {
  try {
    const result = await getDB()
      .collection(productCollection)
      .find({
        "category.slug": slug,
      })
      .limit(parseInt(limit))
      .skip(parseInt(limit) * (page - 1))
      .toArray();
    let newProducts = result.map((item) => {
      return {
        id: item._id,
        productName: item.productName,
        productImg: item.productImg,
        price: item.price,
        sale: item.sale,
        slug: item.slug,
      };
    });
    return newProducts;
  } catch (error) {
    throw new Error(error?.details[0]?.message);
  }
};

const updateProduct = async (id, data) => {
  try {
    const result = await getDB()
      .collection(productCollection)
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
export const ProductModel = { getAllProducts, remove, createProduct, getProduct, getProductsByCategory, updateProduct };
