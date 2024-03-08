const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const port = 6000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});

//betulsofu
//ZMlBDCT8m3tQyEgt
