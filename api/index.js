const express = require('express');
const cosrs = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

app.use(express.json());

const whitlist = [
  'http://localhost:8080',
  'https://specific-domain.co',
  'https://otro-specific-domain.co'
];

const options = {
  origin: (origin, callback) => {
    if(whitlist.includes(origin) || !origin) {
      callback(null, true);
    }else{
      callback(new Error('No permitido'))
    }
  }
}

app.use(cosrs(options))

app.get('/', (req, res) => {
  res.send('Hello World');
});

routerApi(app);

//Los middleware de error deben realizarse después de defnir el routing.
//Es importante también entender en que orden se ejecutan los middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/node-example',).then(() => {
  console.log('Conexión exitosa a MongoDB');
}).catch(error => {
  console.error('Error de conexión:', error);
});

app.listen(port, () => {
  console.log('Port: '+ port)
});
