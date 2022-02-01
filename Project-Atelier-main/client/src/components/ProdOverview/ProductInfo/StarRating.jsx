import React from 'react';
import Rating from 'react-rating';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar} from '@fortawesome/free-solid-svg-icons';

library.add(emptyStar);
library.add(fullStar);

const gotoReviews = () => {
  const reviewElem = document.querySelector('.RatingsNReviewsSection');
  reviewElem.scrollIntoView({behavior: 'smooth'});
};

const StarRating = (props) => {
  return (
    <div className='POStarRating' data-testid="starRating">
      <Rating start={0} stop={5} initialRating={props.ratings} emptySymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#808080
' />} fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#f8ce0b' />} readonly />
      <button className='POReadReviewButton' onClick={gotoReviews}>Read All {props.totalReviews} Reviews</button>
    </div>
  );
};

export default StarRating;