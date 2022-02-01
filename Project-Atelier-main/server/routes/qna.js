const qnaRouter = require('express').Router();
const axios = require('axios');
const api = require('../qnaApi.js');
const qnaController = require('./qna_controller.js');

qnaRouter.get('/getProductById', (req, res) => {
  let id = req.query.id;

  qnaController.receiveProductInfoById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

qnaRouter.get('/getQuestionsList', (req, res) =>{
  let id = req.query.id;

  qnaController.receiveQuestionList(id).
    then(data => {
      res.send(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });

});

qnaRouter.put('/updateQuestionHelp', (req, res) => {
  let questionId = req.body.params.questionId;
  let productId = req.body.params.productId;

  qnaController.increaseQuestionHelp(questionId)
    .then(data => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          //console.log('questions', result);
          res.send(result);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

qnaRouter.put('/updateAnswerHelp', (req, res) => {
  let answerId = req.body.params.answerId;
  let productId = req.body.params.productId;

  qnaController.increaseAnswerHelp(answerId)
    .then(data => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });

});

qnaRouter.post('/addNewQuestion', (req, res) => {
  //console.log(req.body);
  let productId = req.body.params.id;
  let body = req.body.params.body;
  let name = req.body.params.name;
  let email = req.body.params.email;

  qnaController.addQuestionToServer(productId, body, name, email)
    .then(data => {
      //console.log('server 75');
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});


qnaRouter.post('/addNewAnswer', (req, res) => {
  let productId = req.body.params.productId;
  let questionId = req.body.params.id;
  let body = req.body.params.body;
  let name = req.body.params.name;
  let email = req.body.params.email;
  let photos = req.body.params.photos;
  console.log('server is adding new answer');
  qnaController.addAnswerToServer(questionId, body, name, email, photos)
    .then(data =>{
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});

qnaRouter.put('/reportAnswer', (req, res) => {
  let productId = req.body.params.productId;
  let answerId = req.body.params.answerId;

  qnaController.reportAnswerToServer(answerId)
    .then(data =>{
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});

module.exports = qnaRouter;