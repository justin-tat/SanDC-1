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
    let a = {
      product_id: '64620',
      ratings: { '4': 1, '5': 1 },
      recommended: { false: 0, true: 2 },
      characteristics: {
        Fit: { id: 1, value: 4 },
        Length: { id: 3, value: 5 },
        Comfort: { id: 4, value: 4 },
        Quality: { id: 2, value: 3 }
      }
    }
    let id = req.url.slice(-5);

    //ratings are in reviews collection
    //find them by product_id, write in ratings object

    function findRatingInDb(productId){
      return new Promise((resolve, reject)=>{
        db.Review.find({product_id: 1}).limit().exec((err, data)=>{
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    }

    findRatingInDb(id)

    .then(result => {
      //console.log('found ratings in reviews coll', result);
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
       }else {
         trueCount++;
       }


      }
     console.log ('ratingValline 155', ratingVal);
     //{ '4': 1, '5': 1 }
     for (var key in ratingVal){
       ratingVal[key] = ratingVal[key].toString();

     }
     console.log ('ratingValline 161', ratingVal);


      recomObj.false = falseCount.toString();
      recomObj.true = trueCount.toString();

      //console.log(recomObj);
      resultAnswer.ratings = ratingVal;
      resultAnswer.recommended = recomObj;
      //console.log(resultAnswer);
      //found chars

        findCharInDb(1)
   .then(result => {
    findReviewCharInDb(1).
    then(reviewCharResult => {
     //create char

let arr = [];
let characteristic_ids = new Set();
for (review of reviewCharResult) {
  characteristic_ids.add(review['characteristic_id']);
}
console.log(51, characteristic_ids);

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

  console.log(65, arr);
  var resArr = [];

  for (var i =0; i < arr.length; i++){
    item = arr[i];
    var t = resArr.findIndex(x => (x.id == item.id));
    if(t <= -1){
      item['value'] = array_med(arr.filter(x => (x.id == item.id) ).map(x=>x.value) ).toString();
      resArr.push(item);
      }
  };
console.log('line 191', resArr);
let obj = {};
for (var i =0; i < result.length; i++){
  let item = result[i];
  let name= item.name;
  console.log(item.name);
  obj[name] = {};
  for (var j =0; j < resArr.length; j++){
    let id = resArr[j].id;
    if (id === item.id){
      obj[name] = resArr[i];
    }
  }
}

console.log('line 206', obj);
resultAnswer.characteristics = obj;
console.log(resultAnswer);
res.send(resultAnswer);







    })
     //console.log('find chars', result);

     //finding char values by its id
  //      findReviewCharInDb(1)
  //  .then(result => {
  //    console.log('found review chars', result);
  //    console.log('line 168 charObj', charObj);
  //    for(var i =0; i < result.length; i++){
  //      for (var key in charObj){
  //        let charReview = result[i];
  //        if (charReview.characteristic_id === charObj.key[id]){
  //          charObj.key[value] = charReview.value;
  //        }
  //      }
  //    }
  //    console.log('building char', charObj);

  //  })

   })

    })




    function findCharInDb(productId){
      return new Promise((resolve, reject)=>{
        db.Char.find({product_id:productId}).limit(5).exec((err, data)=>{
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    }

    function findReviewCharInDb(reviewId){
      return new Promise((resolve, reject) => {
        db.CharReview.find({review_id:reviewId}).exec((err, data)=>{
          if(err){
            reject(err);
          } else {
            resolve(data);
          }
        })
      })
    }

  //  findCharInDb(1)
  //  .then(result => {
  //    console.log('find chars', result);
  //  })

  //  findReviewCharInDb(1)
  //  .then(result => {
  //    console.log('found review chars', result);
  //  })

    //res.send(answer);

});





module.exports = reviewRouter;