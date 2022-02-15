const axios = require('axios');
const gitToken = require('../config.js');


const getTotalReviews = (productId, page) => {
  let options = {
    method: 'GET',
    //url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}&count=50&sort=relevant&page=${page}`,
    url: `http://localhost:3050/fec2/hr-rpp/reviews/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      console.log('review api line 14');
      //response.data = { product: '64620', page: 50, count: 50, results: [] }
      //console.log('response', response.data);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the getTotalReviews error: ', err);
    });
};
const updateHelpfulness = (reviewId) => {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/helpful`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      return response;
    })
    .catch((err) => {
      console.log('This is the updateHelpfulness error: ', err);
    });
};

const updateReported = (reviewId) => {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/report`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      return response;
    })
    .catch((err) => {
      console.log('This is the updateReported error: ', err);
    });
};

const ratingOverview = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      return response.data;
    })
    .catch((err) => {
      console.log('This is the ratingOverview error: ', err);
    });
};

const postReview = async (body) => {
  let params = {
    'product_id': body.productId,
    'rating': body.rating,
    'summary': body.reviewSummary,
    'body': body.reviewBody,
    'recommend': body.recommended === 'true',
    'name': body.nickName,
    'email': body.email,
    'photos': body.imgUrl.slice(),
    'characteristics': {}
  };
  let chars = body.Chars;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i].Id) {
      params['characteristics'][chars[i].Id] = chars[i].val;
    }
  }
  let options = {
    method: 'POST',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews',
    headers: { Authorization: gitToken.Token },
    data: params
  };
  return axios(options)
    .catch((err) => {
      console.log('This is the post review error: ', err);
    });
};
module.exports = {
  getTotalReviews,
  updateHelpfulness,
  updateReported,
  ratingOverview,
  postReview
};