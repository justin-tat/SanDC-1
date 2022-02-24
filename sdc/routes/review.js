const express = require('express');

const reviewRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');
const helper = require('./reviewHelper.js');

let productIdglobal;
reviewRouter.get('/:product_id', async (req, res) => {
  let productId = req.url.replace('/','');


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
        //  console.log('resolved promises');
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
  //req.url = meta/product_id=56546546
  req.url = req.url.slice(req.url.search(/\d+$/));
  console.log('req.url 64', req.url);
  let id = req.url;

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
      helper.findCharInDb(id)
      .then(result => {
        // console.log('result 106', result);
         helper.findReviewCharInDb(id)
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
              // console.log('item line 122', item);
              let obj = {};
              obj['id'] = item.characteristic_id;
              obj['value']= item.value;
               arr.push (obj);
            }
          //  console.log('line 127 arr', arr);
            var resArr = [];

            for (var i =0; i < arr.length; i++){
              item = arr[i];
              var t = resArr.findIndex(x => (x.id == item.id));
              if(t <= -1){
               item['value'] = array_med(arr.filter(x => (x.id == item.id) ).map(x=>x.value) ).toString();
               resArr.push(item);
               }
            };
            // console.log('resArr line 138', resArr);
            let obj = {};
            for (var i =0; i < result.length; i++){
              let item = result[i];
              // console.log('item line 142', item);
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
            // console.log('resultAnswer line 152', resultAnswer);
            res.send(resultAnswer);
        })
      })
    })

});

reviewRouter.post('/', async (req, res) => {
  //find the id of the last entry in db
  db.Review.findOne({}, {}, { sort: { 'id' : -1 } }, function(err, entry) {
    let newReviewId = entry.id + 1;

    let newObj = {};
    newObj.photos = req.body.photos;
    newObj.id = newReviewId;
    newObj.product_id= req.body.product_id;
    newObj.rating= req.body.rating;
    newObj.date = Date.now().toString();
    newObj.summary= req.body.summary;
    newObj.body= req.body.body;
    newObj.recommend= req.body.recommend;
    newObj.reported = false;
    newObj.reviewer_name = req.body.name;
    newObj.reviewer_email = req.body.email;
    newObj.response = 'null';
    newObj.helpfulness = 0;

     //save in reviews table
   helper.saveDataToDb(newObj)
   .then(data => {

     //find chars id in the chars collection
    let productId = req.body.product_id;
    helper.findCharInDb(productId)
    .then(chars => {
      console.log('191 chars', chars);
      //req.body.characteristics = "{ '1': 3, '2': 1, '3': 1, '4': 1 }"
      // 191 chars [
      //   {
      //     _id: new ObjectId("620ec0e22e054a40741c2a3e"),
      //     id: 215985,
      //     product_id: 64620,
      //     name: 'Quality'
      //   }
      // ]
      let idChar = [];
     for (var i =0; i < chars.length; i++){
       idChar.push(chars[i].id);
     }
     //console.log('209 arr', idChar);
    //create array for reviewchar collection and save every element of this array
    let newCharReview = [];
    //receive last entry id
    db.CharReview.findOne({}, {}, { sort: { 'id' : -1 } }, function(err, entry) {
      //console.log('last char line 214', entry);
      let lastId = entry.id;
      let newCharId = lastId + 1;
      //console.log(newCharId);
      //change charasteristics
            //req.body.characteristics = "{ '1': 3, '2': 1, '3': 1, '4': 1 }"


      let arr = [];
   //console.log(req.body.characteristics);
  // req.body.characteristics = { '1': 3, '2': 1, '3': 1, '4': 1 }
  req.body.characteristics = JSON.parse(req.body.characteristics.replace(/'/g, '"'));

     let charsArray =[
       ['Fit', req.body.characteristics['1']],
       ['Length', req.body.characteristics['2']],
       ['Quality', req.body.characteristics['3']],
       [ 'Comfort', req.body.characteristics['4']]
      ];


     //console.log(charsArray);
//[ [ 'Fit', 3 ], [ 'Length', 1 ], [ 'Quality', 1 ], [ 'Comfort', 1 ] ]

    //  let chars =  {
    //   id: 215985,
    //   product_id: 64620,
    //   name: 'Quality'
    // }
    for (var i =0; i < charsArray.length; i++){
      let item = charsArray[i];
      for (let j =0; j < chars.length; j++){
       let char = chars[j];
       if (item[0] === char.name){
         item[2] = char.id;
       }
       //else create new entries
       else {
         item[2] = newCharId;
         newCharId++;
       }

      }
    }

    console.log('line 253', charsArray);
    //[
//   [ 'Fit', 3, 19327576 ],
//   [ 'Length', 1, 19327577 ],
//   [ 'Quality', 1, 215985 ],
//   [ 'Comfort', 1, 19327578 ]
// ]
    //add new values entries in chars db
    var newArrForChars = [];
     for (var i =0 ; i < charsArray.length; i++){
       let obj = {};
       obj.id = charsArray[i][2];
       obj.product_id = req.body.product_id;
       obj.name = charsArray[i][0];
       newArrForChars.push(obj);
     }

     console.log(newArrForChars);
     helper.saveCharsToDb(newArrForChars)
     .then(result => {
        console.log('saved chars', result);
        //save objects in char review collections
        //get id of last obj in charReview collection
        db.CharReview.findOne({}, {}, { sort: { 'id' : -1 } }, function(err, entry) {

      //console.log('276 entry', entry);
      let newCharReviewId = entry.id + 1;
      //console.log(newCharReviewId);
            //console.log('line 273 charsArr', charsArray);
            let charReviewArr = [];
            for(var i =0; i < charsArray.length; i++){
              let newObj = {};
              newObj.id = newCharReviewId;
              newObj.characteristic_id = charsArray[i][2];
              newObj.review_id = newReviewId;
              newObj.value = charsArray[i][1];
              newCharReviewId++;
              charReviewArr.push(newObj);

            }
            console.log('charReview arr to save', charReviewArr);
            helper.saveCharReviewToDb(charReviewArr)
            .then(result => {
              console.log('line 294 save char reviews to db', result);
              //finishing POST route
              res.sendStatus(201);
            })

        })
     })



    });




    })

   })
  });


})


module.exports = reviewRouter;