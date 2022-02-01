const ratingsRouter = require('express').Router();
const RatingApi = require('../RatingApi.js');

ratingsRouter.get('/', (req, res) => {
  res.end('RATINGS ROUTER');
});

ratingsRouter.get('/getReviews', async (req, res) => {
  let productId = req.query.Id;
  let totalReviews = await RatingApi.getTotalReviews(productId, 1);
  let prevReviews = totalReviews.results.slice();
  var newReviews = [];
  let i = 2;
  while (prevReviews.length > 0) {
    let temp = await RatingApi.getTotalReviews(productId, i);
    if (temp) {
      prevReviews = temp.results.slice();
      if (prevReviews.length > 0) {
        newReviews.push(prevReviews.slice());
        i++;
      }
    }
  }
  newReviews = newReviews.flat();
  let result = totalReviews.results.concat(newReviews);
  res.status(200).send(result);
});

ratingsRouter.post('/updateHelpfulness', async (req, res) => {
  let productId = req.body.Id;
  let totalReviews = await RatingApi.updateHelpfulness(productId);
  res.status(204).end();
});
ratingsRouter.post('/updateReported', async (req, res) => {
  let productId = req.body.Id;
  let totalReviews = await RatingApi.updateReported(productId);
  res.status(204).end();
});

ratingsRouter.get('/ratingOverview', async (req, res) => {
  let productId = req.query.Id;
  let ratingOverview = await RatingApi.ratingOverview(productId);
  let ratingAverage = await averageRate(ratingOverview.ratings, ratingOverview.recommended);
  ratingOverview.ratings.average = ratingAverage[0];
  ratingOverview.recommended = ratingAverage[1];
  ratingOverview.ratings['1'] = ratingAverage[2];
  ratingOverview.ratings['2'] = ratingAverage[3];
  ratingOverview.ratings['3'] = ratingAverage[4];
  ratingOverview.ratings['4'] = ratingAverage[5];
  ratingOverview.ratings['5'] = ratingAverage[6];
  res.status(200).send(ratingOverview);
});

ratingsRouter.post('/postReview', async(req, res) => {
  await RatingApi.postReview(req.body);
  res.status(204).end();
});



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

module.exports = ratingsRouter;