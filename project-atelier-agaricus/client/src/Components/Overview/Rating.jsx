import React from 'react';
function Rating(props) {
  var stars = [];
  for (var i = 0; i < 5; i++) {
    if (i < props.avgRating) {
      stars.push(<span className="fa fa-star rr-star"></span>);
    } else {
      stars.push(<span className="fa fa-star"></span>)
    }
  }
  return (
    <td>{stars}</td>
  )
}

export default Rating;