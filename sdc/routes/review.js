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
                console.log(reviews);
                res.send(reviews);

       })
  })
  .catch(err => {
    res.sendStatus(500);
  })

});

module.exports = reviewRouter;