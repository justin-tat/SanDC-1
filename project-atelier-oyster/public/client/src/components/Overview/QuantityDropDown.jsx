import React from 'react'


const QuantityDropDown = (props) => {
  console.log('available', props.available)
  let content = []
  var max;
  if (props.available > 15) {
    max = 15
  } else {
    max = props.available
  }
  for (let i = 2; i < max + 1; i++) {
    content.push(<option key={i} value={i}>{i}</option>)
  }
  return content
}

export default QuantityDropDown;