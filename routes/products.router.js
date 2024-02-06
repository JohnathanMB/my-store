const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();

router.get('/', (req, res) => {

  const products = [];
  const { size=10 } = req.query;

  for( let index=1; index <= size; index++){
    products.push({
      id: index,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }

  res.json(products)
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro')
})

router.get('/:id', (req, res) =>{
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Product 2',
    price: 2000
  })
});

router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: "Created",
    data: body
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


module.exports = router;
