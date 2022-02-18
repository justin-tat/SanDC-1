 const mongoose = require('mongoose');

 var conn = mongoose.createConnection('mongodb://localhost/reviews');
 var conn2 = mongoose.createConnection('mongodb://localhost/reviewPhotos');


 var Review  = conn.model('Review', new mongoose.Schema({
  id: {type: Number, unique: true, required: true  },
  product_id: {type: Number,  unique: true, required: true  },
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
  id: {type: Number, unique: true, required: true},
  product_id: {type: Number, required: true},
  name: {type: String, required: true}

 }), 'chars');

 var CharReview = conn.model('CharReview', new mongoose.Schema({
   id: {type: Number, unique: true, required: true},
   characteristic_id: {type: Number, required: true},
   review_id: {type:Number, required: true},
   value: {type:Number, required: true}
 }), 'charReviews');

 var ReviewPhoto  = conn2.model('ReviewPhoto', new mongoose.Schema({

  id: {type: Number, unique:true, required: true},
  review_id: {type: Number, required: true},
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

 module.exports.Review = Review;
 module.exports.ReviewPhoto = ReviewPhoto;
 module.exports.Char = Char;
 module.exports.CharReview = CharReview;
 module.exports.save = save;

