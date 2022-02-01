const axios = require('axios');
const gitToken = require('../config.js');

const getRelatedProduct = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/related`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    })
    .catch(err => console.error(err));
};

module.exports = getRelatedProduct;