import React from 'react'
import Star from './star.jsx'

let Stars = (props) => {
  let { average, size } = props;
  let fullStars = Math.floor(average)
  let quarters = Math.round((average - fullStars)*4)
  if (quarters === 4) {
    quarters = 'gold'
  }
  let starsFill=[]
  for (var i = 0; i < fullStars; i++) {
    starsFill.push('gold')
  }
  if (quarters !== 0) {
    starsFill.push(quarters)
  } while (starsFill.length < 5) {
    starsFill.push('grey')
  }
  return (
    <div className="stars-row">
      {starsFill.map((info, index) =>
      <Star starFill={info} size={size} key={index}/>)}
    </div>
  )
}

export default Stars