import React from 'react';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = ( {handleAverageRate, handleReviews, productId, currentProduct}) =>{
  return (
    <ReviewList handleAverageRate={handleAverageRate} handleReviews={handleReviews} currentProduct={currentProduct} productId= {productId}/>
  );
};

export default RatingsNReviews;