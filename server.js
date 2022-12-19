const express = require("express");
require("dotenv").config();
const connect = require("./config/db");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const productController = require("./controllers/product.controller");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/fraazo", productController);
app.use("/user", userController);
app.use("/payment", paymentController);

const port = process.env.PORT || 4040;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Successfully connected to database & server is running on ${port}`) ;
  } catch (error) {
    console.log("error:", error) ;
  }
});