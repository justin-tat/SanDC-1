const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');



function findDataInDb(productId){
  return new Promise((resolve, reject)=>{
    db.Review.find({product_id: productId}).exec((err, data)=>{
      if(err){
        reject(err);
      } else {
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

function saveDataToDb(review){
  return new Promise((resolve, reject)=> {
    db.save(review,(err, result) => {
      if(err){
        console.log(err);
        reject(err);
      } else {
        console.log('helpers line 49');
        resolve(result);
      }
    })
  })
}

function saveCharsToDb(chars){
  return new Promise((resolve, reject)=> {
    db.saveChar(chars, (err, result) => {
      if(err){
        console.log(err);
        reject(err);
      } else {
        console.log('helpers line 63');
        resolve(result);
      }
    })
  })
}

function saveCharReviewToDb(chars){
  return new Promise((resolve, reject)=> {
    db.saveCharReview(chars, (err, result) => {
      if(err){
        console.log(err);
        reject(err);
      } else {
        console.log('helpers - saved char review to db');
        resolve(result);
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
  findReviewCharInDb,
  saveDataToDb,
  saveCharsToDb,
  saveCharReviewToDb
}





