const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});

routerApi(app);

//Los middleware de error deben realizarse después de defnir el routing.
//Es importante también entender en que orden se ejecutan los middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Port: '+ port)
});
