import React from 'react';
import axios from 'axios';
import SortOptions from './SortOptions.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import NewReview from './NewReview.jsx';
import IndividualReviewTile from './IndividualReviewTile.jsx';


class RR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      sorting: 'relevant',
      meta: {},
      productName: '',
      count: 3,
      showMore: false,
      ratingFilter: []
    };
    this.changeSort = this.changeSort.bind(this);
    this.moreReviews = this.moreReviews.bind(this);
    this.ratingClick = this.ratingClick.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = this.props.token;
    axios.get(`${this.props.apiUrl}/reviews/?product_id=${this.props.currentProduct}&sort=${this.state.sorting}&count=${this.state.count}`)
    .then((results) => {
      if (results.data.results.length > this.state.count - 1) {
        let limitResults = results.data.results;
        limitResults.splice(this.state.count - 1);
        this.setState({
          showMore: true,
          reviews: limitResults
        })
      } else {
        this.setState({
          showMore: false
        })
      }
      return true;
      // console.log('this.state.reviews: ', this.state.reviews);
    })
    .catch((err) => {
      console.log('API get /reviews failed: ', err);
    })

    axios.get(`${this.props.apiUrl}/products/${this.props.currentProduct}`)
    .then((result) => {
      this.setState({
        productName: result.data.name
      })
    })
    .catch((err) => {
      console.log(`API get /products/${this.props.currentProduct} failed: `, err);
    })

    axios.get(`${this.props.apiUrl}/reviews/meta/?product_id=${this.props.currentProduct}`)
      .then((results) => {
        this.setState({
          meta: results.data
        })
        console.log('this.state.meta: ', this.state.meta);
      })
      .catch((err) => {
        console.log('API get /reviews/meta failed: ', err);
      })
  }

  changeSort(e) {
    axios.get(`${this.props.apiUrl}/reviews/?product_id=${this.props.currentProduct}&sort=${e.target.value}&count=${this.state.count}`)
      .then((results) => {
        let limitResults = results.data.results.slice();
        limitResults.splice(this.state.count - 1);
        this.setState({
          reviews: limitResults,
          sorting: e.target.value
        })
      })
      .catch((err) => {
        console.log('API get /reviews failed: ', err);
      })
  }

  moreReviews() {
    this.setState({
      count: this.state.count + 2
    }, () => {
      console.log(this.state.sorting)
      axios.get(`${this.props.apiUrl}/reviews/?product_id=${this.props.currentProduct}&sort=${this.state.sorting}&count=${this.state.count}`)
        .then((results) => {
          let limitResults = results.data.results.slice();
          limitResults.splice(this.state.count - 1);
          this.setState({
            reviews: limitResults
          })
          // console.log('this.state.reviews: ', this.state.reviews);
          return results;
        })
        .then((results) => {
          // console.log('get reviews results: ', results.data.results.length, 'count: ', this.state.count - 1)
          if (results.data.results.length > this.state.count - 1) {
            this.setState({
              showMore: true
            })
          } else {
            this.setState({
              showMore: false
            })
          }
        })
        .catch((err) => {
          console.log('API get /reviews failed: ', err);
        })
    });
    // =======================
    // Alternative Method
    // =======================
    // axios({
    //  method: 'get',
    //  url: this.props.apiUrl + '/reviews/?product_id=59553',
    //  headers: {
    //    'Authorization': this.props.token
    //  }
    // })
    //   .then ...
  }

  ratingClick(value) {
    var storeRatingFilter = this.state.ratingFilter.slice();
    var parseValue = parseInt(value);
    var index = storeRatingFilter.indexOf(parseValue);
    if (storeRatingFilter.includes(parseValue)) {
      storeRatingFilter.splice(index, 1);
    } else {
      storeRatingFilter.push(parseValue);
    }
    this.setState({
      ratingFilter: storeRatingFilter
    })
  }

  resetFilters() {
    this.setState({
      ratingFilter: []
    })
  }

  render() {
    const trackClicks = this.props.trackClicks;
    var moreBtn;
    if (this.state.showMore) {
      moreBtn =
        <div>
          <button className="rr-more-reviews" onClick={(e) => {this.moreReviews(); trackClicks(e, 'Reviews')}}>More Reviews</button>
        </div>
    } else {
      moreBtn = null;
    }
    var filteredReviews = this.state.ratingFilter.length > 0 ? this.state.reviews.filter(review => this.state.ratingFilter.includes(review.rating)) : this.state.reviews;
    var display;
    if (!(this.state.reviews.length > 0 && Object.keys(this.state.meta).length > 0 && this.state.productName !== '')) {
      display = <p>Loading...</p>;
    } else {
      // display everything
      display =
      <div className="RandR">
        <h3 style={{'lineHeight':'100%', 'marginBottom': '10px'}}>RATINGS & REVIEWS</h3>
        <div className="rr-container">
          <div className="rr-breakdown">
            <RatingBreakdown
              reviews={this.state.reviews}
              meta={this.state.meta}
              ratingClick={this.ratingClick}
              ratingFilter={this.state.ratingFilter}
              resetFilters={this.resetFilters}
              trackClicks={trackClicks}
            />
            { JSON.stringify(this.state.meta) !== '{}' ? <ProductBreakdown meta={this.state.meta} /> : null}
          </div>
          <div className="rr-reviews">
            <SortOptions changeSort={this.changeSort} trackClicks={trackClicks} />
            <div className="rr-review-list">
              {filteredReviews.map((review) => (
                <div key={review.review_id}>
                  <IndividualReviewTile
                    review={review}
                    apiUrl={this.props.apiUrl}
                    productName={this.state.productName}
                    trackClicks={trackClicks}
                  />
                  <br/>
                </div>
              ))}
              <div className="rr-buttons">
                <NewReview
                  productName={this.state.productName}
                  productId={this.props.currentProduct}
                  apiUrl={this.props.apiUrl}
                  token={this.props.token}
                  meta={this.state.meta}
                  token={this.props.token}
                  trackClicks={trackClicks}
                />
                {moreBtn}
              </div>
            </div>
          </div>
        </div>
      </div>
    }


    return (
      display
    )
  }
}

export default RR;