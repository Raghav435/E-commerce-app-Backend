const express = require("express");
require("dotenv").config();
const connect = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const productController = require("./controllers/product.controller");
const userRouter = require("./routes/user.route");
const userController = require("./controllers/user.controller");


const app = express();
app.use(cors());
app.use(express.json());

// app.use("/", (req, res) => {
//   res.send(
//     `<h1 style="color:#C7AA8D;font-size:46px;margin:20px auto;">Welcome to Ecommece App Backend Api</h1>`
//   );
// });
app.use("/product", productController);
app.use("/", userRouter);
app.use("/user", userController)

const port = process.env.PORT || 4040;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Successfully connected to database & server is running on ${port}`) ;
  } catch (error) {
    console.log("error:", error) ;
  }
});