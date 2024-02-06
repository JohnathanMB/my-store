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

module.exports = router;
