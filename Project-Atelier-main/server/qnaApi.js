const axios = require('axios');
const gitToken = require('../config.js');

var getProductFromHR = function getProductFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    headers: { Authorization: gitToken.Token },
  };
  axios.get(options.url, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });

};

var getQuestionsFromHR = function getQuestionsFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${id}`,
    headers: { Authorization: gitToken.Token }
  };
  axios.get(options.url, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

var addQuestionHelpHR = function addQuestionHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${id}/helpful`,
    headers: { Authorization: gitToken.Token }
  };
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

var addAnswerHelpHR = function addAnswerHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${id}/helpful`,
    headers: { Authorization: gitToken.Token }
  };
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

var addNewQuestionToHR = function addNewQuestionToHR(productId, body, nick, email, callback) {
  let options = {
    method: 'POST',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    headers: { Authorization: gitToken.Token },
    // eslint-disable-next-line camelcase
    body: { body: body, name: nick, email: email, product_id: productId }
  };
  //console.log('post options', options);
  axios.post(options.url, options.body, options)
    .then(function (response) {
      //console.log('got response creating new question', response);
      callback(null, response.data);
    })
    .catch(function (error) {
      //console.log(error);
      console.log('error creating new question');
      callback(error, null);
    });
};

var addNewAnswerToHR = function addNewAnswerToHR(questionId, body, name, email, photos, callback) {

  let options = {
    method: 'POST',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`,
    headers: { Authorization: gitToken.Token },
    body: { body: body, name: name, email: email, photos: photos }
  };

  axios.post(options.url, options.body, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log('error creating new question', error);
      callback(error, null);
    });

};

var reportAnswerToHR = function reportAnswerToServer (answerId, callback) {

  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`,
    headers: { Authorization: gitToken.Token }
  };

  axios.put(options.url, '', options)
    .then(function (response) {
      console.log('got response');
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

module.exports = {
  getProductFromHR,
  getQuestionsFromHR,
  addQuestionHelpHR,
  addAnswerHelpHR,
  addNewQuestionToHR,
  addNewAnswerToHR,
  reportAnswerToHR
};