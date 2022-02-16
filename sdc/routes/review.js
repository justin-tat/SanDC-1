const express = require('express');

const reviewRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');
//const dbPhotos = require('../sdc-overview/sdc-dbs/reviewDb/photos.js');
// productRouter.use(express.json());
// productRouter.use(bodyParser.urlencoded({extended: false}));
// productRouter.use(bodyParser.json());


reviewRouter.get('/:product_id', async (req, res) => {

  let receivedProductId = req.url.slice(1);
 receivedProductId = 2;

  function findDataInDb(productId){
    return new Promise((resolve, reject)=>{
      db.Review.find({product_id: receivedProductId}).limit().exec((err, data)=>{
        if(err){
          console.log('err review server line 17', err);
          reject(err);
        } else {
          console.log('server got reviews from db', data.length)
          resolve(data);
        }
      })
    })
  }
  function findPhotoInDb(reviewId){
    return new Promise((resolve, reject)=>{
      db.ReviewPhoto.find({review_id:5}).limit(5).exec((err, data)=>{
        if(err){
          console.log('err review server line 17', err);
          reject(err);
        } else {
          console.log('server got photos from db', data.length)
          resolve(data);
        }
      })
    })
  }

  findDataInDb()
  .then(reviews => {

    //console.log('got reviews 46', reviews);
    let reviewId = [];
  for (var i = 0; i < reviews.length; i++){
    console.log('review id', reviews[i].id);
    reviewId.push(reviews[i]. id);
  }
  //console.log(reviewId);
  //find photos for reviews
  var promises = [];
  for(var i =0; i < reviewId.length; i++){
   let promise = new Promise ((resolve, reject)=>{
     console.log('should be review id', reviewId[i]);
     findPhotoInDb(reviewId[i])
     .then(data=>{
       console.log('data line 60', data);
       resolve(data);
     })
     .catch(err => {
       reject(err);
     })
   })
   promises.push(promise);
  }

  Promise.all(promises)
  .then(photos =>{
    console.log('resolved promises');
    console.log(photos);
    photos = photos.flat();
    // console.log('reviews', reviews);
  //  if (photos.length > 0){
  //    let id = photos[0].review_id;
  //    console.log('should be 5', id);
  //    //console.log(reviewsArr);
  //    for(var i =0; i < reviewsArr.length; i++){

  //      if(reviewsArr[i].id === id){
  //        //attach photos arr to review
  //        console.log('found review', reviewsArr[i]);
  //        reviewsArr[i].summary = 'foo';
  //        reviewsArr[i].photos = 'bla';
  //        setTimeout(() => {console.log(reviewsArr)}, 5000);

  //      }
  //    }
  //  }

  })


  })


  // .then((data) => {

  //   console.log('then block');


  // })
  // .catch(err => {
  //   console.log(err);

  // })





  //
  console.log('review get');
  let answer =  {
    product: '64620',
    page: 0,
    count: 50,
    results: [
      {
        review_id: 1135519,
        rating: 1,
        summary: 'goodgood',
        recommend: true,
        response: null,
        body: 'it is working!!',
        date: '2022-02-10T00:00:00.000Z',
        reviewer_name: 'good',
        helpfulness: 14,
        photos: []
      },
      {
        review_id: 1116182,
        rating: 5,
        summary: 'This product was great!',
        recommend: true,
        response: '',
        body: 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
        date: '2019-01-01T00:00:00.000Z',
        reviewer_name: 'funtime',
        helpfulness: 9,
        photos: []
      },
    ]
  }

  res.send (answer);



});








module.exports = reviewRouter;