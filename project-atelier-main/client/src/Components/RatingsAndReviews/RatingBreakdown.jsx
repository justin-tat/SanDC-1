import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  calculateAvg(ratings) {
    // reviews.forEach((review) => {
    //   avg += review.rating;
    // })
    let num = parseInt(ratings['1']) + parseInt(ratings['2']) + parseInt(ratings['3']) + parseInt(ratings['4']) + parseInt(ratings['5']);
    let avg = parseInt(ratings['1']) + (parseInt(ratings['2']) * 2) + (parseInt(ratings['3']) * 3) + (parseInt(ratings['4']) * 4) + (parseInt(ratings['5']) * 5);
    avg /= num;
    avg = avg.toFixed(1);
    return avg;
  }

  calculateRecommended(meta) {
    if (Object.keys(meta).length > 0) {
      var percent = parseInt(meta.recommended.true) / (parseInt(meta.recommended.true) + parseInt(meta.recommended.false)) * 100;
      percent = percent.toFixed(1);
      return `${percent}%`;
    }
  }

  renderStars(rating) {
    var stars = [];
    for (var i = 0; i < 5; i++) {
        stars.push(<span key={i} className="fa fa-star rr-avg-star"></span>)
    }
    return stars;
  }

  render() {
    const trackClicks = this.props.trackClicks;
    var metaData = this.props.meta;
    var ratingFilter = this.props.ratingFilter;
    var display;
    if (metaData && Object.keys(metaData).length > 0) {
      let totalReviews = parseInt(this.props.meta.recommended.false) + parseInt(this.props.meta.recommended.true);
      let stars = Object.keys(this.props.meta.ratings).reverse();
      var starsBreakdown = stars.map((star, index) => {
        let style = {
          width: ((parseFloat(this.props.meta.ratings[star]) / totalReviews) * 100).toString().concat('%'),
        }
        return (
          <div
            className={`rr-rating-bd-stars`}
            key={index}
            onClick={(e) => {this.props.ratingClick(star); trackClicks(e, 'Reviews');}}
          >{star} stars:
            <div className="rr-progress-bar">
              <div className="rr-rating-bd" style={style} ></div>
            </div>
          </div>
        )
      });

      var filterMessage;
      if (ratingFilter.length > 0) {
        var ratingsString = ratingFilter.reduce((prev, curr) => (
          prev.toString().concat(`, ${curr.toString()}`)
        ));
        filterMessage =
          <div className="rr-filter-message">
            <small style={{'color': 'blue'}}>Filtering on: {ratingsString} stars</small>
            <button className="rr-reset-filters" onClick={e => {this.props.resetFilters(); trackClicks(e, 'Reviews');}} >Remove all filters</button>
          </div>
      } else {
        filterMessage = null;
      }

      var avgRating = this.calculateAvg(metaData.ratings);
      var percentage = (Math.round(avgRating * 4) / 4).toFixed(2) / 5 * 100;
      console.log('percentage', percentage);

      display =
        <div>
          <div className="rr-avg-star-container">
            <span className="rr-avg-rating">{avgRating}</span>
            {/* stars go here */}
            <span className="rr-avg-stars-under">
              {this.renderStars(avgRating)}
              <span className="rr-avg-stars-over" style={{width: `${100 - percentage}%`}} />
            </span>
          </div>
          <br/>
          <small>{totalReviews} total reviews</small>
          <br/>
          <h4 style={{'lineHeight': '100%', 'marginBottom': '5px'}}>Rating Breakdown</h4>
          {filterMessage}
          {starsBreakdown}
          <div className="rr-breakdown-recommend">{this.calculateRecommended(metaData)} recommend this product</div>
        </div>;
    } else {
      display = null;
    }

    return (
      <div className="rr-rating-breakdown">
        {display}
      </div>
    )
  }
}

export default RatingBreakdown;