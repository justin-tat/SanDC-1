const cartRouter = require('express').Router();

cartRouter.get('/', (req, res) => {
  res.end('CART ROUTER');
});

module.exports = cartRouter;