const express = require('express');
const app = express();
const port = 3000;
const { faker } = require('@faker-js/faker')

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/nueva-ruta', (req, res) => {
  res.json({
    message: "Esta es la prueba de una nueva ruta"
  })
})

app.get('/products', (req, res) => {

  const products = [];
  const { size=10 } = req.query;

  for( let index=0; index < size; index++){
    products.push({
      id: index,
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }

  res.json(products)
});

app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filtro')
})

app.get('/products/:id', (req, res) =>{
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Product 2',
    price: 2000
  })
});

app.get('/categories/:categoryId/products/:productId', (req, res)=>{
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if( limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.json({
      message: "No hay parametros"
    })
  }

})

app.listen(port, () => {
  console.log('Port: '+ port)
});
