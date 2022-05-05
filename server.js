import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB, getDB } from "./src/config/mongodb.js";
import { apiCategory } from "./src/routes/category-route.js";
import { apiOrder } from "./src/routes/orders-route.js";
import { apiProductOrder } from "./src/routes/product-order-routes.js";
import { apiProduct } from "./src/routes/products-route.js";

dotenv.config();

export let cloudinaryConfig = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = 4000;

const bootServer = () => {
  const app = express();
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.static("public"));
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.json());
  //Use Apis v1
  app.use("/api", apiProduct);
  app.use("/api", apiCategory);
  app.use("/api", apiOrder);
  app.use("/api", apiProductOrder);

  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

connectDB()
  .then(() => {
    console.log("Connected successfully to database server");
  })
  .then(() => {
    getDB();
    bootServer();
  })
  .catch((error) => {
    console.log("error", error);
    process.exit(1);
  });
