// // const mongoose = require('mongoose');
// // //mongoose.connect('mongodb://localhost/reviews_photos', { useNewUrlParser: true }, { useUnifiedTopology: true }) ;
// // //mongoose.createConnection('mongodb://localhost/reviewPhotos');

// const review_photo_schema = new mongoose.Schema(
// {

//   id: {type: Number, unique:true, required: true},
//   review_id: {type: Number, required: true},
//   url: {type: String, required: true}
// });

// const reviewSchema = new mongoose.Schema({

//   id: {type: Number, unique: true, required: true  },
//   product_id: {type: Number,  unique: true, required: true  },
//   rating: {type: Number, required: true},
//   date: {type: String, required: true},
//   summary: {type: String, required: true},
//   body: {type: String, required: true},
//   recommend: {type: Boolean, required: true},
//   reported: {type: Boolean, required: true},
//   reviewer_name: {type: String, required: true},
//   reviewer_email: {type: String, required: true},
//   response: {type: String, required: true},
//   helpfulness: {type: Number, required: true}
// })



// // let ReviewPhoto = mongoose.model('ReviewPhoto', review_photo_schema);


// // module.exports.review_photo_schema = review_photo_schema;


// // connections/slow.js
// const mongoose = require('mongoose');

// const conn = mongoose.createConnection('mongodb://localhost/reviewPhotos');
// conn.model('Review', require('./schemas/reviews'));
// conn.model('ReviewPhoto', require('./schemas/photos'));

// module.exports = conn;