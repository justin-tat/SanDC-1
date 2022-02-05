const productRouter = require('express').Router();

productRouter.get('/products', async (req, res) => {
  //
});

productRouter.get('/products/:product_id', async (req, res) => {
  //
});

productRouter.get('/products/:product_id/styles', async (req, res) => {
  //
});


module.exports = productRouter;