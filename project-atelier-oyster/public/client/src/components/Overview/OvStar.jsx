import React from 'react'
import fullStar from '../../../../../assets/images/full-gold-star.png';
import oneQuarterStar from '../../../../../assets/images/one-quarter-gold-star.png';
import halfStar from '../../../../../assets/images/one-half-gold-star.png';
import threeQuartersStar from '../../../../../assets/images/three-quarters-gold-star.png';
import outlineStar from '../../../../../assets/images/star-outline.png';

const Star = (props) => {
  const {starFill, size} = props
  let imgSrc;
  let style = {
    height: "2rem",
    width: "2rem"
  }
  if (typeof starFill === 'number') {
    if (starFill === 0) {
      imgSrc = outlineStar
    }
    if (starFill === 1) {
      imgSrc = oneQuarterStar
    } else if (starFill === 2) {
      imgSrc = halfStar
    } else if (starFill === 3) {
      imgSrc = threeQuartersStar
    }
  } else if (starFill === 'gold') {
    imgSrc = fullStar
  } else if (starFill === 'grey') {
    imgSrc = outlineStar
  }
  return (
    <div className="ovstar-column">
      <img src={imgSrc} alt="star"></img>
    </div>
  )

}

export default Star
