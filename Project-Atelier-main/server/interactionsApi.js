const axios = require('axios');
const gitToken = require('../config.js');

const postInteractions = (data) => {
  let options = {
    method: 'POST',
    headers: { Authorization: gitToken.Token },
    params: data
  };

  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions';

  return axios.post(url, data, options)
    .then((response) => {
      return response;
    })
    .catch(err => console.error(err));
};

module.exports = postInteractions;