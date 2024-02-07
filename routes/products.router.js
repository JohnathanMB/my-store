const express = require('express');
const ProductsService = require("./../services/products.service");

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  res.status(200).json(service.find())
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro')
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);

  return validResponse(res, product);
});

router.post('/', (req, res) => {
  const body = req.body;

  const newProduct = service.create(body);

  res.status(201).json({
    message: "Created",
    data: newProduct
  });

})

router.patch('/:id', (req, res) => {

  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'update',
    data: body,
    id
  })

})

router.delete('/:id', (req, res) => {

  const { id } = req.params;

  res.json({
    message: 'delete',
    id
  })

})

function validResponse(res, responseToValid){
  const response = ((responseToValid != null)
    ? res.json(responseToValid)
    : res.status(404).json({ message: "Not Found" })
  );
  return response;
}

module.exports = router;
