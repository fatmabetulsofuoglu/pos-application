const Customer = require("../models/Customer.js");
const express = require("express");
const router = express.Router();

//! get all Customer
router.get("/get-all", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! get a Customer
router.get("/", async (req, res) => {
  const customerID = req.body.customerID;
  try {
    const customer = await Customer.findById(customerID);
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! create
router.post("/add-customer", async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    res.status(200).json("Customer added successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update
router.put("/update-customer", async (req, res) => {
  try {
    await Customer.findOneAndUpdate({ _id: req.body.UserId }, req.body);
    res.status(200).json("Customer updated successfully.");
  } catch (error) {
    console.log(error);
  }
});

//! delete
router.delete("/delete-customer", async (req, res) => {
  try {
    await Customer.findOneAndDelete({ _id: req.body.UserId });
    res.status(200).json("Item deleted successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
