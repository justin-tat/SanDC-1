const express = require('express');

const productRouter = require('express').Router();
const bodyParser = require('body-parser');

productRouter.use(express.json());
productRouter.use(bodyParser.urlencoded({extended: false}));
productRouter.use(bodyParser.json());


productRouter.get('/', async (req, res) => {
  //
  console.log('product get');
  res.sendStatus(200);
});

productRouter.get('/:product_id', async (req, res) => {
  //
  console.log('product id get');
  res.sendStatus(200);
});



productRouter.get(':product_id/styles', async (req, res) => {
  //
  console.log('product styles get');
  res.sendStatus(200);
});


module.exports = productRouter;