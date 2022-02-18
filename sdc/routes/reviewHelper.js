const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');



function findDataInDb(productId){
  return new Promise((resolve, reject)=>{
    db.Review.find({product_id: productId}).limit().exec((err, data)=>{
      if(err){
        reject(err);
      } else {
        console.log('helper line 11');
        resolve(data);
      }
    })
  })
}

function findPhotoInDb(reviewId){
  return new Promise((resolve, reject)=>{
    db.ReviewPhoto.find({review_id:reviewId}).limit(5).exec((err, data)=>{
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function findRatingInDb(productId){
  return new Promise((resolve, reject)=>{
    db.Review.find({product_id: 1}).limit().exec((err, data)=>{
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function findCharInDb(productId){
  return new Promise((resolve, reject)=>{
    db.Char.find({product_id:productId}).limit(5).exec((err, data)=>{
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

function findReviewCharInDb(reviewId){
  return new Promise((resolve, reject) => {
    db.CharReview.find({review_id:reviewId}).exec((err, data)=>{
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

module.exports = {
  findDataInDb,
  findPhotoInDb,
  findRatingInDb,
  findCharInDb,
  findReviewCharInDb
}





