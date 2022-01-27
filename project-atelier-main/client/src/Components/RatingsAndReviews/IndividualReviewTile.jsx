import React from 'react';
import axios from 'axios';
import moment from 'moment';

class IndividualReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null,
      helpful: false,
      helpfulCount: null,
      showFullPhoto: false,
      imageUrl: '',
      response: null
    };
    this.helpfulClick = this.helpfulClick.bind(this);
    this.reportClick = this.reportClick.bind(this);
    this.imageFullDisplay = this.imageFullDisplay.bind(this);
    this.closeImage = this.closeImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      review: this.props.review,
      helpfulCount: Number(this.props.review.helpfulness)
    })
    if (this.props.review.response) {
      this.setState({
        response: this.props.review.response
      })
    }
  }

  renderStars(rating) {
    var count = 0;
    var stars = [];
    for (var i = 0; i < 5; i++) {
      if (count < rating) {
        stars.push(<span key={i} className="fa fa-star rr-star"></span>)
        count++;
      } else {
        stars.push(<span key={i} className="fa fa-star"></span>)
      }
    }
    return stars;
  }

  helpfulClick() {
    if ( !this.state.helpful ) {
      axios.put(`${this.props.apiUrl}/reviews/${this.props.review.review_id}/helpful`)
        .then(() => {
          console.log('helpful PUT success');
          this.setState({
            helpful: true,
            helpfulCount: this.state.helpfulCount + 1
          })
        })
        .catch((err) => {
          console.log('API post /reviews/<review_id>/helpful failed with ', err);
        })
    }
  }

  reportClick() {
    axios.put(`${this.props.apiUrl}/reviews/${this.props.review.review_id}/report`)
        .then(() => {
          console.log('report PUT success');
        })
        .catch((err) => {
          console.log('API post /reviews/<review_id>/report failed with ', err);
        })
  }

  imageFullDisplay(e) {
    this.setState({
      showFullPhoto: true,
      imageUrl: e.target.src
    })
  }

  closeImage() {
    this.setState({
      showFullPhoto: false,
      imageUrl: ''
    })
  }

  render() {
    if (!this.state.review) {
      return <div />
    }
    const {review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos} = this.state.review;
    const trackClicks = this.props.trackClicks;
    var isRecommended = recommend ? 'fa fa-check' : null;
    var recValue = recommend ? '   I recommend this product' : null;
    var pics = photos.map((photo, index) => (
      <span key={index}>
        <img
          className="rr-photo"
          src={photo.url}
          alt={`Picture for ${this.props.productName}`}
          onClick={(e) => {this.imageFullDisplay(e); trackClicks(e, 'Reviews');}}/>
      </span>
    ))

    var modal;
    if (!this.state.showFullPhoto) {
      modal = null;
    } else {
      modal =
        <div className="rr-photo-modal" onClick={e => {this.closeImage(); trackClicks(e, 'Reviews')}}>
          <img className="rr-photo-modal-content" src={this.state.imageUrl} alt="placeholder text"/>
        </div>
    }

    var displayResponse;
    if (this.state.response) {
      displayResponse =
        <div>
          <h4>Response from Seller:</h4>
          <p>{this.state.response}</p>
        </div>
    } else {
      displayResponse = null;
    }

    return (
      <div className="rr-individual-review">
        <div className="rr-top-bar">
          <span className="rr-rating">{this.renderStars(rating)}</span>
          <span className="rr-name-date">{reviewer_name} | {moment(date.slice(0, 10)).format('MMMM D, YYYY' )}</span>
        </div>
        <b>{summary}</b>
        <div className="rr-body">{body}</div>
        {pics}
        <br/>
        {modal}
        <span className={isRecommended}>{recValue}</span>
        <div className="rr-helpful-report-style">
          Helpful?
          <span className="rr-helpful" onClick={e => {this.helpfulClick(); trackClicks(e, 'Reviews')}}> Yes({this.state.helpfulCount})</span>
          <span>|</span>
          <span className="rr-report" onClick={e => {this.reportClick(); trackClicks(e, 'Reviews')}}>Report</span>
        </div>
        {displayResponse}
      </div>
    )
  }
}

export default IndividualReviewTile;