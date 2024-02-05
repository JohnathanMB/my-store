const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/nueva-ruta', (req, res) => {
  res.json({
    message: "Esta es la prueba de una nueva ruta"
  })
})

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000
    },
    {
      name: 'Product 2',
      price: 2000
    }
  ])
});

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

app.listen(port, () => {
  console.log('Port: '+ port)
});
