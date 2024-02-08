const Joi = require('joi');

//Definición de validaciones de formatos
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);
const price = Joi.number().integer().min(10);
const url = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  url : url.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price
});

const getByIdProductSchema = Joi.object({
  id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getByIdProductSchema }
