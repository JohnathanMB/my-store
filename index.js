const express = require('express');
const app = express();
const port = 3000;
const routerApi = require('./routes')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

routerApi(app);

app.listen(port, () => {
  console.log('Port: '+ port)
});
