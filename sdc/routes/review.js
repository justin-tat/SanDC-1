const express = require('express');

const reviewRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');
const helper = require('./reviewHelper.js');


reviewRouter.get('/:product_id', async (req, res) => {

  let productId = req.url.slice(1);
  productId = 2;


  helper.findDataInDb(productId)
  .then(reviews => {
    let reviewId = [];
      for (var i = 0; i < reviews.length; i++){
        reviewId.push(reviews[i]. id);
      }

      var promises = [];
        for(var i =0; i < reviewId.length; i++){
          let promise = new Promise ((resolve, reject)=>{
            helper.findPhotoInDb(reviewId[i])
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

  let id = req.url.slice(-5);

    helper.findRatingInDb(id)
    .then(result => {
      let resultAnswer = {
        product_id:id
      };
      let ratingVal = {}
      let recomObj = {};
      let falseCount = 0;
      let trueCount = 0;
        for(var i =0; i < result.length; i++){
          //find ratings
          let review = result[i];
          let rating = review.rating
            if (ratingVal[rating] === undefined){
              ratingVal[rating] = 1;
            } else {
              ratingVal[rating]++;
            }
          //find recommendations
          let recom = review.recommend;
            if (recom === 'false'){
              falseCount++;
            } else {
              trueCount++;
            }
        }

        for (var key in ratingVal){
          ratingVal[key] = ratingVal[key].toString();
        }
      recomObj.false = falseCount.toString();
      recomObj.true = trueCount.toString();

      resultAnswer.ratings = ratingVal;
      resultAnswer.recommended = recomObj;

      //find chars
      helper.findCharInDb(1)
      .then(result => {
         helper.findReviewCharInDb(1)
        .then(reviewCharResult => {
         //create char
           let arr = [];
           let characteristic_ids = new Set();
            for (review of reviewCharResult) {
              characteristic_ids.add(review['characteristic_id']);
            }
          // helper function to count average of array. [1,3] => 2
            array_med = (x) => {
              return x.reduce( (a,b) => {return a+b} ) / x.length ;
             }

            for (var i =0; i < reviewCharResult.length; i++){
              let item = reviewCharResult[i];
              let obj = {};
              obj['id'] = item.characteristic_id;
              obj['value']= item.value;
               arr.push (obj);
            }
            var resArr = [];

            for (var i =0; i < arr.length; i++){
              item = arr[i];
              var t = resArr.findIndex(x => (x.id == item.id));
              if(t <= -1){
               item['value'] = array_med(arr.filter(x => (x.id == item.id) ).map(x=>x.value) ).toString();
               resArr.push(item);
               }
            };
            let obj = {};
            for (var i =0; i < result.length; i++){
              let item = result[i];
              let name= item.name;
              obj[name] = {};
              for (var j =0; j < resArr.length; j++){
                let id = resArr[j].id;
                if (id === item.id){
                 obj[name] = resArr[i];
                }
              }
            }
            resultAnswer.characteristics = obj;
            console.log(resultAnswer);
            res.send(resultAnswer);
        })
      })
    })

});

reviewRouter.post('/', async (req, res) => {
  console.log('posted new review');
  console.log(req);

})


module.exports = reviewRouter;