const express = require('express');
const app = express();
const port = 3050;
const bodyParser = require('body-parser')
const path = require('path');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//const productRouter = require('./routes/product.js');
//const reviewRouter = require('./routes/review.js');
const qnaRouter = require('./routes/qna.js');


app.get('/', (req, res) => {
  res.send('Hello SDC');
});


//app.use('/fec2/hr-rpp/products/', productRouter);
//app.use('/fec2/hr-rpp/reviews/', reviewRouter);
app.use('/fec2/hr-rpp/qna/', qnaRouter);

var loaderIOString = "loaderio-ef864259bbdd6df1237be6e2cd509166.txt"

app.get('/' + loaderIOString, (req, res) => {
  res.sendFile(path.join(__dirname, '/sdc-overview/qnaDb/qnaTests/loaderIOAuth.txt'));
});

app.listen(port, () => {
  console.log(`SDC app listening on port ${port}`);
});


module.exports = app;
