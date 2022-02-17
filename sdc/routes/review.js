const express = require('express');

const reviewRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');


reviewRouter.get('/:product_id', async (req, res) => {

  let receivedProductId = req.url.slice(1);
  receivedProductId = 2;

  function findDataInDb(productId){
    return new Promise((resolve, reject)=>{
      db.Review.find({product_id: receivedProductId}).limit().exec((err, data)=>{
        if(err){
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }
  function findPhotoInDb(reviewId){
    return new Promise((resolve, reject)=>{
      db.ReviewPhoto.find({review_id:reviewId}).limit(5).exec((err, data)=>{
        if(err){
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }

  findDataInDb()
  .then(reviews => {
    let reviewId = [];
      for (var i = 0; i < reviews.length; i++){
        reviewId.push(reviews[i]. id);
      }

      var promises = [];
        for(var i =0; i < reviewId.length; i++){
          let promise = new Promise ((resolve, reject)=>{
            findPhotoInDb(reviewId[i])
           .then(data=>{
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
         photos = photos.flat();
               if (photos.length > 0){
                let id = photos[0].review_id;
                  for(var i =0; i < reviews.length; i++){
                    if(reviews[i].id === id){
                   //attach photos arr to review
                     reviews[i].photos = photos;
                    }
                   }
                }
                //console.log(reviews);
                res.send(reviews);

       })
  })
  .catch(err => {
    res.sendStatus(500);
  })

});

reviewRouter.get('/meta/:product_id', async (req, res) => {
  console.log('src router line 82');
  let answer = {
      product_id: '64620',
      ratings: { '1': '3', '4': '2', '5': '11' },
      recommended: { false: '1', true: '15' },
      characteristics: {
        Fit: { id: 216798, value: '2.5714285714285714' },
        Length: { id: 216799, value: '2.1428571428571429' },
        Comfort: { id: 216800, value: '2.7142857142857143' },
        Quality: { id: 216801, value: '2.5714285714285714' }
      }
    }
    res.send(answer);
});





module.exports = reviewRouter;