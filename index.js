const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes')

routerApi(app);

app.get('/', (req, res) => {
  res.send('Hello World');
})

app.get('/nueva-ruta', (req, res) => {
  res.json({
    message: "Esta es la prueba de una nueva ruta"
  })
})

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
