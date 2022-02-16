const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/reviews_photos', { useNewUrlParser: true }, { useUnifiedTopology: true }) ;
mongoose.createConnection('mongodb://localhost/reviewPhotos');

const review_photo_schema = new mongoose.Schema(
{

  id: {type: Number, unique:true, required: true},
  review_id: {type: Number, required: true},
  url: {type: String, required: true}
});





let ReviewPhoto = mongoose.model('ReviewPhoto', review_photo_schema);


module.exports.ReviewPhoto = ReviewPhoto;
