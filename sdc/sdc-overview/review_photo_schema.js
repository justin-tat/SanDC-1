
const review_photo_schema =
{

  id: {type: Number, unique:true, required: true}
  review_id: {type: Number, required: true}
  url: {type: String, required: true}
},

module.export.review_photo_schema = review_photo_schema;