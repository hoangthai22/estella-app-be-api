import express from "express";
import { connectDB, getDB } from "./src/config/mongodb.js";
import cors from "cors";
import { apiProduct } from "./src/routes/products-route.js";
import { apapiCategory } from "./src/routes/category-route.js";
const port = 3000;

const bootServer = () => {
  const app = express();
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  //Enable req.body.data
  app.use(express.json());
  //Use Apis v1
  app.use("/api", apiProduct);
  app.use("/api", apapiCategory);

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
