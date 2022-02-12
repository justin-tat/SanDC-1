const express = require('express');
const app = express();
const port = 3050;

const productRouter = require('./routes/product.js');


app.get('/', (req, res) => {
  res.send('Hello SDC');
});


app.use('/fec2/hr-rpp/products/', productRouter);

app.listen(port, () => {
  console.log(`SDC app listening on port ${port}`);
});


module.exports = app;
