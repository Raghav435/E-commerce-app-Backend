const express = require("express");
require("dotenv").config();
const connect = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const productController = require("./controllers/product.controller");
const userRouter = require("./routes/user.route");
const userController = require("./controllers/user.controller");
const paymentController = require("./controllers/payment.controller");

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
app.use("/user", userController);
app.use("/payment", paymentController);

// API for PAYMENT

app.post("/payment/create", async (req, res) => {
  let total = req.body.amount;
  console.log("Payment Request recieved for this ruppess", total,typeof(total));

  total = Number(total);
const paymentIntent = await stripe.paymentIntents.create({
  amount: 100,
  currency: "inr",
  payment_method_types: ["card"],
});

  console.log(paymentIntent)

  res.status(201).send({clientSecret: paymentIntent.client_secret});
});

const port = process.env.PORT || 4040;
app.listen(port, async () => {
  try {
    await connect();
    console.log(
      `Successfully connected to database & server is running on ${port}`
    );
  } catch (error) {
    console.log("error:", error);
  }
});
