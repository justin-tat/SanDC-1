import React from 'react';

const Price = (props) => {
  var priceDisplay;
  if(props.salePrice) {
    var style = {
      textDecorationLine: 'line-through',
      color: 'red'
    };
    priceDisplay = <div>
      <div style={style}>${props.price}</div>
      <div>${props.salePrice}</div>
    </div>
  } else {
    priceDisplay = <div>${props.price}</div>
  }
  return (
    <div className="price">
      {priceDisplay}
    </div>

  )
}

export default Price;