const express = require('express');
const ProductsService = require("./../services/products.service");
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getByIdProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

const getAll = async (req, res) => {
  res.status(200).json(await service.find());
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    return res.json(product);
  } catch (error) {
    //Hacemos uso de forma explicita los middleware de error;
    next(error);
  }
};

const createProduct = async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: "Created",
    data: newProduct
  });

};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'update',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {

  try {
    const { id } = req.params;
    const productId = await service.delete(id);

    res.json({
      message: 'delete',
      productId
    });
  } catch (error) {
    next(error);
  }

};

router.get('/', getAll);

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro')
})

router.get('/:id',
  validatorHandler(getByIdProductSchema, 'params'),
  getById);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  createProduct)

router.patch('/:id',
  validatorHandler(getByIdProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateProduct)

router.delete('/:id',
  validatorHandler(getByIdProductSchema, 'params'),
  deleteProduct)

module.exports = router;
