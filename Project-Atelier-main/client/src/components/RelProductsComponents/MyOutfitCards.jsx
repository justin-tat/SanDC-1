import React from 'react';
import Rating from 'react-rating';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar} from '@fortawesome/free-solid-svg-icons';

library.add(emptyStar);
library.add(fullStar);

var MyOutfitCards = (props) => {
  return (
    <div className="my-outfit-container-div">
      <h3>My Outfits</h3>
      <div className="product-cards">
        {props.myOutfitCards.map(outfit => {
          console.log(outfit);

          return (
            <div className="product-card" key={outfit.id} >
              <div className="remove-outfit" onClick={() => { props.removeOutfit(outfit.results.style_id); }} >x</div>
              <div onClick={() => { props.handleClick(outfit.id); }}>
                <img className="card-imgs" src={outfit.results.photos[0].thumbnail_url} />
                <div className="product-description">
                  <div className="overview-relProd">
                    <h5 className="category-relProd">{outfit.category}</h5>
                    <h4 className="name-relProd">{outfit.name}</h4>
                    <h5 className="price-relProd">{outfit.default_price}</h5>
                  </div>
                  <div className="product-ratings">
                    <div className='POStarRating' data-testid="starRating">
                      <Rating start={0} stop={5} initialRating={outfit.ratings.average} emptySymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#808080' />} fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#f8ce0b' />} readonly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="product-card add-outfit" onClick={props.handleAddOutfitClick}>
          <div><span>+<br /><br />Add to<br />Outfit</span></div>
        </div>
      </div>
    </div>
  );
};

export default MyOutfitCards;