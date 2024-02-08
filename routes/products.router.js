const express = require('express');
const ProductsService = require("./../services/products.service");

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  res.status(200).json(await service.find())
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro')
})

router.get('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    return res.json(product);
  } catch (error) {
    //Hacemos uso de forma explicita los middleware de error;
    next(error);
  }

});

router.post('/', async (req, res) => {

  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: "Created",
    data: newProduct
  });

})

router.patch('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'update',
      data: product
    })
  } catch (error) {
    next(error);
  }


})

router.delete('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const productId = await service.delete(id);

    res.json({
      message: 'delete',
      productId
    })
  } catch (error) {
    next(error);
  }

})

module.exports = router;
