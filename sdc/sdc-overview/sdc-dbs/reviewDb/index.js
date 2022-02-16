const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true }, { useUnifiedTopology: true }) ;






const review_photo_schema =
{

  id: {type: Number, unique:true, required: true}
  review_id: {type: Number, required: true}
  url: {type: String, required: true}
},


const reviewSchema = new Schema{

  id: {type: Number,  unique: true, required: true  }
  product_id: {type: Number,  unique: true, required: true  }
  rating: {type: Number, required: true}
  date: {type: String, required: true}
  summary: {type: String, required: true}
  body: {type: String, required: true}
  recommend: {type: Boolean, required: true}
  reported: {type: Boolean, required: true}
  reviewer_name: {type: String, required: true}
  reviewer_email: {type: String, required: true}
  response: {type: String, required: true}
  helpfulness: {type: Number, required: true}
}

let Review = mongoose.model('Review', reviewSchema);
let ReviewPhoto = mongoose.model('ReviewPhoto', review_photo_schema);


//module.export.reviewSchema = reviewSchema;
