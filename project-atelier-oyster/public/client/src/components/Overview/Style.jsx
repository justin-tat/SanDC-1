import React from 'react';

const Style = (props) => {

  return (
  <img className={props.selected} alt="style-image" src={props.photos[0].thumbnail_url}
  onClick={(e)=>{
    props.changeStyle(props.name, props.salePrice, props.skus, props.photos)
    props.clickTracker('Style Image', 'Style.jsx')}}>
  </img>
  )
}

export default Style;