const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", CategorySchema);
module.exports= Category;