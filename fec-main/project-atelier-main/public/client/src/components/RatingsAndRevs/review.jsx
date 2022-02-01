import React from 'react'
import Date from './date.jsx'
import Helpful from './helpful.jsx'
import Stars from './stars.jsx'

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullReview: false,
      markedHelpful: false,
      imageUrlInModal: null
    }
    this.showFullReview.bind(this)
    this.openInModal.bind(this)
    this.closeModal.bind(this)
  }

  componentDidMount() {
    if (this.props.review.body.length < 250) {
      this.setState({
        showFullReview: true
      })
    }
  }

  showFullReview() {
    this.setState({
      showFullReview: true
    })
    this.props.clickTracker('show full review body link', 'review.jsx')
  }

  openInModal(photoUrl) {
    this.setState({
      imageUrlInModal: photoUrl
    })
    this.props.clickTracker('image in review', 'review.jsx')
  }

  closeModal() {
    this.setState({
      imageUrlInModal: null
    })
    this.props.clickTracker('close image modal in review', 'review.jsx')
  }

  render() {
    let review = this.props.review
    let reviewBody
    if (this.state.showFullReview) {
      reviewBody = review.body
    } else {
      reviewBody = review.body.slice(0, 249)
    }
    return (
      <div className="individual-review">
        <Stars average={review?.rating} size={15}/>
        <p className="summary">{review?.summary}</p>
        {review &&
        <p>{reviewBody}</p>}
        {!this.state.showFullReview &&
        <p className="link" onClick={this.showFullReview.bind(this)}>Show more</p>}
        {review?.recommend &&
        <p>I recommend this product &#10003;</p>}
        <p>{review?.reviewer_name}</p>
        {review?.response &&
        <p className="response">Response from seller: {review.response}</p>}
        <Date date={review?.date.slice(0,10)} />
        <Helpful helpfulness={review?.helpfulness} markHelpful={this.props.markHelpful} id={this.props.review.review_id}/>
        {review?.photos.map(photo =>
          <img
          key={photo.id}
          src={photo.url}
          height="45px"
          width="45px"
          className="thumbnail"
          alt="review-image-thumbnail"
          onClick={() => this.openInModal(photo.url)}></img>)}
        {this.state.imageUrlInModal &&
        <div className="review-modal-backdrop">
          <div className="review-image-modal-box">
          <span class="close" onClick={this.closeModal.bind(this)}>&times;</span>
            <br></br>
            <br></br>
            <img className="review-image" alt="review-image" src={this.state.imageUrlInModal}></img>
          </div>
        </div>}
      </div>
    )
  }
}

export default Review