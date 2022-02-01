import React from 'react';
import Stars from './OvStars.jsx'

class StarRating extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // ratings: this.props.ratings,
      // length: this.props.ratings.length,
      // average: this.average
    }
  }


  render () {
    // console.log('this.props.ratings', this.props.ratings)
    const ratings = Object.keys(this.props.ratings || {}).map(rating=>Number(rating))
    // console.log('ratings keys', ratings)
    const quantities = Object.values(this.props.ratings || {}).map(quantity=>Number(quantity))
    // console.log('ratings array', quantities)
    const length = quantities.reduce((acc, curr) => acc + curr, 0)

    // const average = Math.floor(ratings.reduce((acc, curr, ) =>
    // acc + curr / ratings.length , 0))
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      // console.log('quantities at i', quantities[i])
      sum += quantities[i] * (i + 1)
    }
    const average = (sum/length)
    const roundedAverage = Number.parseFloat(average).toFixed(2)

  return (
    <div className="star-rating">
    <Stars average={roundedAverage} size={25}/>
   <a href ="#reviews"  onClick={this.handleClick}>{`Read ${length} Reviews`}</a>
   </div>
  )
}
}


export default StarRating;
