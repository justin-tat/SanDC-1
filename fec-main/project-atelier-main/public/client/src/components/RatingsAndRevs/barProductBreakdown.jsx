import React from 'react'
import fullStar from '../../../../../assets/images/full-gold-star.png';

const BarProductBreakdown = (props) => {
  const {position} = props;

  const style = {
    position: 'relative',
    paddingLeft: `${position}%`,
    height: '25px',
    width: '25px',
    top: '-0.5em'
  }

  const imgSrc = fullStar

  return (
    <div className="product-breakdown-bar-container">
      <img className="star-image" alt="star" src={imgSrc} style={style}></img>
    </div>
  )
}

export default BarProductBreakdown