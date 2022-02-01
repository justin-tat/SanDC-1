import React from 'react'

const BarRatingBreakdown = (props) => {
  const { percent, stars} = props;

  const fillerWidth = {
    width: `${percent}%`
  }

  return (
    <div className="rating-breakdown-bar-container">
      <div className="rating-breakdown-bar-filler" id={stars} style={fillerWidth}>
      </div>
    </div>
  )
}

export default BarRatingBreakdown