const express = require('express')
var expressStaticGzip = require("express-static-gzip");
const path = require('path');
const app = express()
const port = 3000

app.use("/", expressStaticGzip(path.join(__dirname, 'client', 'dist'), {
  enableBrotli: true
}));

app.get('/', (req, res) => {
  res.end()
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})