const axios = require('axios');
const gitToken = require('../config.js');


const getSpecificProduct = (productId) => {
  let options = {
    method: 'GET',
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    url: `http://localhost:3050/fec2/hr-rpp/products/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      console.log('options:', options);
      return response.data;
    })
    .catch((error) => {
      console.log('options:', options);
      console.log('error:', error);
    });
};

const getProductStyles = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    });
};

const getProductReviews = (productId) => {
  let options = {
    method: 'GET',
    url: `http://localhost:3050/fec2/hr-rpp/reviews/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    });
};

module.exports = {
  getSpecificProduct,
  getProductStyles,
  getProductReviews,
};