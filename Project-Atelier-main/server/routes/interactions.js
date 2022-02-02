const interactionsRouter = require('express').Router();
const postInteractions = require('../interactionsApi.js');

interactionsRouter.post('/postData', (req, res) => {
  let postData = req.body;

  postInteractions(postData)
    .then(response => res.status(201).end())
    .catch(err => console.error(err));
});

module.exports = interactionsRouter;