const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category');

const Product = mongoose.model('Products', new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
    maxlength: 255
  },
  Category: { 
    type: categorySchema,  
    required: true
  },
  Quantity: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  Price: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100000
  },
  IsDeleted: { 
    type: Boolean, 
    required: true,
    min: 0,
    max: 255
  },
  liked: { 
    type: Boolean, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateProduct(product) {
  const schema = {
    Title: Joi.string().min(1).max(50).required(),
    CategoryId: Joi.objectId().required(),
    Quantity: Joi.number().min(0).required(),
    Price: Joi.number().min(0).required(),
    IsDeleted: Joi.boolean().required(),
    liked: Joi.boolean().required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product; 
exports.validate = validateProduct;