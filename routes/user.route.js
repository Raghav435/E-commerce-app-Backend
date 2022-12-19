const express = require("express");
const { register, login } = require("../controllers/authController");
const User = require("../models/user.model");
const userRouter = express.Router();

userRouter.post(
  "/register",
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    // .isLength({ min: 4 })
    // .withMessage("First Name must be at least 4 characters"),
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 4 characters"),
  body("email")
    .isEmail()
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("password").not().isEmpty().withMessage("Password is required"),
  // .custom((value, { req }) => {
  //   if (value !== req.body.confirmPassword) {
  //     throw new Error("Password and confirm password should match");
  //   }
  //   return true;
  // })
  body("phone").custom((value) => {
    if (value && value.length != 10) {
      throw new Error("phone number should have 10 digits");
    }
    return true;
  }),
  register
);

userRouter.post(
  "/login",
  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (!user) {
        throw new Error("Email is not registered");
      }
      return true;
    }),
  body("password").not().isEmpty().withMessage("Password is required"),
  login
);

module.exports = userRouter;
