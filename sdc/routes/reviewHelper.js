const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');



function findDataInDb(productId){
  return new Promise((resolve, reject)=>{
    db.Review.find({product_id: receivedProductId}).limit().exec((err, data)=>{
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

module.exports = {
  findDataInDb,
  findPhotoInDb,
  findRatingInDb
}





