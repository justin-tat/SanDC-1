const productRouter = require('express').Router();
const productApi = require ('../ProductApi.js');
const ratingApi = require('../RatingApi.js');

const averageRate = function(ratings, recommended) {
  let a = Object.keys(ratings);
  let b = Object.values(ratings);

  let totalRatePoint = 0;

  if (a.length === b.length) {
    for (let i = 0; i < a.length; i ++) {
      totalRatePoint += a[i] * b[i];
    }
  }

  const totalRatings = Object.values(ratings).reduce((a, b) => Number(a) + Number(b));
  const fiveStar = Math.round((b[4] / totalRatings) * 100);
  const fourStar = Math.round((b[3] / totalRatings) * 100);
  const threeStar = Math.round((b[2] / totalRatings) * 100);
  const twoStar = Math.round((b[1] / totalRatings) * 100);
  const oneStar = Math.round((b[0] / totalRatings) * 100);
  const averageValues = totalRatePoint / totalRatings;

  let numOfFalse = Number(recommended.false) || 0;
  let numOfTrue = Number(recommended.true) || 0;
  let percentageOfRecommended = ((numOfTrue) ? Math.round((numOfTrue / (numOfTrue + numOfFalse)) * 100) : 0);

  return [averageValues.toFixed(1), percentageOfRecommended, oneStar, twoStar, threeStar, fourStar, fiveStar];
};

productRouter.get('/productInfo', async (req, res) => {
  let id = req.query.id;

  var prodInfo = await productApi.getSpecificProduct(id);
  var prodStyleInfo = await productApi.getProductStyles(id);
  var prodRatingInfo = await ratingApi.ratingOverview(id);
  var prodRatingAverage = await averageRate(prodRatingInfo.ratings, prodRatingInfo.recommended);

  prodRatingInfo.ratings.average = prodRatingAverage[0];
  prodRatingInfo.recommended = prodRatingAverage[1];
  prodRatingInfo.ratings['1'] = prodRatingAverage[2];
  prodRatingInfo.ratings['2'] = prodRatingAverage[3];
  prodRatingInfo.ratings['3'] = prodRatingAverage[4];
  prodRatingInfo.ratings['4'] = prodRatingAverage[5];
  prodRatingInfo.ratings['5'] = prodRatingAverage[6];

  var productData = {
    ...prodInfo,
    ...prodStyleInfo,
    ...prodRatingInfo
  };

  res.status(200).send(productData);
});

productRouter.get('/styleInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductStyles(id);
  res.send(data);
});

productRouter.get('/reviewInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductReviews(id);
  res.send(data);
});

module.exports = productRouter;