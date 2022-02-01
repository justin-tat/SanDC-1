const relProductRouter = require('express').Router();
const getRelatedProduct = require ('../relProductApi.js');
const productApi = require('../ProductApi.js');
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

relProductRouter.get('/related_products', async (req, res) => {
  let productId = req.query.Id;

  var relatedProductsIdList = await getRelatedProduct(productId);

  var data = await Promise.all(relatedProductsIdList.map(async relProdId => {
    var prodInfo = await productApi.getSpecificProduct(relProdId);
    var prodStyleInfo = await productApi.getProductStyles(relProdId);
    var prodRatingInfo = await ratingApi.ratingOverview(relProdId);
    var prodRatingAverage = await averageRate(prodRatingInfo.ratings, prodRatingInfo.recommended);

    prodRatingInfo.ratings.average = prodRatingAverage[0];
    prodRatingInfo.recommended = prodRatingAverage[1];
    prodRatingInfo.ratings['1'] = prodRatingAverage[2];
    prodRatingInfo.ratings['2'] = prodRatingAverage[3];
    prodRatingInfo.ratings['3'] = prodRatingAverage[4];
    prodRatingInfo.ratings['4'] = prodRatingAverage[5];
    prodRatingInfo.ratings['5'] = prodRatingAverage[6];

    var relProdData = {
      ...prodInfo,
      ...prodStyleInfo,
      ...prodRatingInfo
    };

    return relProdData;
  }));

  res.status(200).send(data);
});

module.exports = relProductRouter;


