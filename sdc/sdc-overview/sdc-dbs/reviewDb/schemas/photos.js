const mongoose = require('mongoose');


const review_photo_schema = new mongoose.Schema(
{

  id: {type: Number, unique:true, required: true},
  review_id: {type: Number, required: true},
  url: {type: String, required: true}
});

module.export = review_photo_schema;