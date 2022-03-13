const express = require('express');
const app = express();
const port = 3050;
const bodyParser = require('body-parser')
const path = require('path');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const productRouter = require('./routes/product.js');
//const reviewRouter = require('./routes/review.js');
const qnaRouter = require('./routes/qna.js');


app.get('/', (req, res) => {
  res.send('Hello SDC');
});


app.use('/fec2/hr-rpp/products/', productRouter);
//app.use('/fec2/hr-rpp/reviews/', reviewRouter);
app.use('/fec2/hr-rpp/qna/', qnaRouter);

var loaderIOString = "loaderio-f6a63a50506a0a0bee9d16aa3c706df9.txt"

app.get('/' + loaderIOString, (req, res) => {
  res.sendFile(path.join(__dirname, '/sdc-overview/qnaDb/qnaTests/loaderIOAuth.txt'));
});

app.listen(port, () => {
  console.log(`SDC app listening on port ${port}`);
});


module.exports = app;
