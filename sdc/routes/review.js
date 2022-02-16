const express = require('express');

const reviewRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('../sdc-overview/sdc-dbs/reviewDb/index.js');

// productRouter.use(express.json());
// productRouter.use(bodyParser.urlencoded({extended: false}));
// productRouter.use(bodyParser.json());


reviewRouter.get('/:product_id', async (req, res) => {

  function findDataInDb(){
    return new Promise((resolve, reject)=>{
      db.Review.find({}).limit(5).exec((err, data)=>{
        if(err){
          console.log('err review server line 17', err);
          reject(err);
        } else {
          console.log('server got data from db', data)
          resolve(data);
        }
      })
    })
  }

  findDataInDb(42)

  .then((data) => {

    console.log('then block', data);


  })
  .catch(err => {
    console.log(err);

  })





  //
  console.log('review get');
  let answer =  {
    product: '64620',
    page: 0,
    count: 50,
    results: [
      {
        review_id: 1135519,
        rating: 1,
        summary: 'goodgood',
        recommend: true,
        response: null,
        body: 'it is working!!',
        date: '2022-02-10T00:00:00.000Z',
        reviewer_name: 'good',
        helpfulness: 14,
        photos: []
      },
      {
        review_id: 1116182,
        rating: 5,
        summary: 'This product was great!',
        recommend: true,
        response: '',
        body: 'I really did or did not like this product based on whether it was sustainably sourced. Then I found out that its made from nothing at all.',
        date: '2019-01-01T00:00:00.000Z',
        reviewer_name: 'funtime',
        helpfulness: 9,
        photos: []
      },
    ]
  }

  res.send (answer);



});








module.exports = reviewRouter;