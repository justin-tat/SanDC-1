const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({

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
})

module.export = reviewSchema;