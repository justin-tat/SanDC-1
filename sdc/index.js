const express = require('express');
const app = express();
const port = 3050;
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const productRouter = require('./routes/product.js');
const reviewRouter = require('./routes/review.js');



app.get('/', (req, res) => {
  res.send('Hello SDC');
});


app.use('/fec2/hr-rpp/products/', productRouter);
app.use('/fec2/hr-rpp/reviews/', reviewRouter);

app.listen(port, () => {
  console.log(`SDC app listening on port ${port}`);
});


module.exports = app;
