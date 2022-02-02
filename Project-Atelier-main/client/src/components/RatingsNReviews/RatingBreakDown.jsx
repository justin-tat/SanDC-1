import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RatingBreakDown = ({ onClick, resetFilter, filter, filterOnClicked, productId, averageRate, starWidth, recommended, oneStar, twoStar, threeStar, fourStar, fiveStar })=>{

  return (
    <div className='review-starBreakDown'onClick={onClick}>
      <h3>RATINGS &amp; REVIEWS</h3>
      <div className='review-starBreakDown-inner'>
        <h1>{averageRate}</h1>
        <div className='review-starBreakDown-star'>
          <div className="review-stars-outer">
            <div data-testid="review-leftCornerStar" className="review-stars-inner" style={{width: starWidth(averageRate)}}></div>
          </div>
        </div>
        <p className='review-starBreakDown-recommended' data-testid="review-recommended">{recommended}% of reviews recommend this product</p>
      </div>

      <div className='review-starBreakDown-rating' >
        <div className='review-starBreakDown-rating-head' > 5 stars </div>
        <div className='review-starBreakDown-rating-star' >
          <div data-testid = 'fiveStar' className= {filter[4] !== null ? 'review-starBreakDown-rating-percentage-clicked' : 'review-starBreakDown-rating-percentage'} id='fiveStar' onClick={filterOnClicked}>
            <div data-testid="review-leftCorner-5stars" className={filter[4] !== null ? 'review-starBreakDown-filter-clicked' : 'review-starBreakDown-filter'} style={{width: Number(fiveStar) + '%'}}>
            </div>
          </div>
        </div>
      </div>

      <div className='review-starBreakDown-rating' >
        <div className='review-starBreakDown-rating-head' > 4 stars </div>
        <div className='review-starBreakDown-rating-star' >
          <div data-testid = 'fourStar' className= {filter[3] !== null ? 'review-starBreakDown-rating-percentage-clicked' : 'review-starBreakDown-rating-percentage'} id='fourStar' onClick={filterOnClicked}>
            <div data-testid="review-leftCorner-4stars" className={filter[3] !== null ? 'review-starBreakDown-filter-clicked' : 'review-starBreakDown-filter'} style={{width: Number(fourStar) + '%'}}>
            </div>
          </div>
        </div>
      </div>

      <div className='review-starBreakDown-rating' >
        <div className='review-starBreakDown-rating-head' > 3 stars </div>
        <div className='review-starBreakDown-rating-star' >
          <div data-testid = 'threeStar' className= {filter[2] !== null ? 'review-starBreakDown-rating-percentage-clicked' : 'review-starBreakDown-rating-percentage'} id='threeStar' onClick={filterOnClicked}>
            <div data-testid="review-leftCorner-3stars" className={filter[2] !== null ? 'review-starBreakDown-filter-clicked' : 'review-starBreakDown-filter'} style={{width: Number(threeStar) + '%'}}>
            </div>
          </div>
        </div>
      </div>

      <div className='review-starBreakDown-rating' >
        <div className='review-starBreakDown-rating-head' > 2 stars </div>
        <div className='review-starBreakDown-rating-star' >
          <div className= {filter[1] !== null ? 'review-starBreakDown-rating-percentage-clicked' : 'review-starBreakDown-rating-percentage'} id='twoStar' onClick={filterOnClicked}>
            <div data-testid="review-leftCorner-2stars" className={filter[1] !== null ? 'review-starBreakDown-filter-clicked' : 'review-starBreakDown-filter'} style={{width: Number(twoStar) + '%'}}>
            </div>
          </div>
        </div>
      </div>

      <div className='review-starBreakDown-rating' >
        <div className='review-starBreakDown-rating-head' > 1 stars </div>
        <div className='review-starBreakDown-rating-star' >
          <div className= {filter[0] !== null ? 'review-starBreakDown-rating-percentage-clicked' : 'review-starBreakDown-rating-percentage'} id='oneStar' onClick={filterOnClicked}>
            <div data-testid="review-leftCorner-1stars" className={filter[0] !== null ? 'review-starBreakDown-filter-clicked' : 'review-starBreakDown-filter'} style={{width: Number(oneStar) + '%'}}>
            </div>
          </div>
        </div>
      </div>

      <div className='review-starBreakDown-reset'>
        <button data-testid='remove-filter' onClick={resetFilter}>Remove all filters</button>
      </div>

    </div>
  );
};

export default RatingBreakDown;