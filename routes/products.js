const { Product, validate } = require("../models/product");
const { Category } = require("../models/category");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find()
    .select("-__v")
    .sort("name");
  res.send(products);
});

router.post("/", [auth], async (req, res) => {
  console.log("inside post");
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(JSON.stringify(req.body));
  const category = await Category.findById(req.body.CategoryId);
  //console.log(category);
  if (!category) return res.status(400).send("Invalid category.");

  const product = new Product({
    Title: req.body.Title,
    Category: {
      _id: category._id,
      name: category.name
    },
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    IsDeleted: req.body.IsDeleted,
    liked: req.body.liked
  });
  await product.save();

  res.send(product);
});

router.put("/:id", [auth], async (req, res) => {
  console.log("inside put product");
  const { error } = validate(req.body);
  console.log("error: " + error);
  if (error) return res.status(400).send(error.details[0].message);
  console.log("category: " + JSON.stringify(req.body));
  const category = await Category.findById(req.body.CategoryId);
  if (!category) return res.status(400).send("Invalid genre.");
  console.log(JSON.stringify(req.params));
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      Title: req.body.Title,
      Category: {
        _id: category._id,
        name: category.name
      },
      Quantity: req.body.Quantity,
      Price: req.body.Price,
      IsDeleted: req.body.IsDeleted,
      liked: req.body.liked
    },
    { new: true }
  );

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");

  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
