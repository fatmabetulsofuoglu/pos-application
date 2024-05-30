const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", CustomerSchema);
module.exports= Customer;