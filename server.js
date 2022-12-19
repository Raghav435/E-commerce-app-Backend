const express = require("express");
require("dotenv").config();
const connect = require("./config/db");

const app = express();

const port = process.env.PORT || 4040;
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Successfully connected to database & server is running on ${port}`) ;
  } catch (error) {
    console.log("error:", error) ;
  }
});