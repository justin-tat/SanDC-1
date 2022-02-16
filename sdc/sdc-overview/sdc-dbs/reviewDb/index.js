 const mongoose = require('mongoose');

 var conn  = mongoose.createConnection('mongodb://localhost/reviews');
 var conn2  = mongoose.createConnection('mongodb://localhost/reviewPhotos');

 // stored in 'testA' database
 var Review    = conn.model('Review', new mongoose.Schema({
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
  helpfulness: {type: Number, required: true}
 }));

 // stored in 'testB' database
 var ReviewPhoto    = conn2.model('ReviewPhoto', new mongoose.Schema({

  id: {type: Number, unique:true, required: true},
  review_id: {type: Number, required: true},
  url: {type: String, required: true}
 }));

 module.exports.Review = Review;
 module.exports.ReviewPhoto = ReviewPhoto;


