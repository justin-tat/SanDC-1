 const mongoose = require('mongoose');

 var conn = mongoose.createConnection('mongodb://ip-172-31-18-131.ec2.internal/reviews');
 //ip-172-31-18-131
 var conn2 = mongoose.createConnection('mongodb://ip-172-31-19-49.ec2.internal/reviewPhotos');
//ip-172-31-19-49
//  conn.set('debug', true);
//  mongoose.set('debug', true);


 var Review  = conn.model('Review', new mongoose.Schema({
  id: {type: Number, unique: true, required: true, index: true  },
  product_id: {type: Number, required: true, index: true  },
  rating: {type: Number, required: true},
  date: {type: String, required: true},
  summary: {type: String, required: true},
  body: {type: String, required: true},
  recommend: {type: Boolean, required: true},
  reported: {type: Boolean, required: true},
  reviewer_name: {type: String, required: true},
  reviewer_email: {type: String, required: true},
  response: {type: String, required: true},
  helpfulness: {type: Number, required: true},
  photos:{ type : Array, required: true }

 }));

 var Char = conn.model('Char', new mongoose.Schema({
  id: {type: Number, required: true, index: true},
  product_id: {type: Number, required: true},
  name: {type: String, required: true}

 }), 'chars');

 var CharReview = conn.model('CharReview', new mongoose.Schema({
   id: {type: Number, required: true},
   characteristic_id: {type: Number, required: true},
   review_id: {type:Number, required: true, index: true},
   value: {type:Number, required: true}
 }), 'charReviews');

 var ReviewPhoto  = conn2.model('ReviewPhoto', new mongoose.Schema({

  id: {type: Number, required: true, index: true},
  review_id: {type: Number, required: true, index: true},
  url: {type: String, required: true}
 }), 'reviewPhotos');

 let save = (review, callback) => {
   console.log('received review in db line 46', review);

     let newReview = new Review({

  id: review.id,
  product_id: review.product_id,
  rating: review.rating,
  date: review.date,
  summary: review.summary,
  body: review.body,
  recommend: review.recommend,
  reported: false,
  reviewer_name: review.reviewer_name,
  reviewer_email: review.reviewer_email,
  response: review.response,
  helpfulness: 0,
  photos:review.photos
     })

  newReview.save(review, (err, result) => {
        if (err){
        console.log('err saving');
        callback(err, null);
      } else {
        console.log('saved entry');
        console.log('db line 71', result);
        callback(null, result);
      }
  })

 }

 let saveChar = (chars, callback) => {
   //overwrite duplicates - use update many in mongoose (upsert)
   //if the value exist - update it, else insert it
   var allpromises = [];
   console.log(82, 'chars = ', chars);
   for (var i = 0; i < chars.length; i++){
     var charToSave = chars[i];
     console.log('should be charToSave', charToSave);
     var promise = new Promise((resolve, reject)=>{
       var char = new Char({
         id: charToSave.id,
         product_id: charToSave.product_id,
         name: charToSave.name
        }); //end of Char def
        char.save(charToSave, (err, result) => {
          console.log('saving i=char',  i, '=', char);
          if(err){
            //console.log('err.code = ', err.code);
            if (err.code = '11000'){
              console.log('Duplicate entry, running Update');
              Char.findOneAndUpdate( charToSave, {upsert: true}, ((err, result) => {
              // Char.findByIdAndUpdate(char.id, char, ((err, result) => {
                if (err){
                  console.log('err updating');
                  reject();
                  callback(err, null);
                } else { //end of if(err)true
                  console.log('updated entry');
                  resolve(result);
                } //end of if(err)
              })) //end of findOneAndUpdate
            } else { //end of if 11000
              reject();
            } // end of else for if 11000

          } else {//if err
        console.log('saved entry');
        resolve();
      };
    });// end of char.save
  }); // end of promise
  allpromises.push(promise);
} // end of for loop


    Promise.all(allpromises)
    .then(result =>{
      console.log('resolved all promises');
      // console.log('db 77 added ', count.addedCount);
      // console.log('db 78 updated', count.updatedCount);

     callback(null, result);
    }); //end of then
  };//end of saveChar



  let saveCharReview = (charReviews, callback) => {

    var allpromises = [];

    for (var i = 0; i < charReviews.length; i++){

      let charReviewToSave = charReviews[i];
      console.log('charReview to save line 138 db', charReviewToSave);
      let promise = new Promise ((resolve, reject) => {
        var charReview = new CharReview ({
          id: charReviewToSave.id,
          characteristic_id: charReviewToSave.characteristic_id,
          review_id: charReviewToSave.review_id,
          value: charReviewToSave.value
         });
         charReview.save(charReviewToSave, (err, result) => {
           if (err){
             if(err.code === 11000){
               console.log('duplicate char review to save');
               charReview.findOneAndUpdate(charReviewToSave, {upsert: true}, (err, result) => {
                if (err){
                  console.log('err updating');
                  reject();
                  callback(err, null);
                } else { //end of if(err)true
                  console.log('updated entry');
                  resolve(result);
                } //end of if(err)
               }
               )
             }
           } else {
            resolve(result);
           }
         })

      })
      allpromises.push(promise);
    }


    Promise.all(allpromises)
    .then(result =>{
      console.log('resolved all promises line 144 in db');
     callback(null, result);
    });



  }


 module.exports.Review = Review;
 module.exports.ReviewPhoto = ReviewPhoto;
 module.exports.Char = Char;
 module.exports.CharReview = CharReview;
 module.exports.save = save;
 module.exports.saveChar = saveChar;
  module.exports.saveCharReview = saveCharReview;

