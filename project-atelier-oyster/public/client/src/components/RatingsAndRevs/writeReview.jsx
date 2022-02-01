import React from 'react'
import CharacteristicReview from './characteristicReview.jsx'
import axios from 'axios'
import fullStar from '../../../../../assets/images/full-gold-star.png';
import outlineStar from '../../../../../assets/images/star-outline.png';
import Star from './star.jsx'
import AddImagesModal from './addImagesModal.jsx'


class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      id: null,
      rating: null,
      starsFill: ['grey', 'grey', 'grey', 'grey', 'grey'],
      recommend: null,
      size: null,
      width: null,
      comfort: null,
      quality: null,
      length: null,
      fit: null,
      summary: '',
      body: '',
      photos: [],
      nickname: null,
      email: null,
      metadata: null,
      chars: null,
      charRatings : {},
      showAddImagesModal: false
    }
    this.toggleWriteReview.bind(this)
    this.handleStarClick.bind(this)
    this.openModal.bind(this)
    this.closeModal.bind(this)
    this.setUpChars.bind(this)
    this.postData.bind(this)
    this.openAddImagesModal.bind(this)
    this.closeAddImagesModal.bind(this)
    this.uploadPhotos.bind(this)
  }

  componentDidMount() {
    if (this.props.metadata) {
      this.setState({
        metadata: this.props.metadata
      })
      this.setUpChars()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.metadata !== prevProps.metadata) {
      this.setState({
        metadata: this.props.metadata
      })
      this.setUpChars()
    }
  }

  postData(formData) {
    this.props.postNewReview(formData)
  }

  setUpChars() {
    let chars = [];
    for (var key in this.props.metadata.characteristics) {
      chars.push({
        [key]: this.props.metadata.characteristics[key].id
      })
    }
    this.setState({
      chars: chars,
    })
  }

  handleOverallRating(e) {
    this.setState({
      rating: e.target.value
    })
    this.props.clickTracker(`${e.target.value} stars in overall rating radio button`, 'writeReview.jsx')
  }

  rateCharacteristic(char, rating, id) {
    let charRatings = this.state.charRatings
    charRatings[id] = rating
    this.setState({
      charRatings: charRatings
    })
  }

  handleRecommend(e) {
    let recommendation = (e.target.value === 'true')
    this.setState({
      recommend: recommendation
    })
    this.props.clickTracker(`recommend this product: ${e.target.value}`, 'writeReview.jsx')
  }

  handleSummaryChange(e) {
    this.setState({
      summary: e.target.value
    })
  }

  handleBodyChange(e) {
    this.setState({
      body: e.target.value
    })
  }

  uploadPhotos(url) {
    let currentPhotos = this.state.photos
    currentPhotos.push(url)
    this.setState({
      photos: currentPhotos
    })
  }

  handleNicknameChange(e) {
    this.setState({
      nickname: e.target.value
    })
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  openAddImagesModal(e) {
    e.preventDefault()
    if (!this.state.showAddImagesModal) {
      this.setState({
        showAddImagesModal: true
      })
    }
    this.props.clickTracker('add images button in add review', 'writeReview.jsx')
  }

  closeAddImagesModal() {
    if (this.state.showAddImagesModal) {
      this.setState({
        showAddImagesModal: false
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    let invalidFields = ''
    let properEmailRegex = /\S+@\S+\.\S{2,5}/i
    if (!this.state.rating) {
      invalidFields += 'Overall Rating\n'
    } if (this.state.recommend === null) {
      invalidFields += 'Do you recommend this product?\n'
    } for (var key in this.state.charRatings) {
      if (!this.state.charRatings[key]) {
        invalidFields += `Characteristic Rating\n`
      }
    } if (this.state.body === '' || this.state.body.length < 50) {
      invalidFields += 'Review body\n'
    } // TODO: handle invalid photo upload
    if (!this.state.nickname) {
      invalidFields += 'Nickname\n'
    } if (!properEmailRegex.test(this.state.email)) {
      invalidFields += 'Email\n'
    } if (invalidFields) {
      alert(`You must enter the following:\n${invalidFields}`)
    } else {
      this.closeModal();
      let reviewFormData = {
        product_id: parseInt(this.props.id, 10),
        rating: parseInt(this.state.rating, 10),
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.nickname,
        email: this.state.email,
        photos: this.state.photos,
        characteristics: this.state.charRatings
      }
      this.postData(reviewFormData)
      }
      this.props.clickTracker('submit review', 'writeReview.jsx')
    }

    handleStarClick(e) {
      this.setState({
        rating: e.target.value
      })
      this.props.clickTracker(`add overall rating of ${e.target.value} stars in add review`, 'writeReview.jsx')
    }

    openModal() {
      this.setState({
        show: true
      })
      this.props.clickTracker('add a review button', 'writeReview.jsx')
    }

    closeModal() {
      this.setState({
        show: false
      })
      this.props.clickTracker('close add review modal', 'writeReview.jsx')
    }

    toggleWriteReview(e) {
      let currentState = this.state.show
      this.setState({
        show: !currentState
      })
    }

  render() {
    if (!this.state.show) {
      return (
        <button onClick={this.openModal.bind(this)}>Add A Review +</button>
      )
    } let starOneSrc = outlineStar;
    let starTwoSrc = outlineStar;
    let starThreeSrc = outlineStar;
    let starFourSrc = outlineStar;
    let starFiveSrc = outlineStar;
    for (var i = 0; i < 5; i++) {
      if (this.state.starsFill[i] === 'gold') {
        if (i === 0) {
          starOneSrc = fullStar
        } if (i === 1) {
          starTwoSrc = fullStar
        } if (i === 2) {
          starThreeSrc = fullStar
        } if (i === 3) {
          starFourSrc = fullStar
        } if (i === 4) {
          starFiveSrc = fullStar
        }
      }
    }
    let style = {
      height: '20px',
      width: '20px'
    }
    let chars = Array.from(this.state.chars)
    let rating = this.state.rating
    let ratingDesc
    if (rating === '1') {
      ratingDesc = 'Poor'
    } else if (rating === '2') {
      ratingDesc = 'Fair'
    } else if (rating === '3') {
      ratingDesc = 'Average'
    } else if (rating === '4') {
      ratingDesc = 'Good'
    } else if (rating === '5') {
      ratingDesc = 'Great'
    }
    return (
        <div className="review-modal-backdrop">
          <div className="write-review-modal-box">
            <span class="close" onClick={this.closeModal.bind(this)}>&times;</span>
            <br></br>
            <h2>Write Your Review</h2>
            <h3>About the {this.props.name}</h3>
            <div className="write-review-modal-form">
              <form>
                <p>Overall Rating*</p>
                <div className='review-stars'>
                  {[ ...Array(5)].map((star, i) => {
                    let ratingValue = i + 1;
                    let id = `star-rating-${i}`
                    return (
                      <label>
                        <input
                        type="radio"
                        name="star-rating"
                        id={id}
                        value={ratingValue}
                        onClick={this.handleStarClick.bind(this)}
                        />
                        <Star className="star" size={25} starFill={ratingValue <= rating ? 'gold' : 'grey'}/>
                      </label>
                    )}
                  )}
                  <p>{ratingDesc}</p>
                </div>
                <br></br>
                <p>Do you recommend this product?*</p>
                <input type="radio" id="yes-recommend" name="recommend" value={true} onClick={this.handleRecommend.bind(this)}></input>
                <label htmlFor="yes-recommend">Yes</label>
                <input type="radio" id="no-recommend" name="recommend" value={false} onClick={this.handleRecommend.bind(this)}></input>
                <label htmlFor="no-recommend">No</label>
                <br></br>
                <br></br>
                <p>Rate these characteristics:*</p>
                {chars.map(char => {
                  let charName
                  let charId
                  for (var key in char) {
                    charName = key;
                    charId = char[key]
                  }
                  return (
                    <CharacteristicReview
                    thisChar={charName}
                    key={charName}
                    id={charId}
                    rateChar={this.rateCharacteristic.bind(this)}
                    clickTracker={this.props.clickTracker}/>
                  )
                }
                )}
                <p>Review Summary:</p>
                <textarea name="summary" id="summary" maxLength="60" defaultValue="Example: Best purchase ever!"
                onChange={this.handleSummaryChange.bind(this)}></textarea>
                <p>Review body:</p>
                <textarea name="body" id="body" maxLength="1000" defaultValue="Why did you like the product or not?"
                onChange={this.handleBodyChange.bind(this)}></textarea>
                {this.state.body.length < 50 &&
                <p>Minimum required characters left: {50-this.state.body.length}</p>}
                {this.state.body.length >= 50 &&
                <p>Minimum reached</p>}
                <button onClick={this.openAddImagesModal.bind(this)}>Add images</button>
                <AddImagesModal show={this.state.showAddImagesModal}
                closeModal={this.closeAddImagesModal.bind(this)}
                addImageUrl={this.uploadPhotos.bind(this)}
                clickTracker={this.props.clickTracker}/>
                <br></br>
                {this.state.photos.map((photo, i) => {
                return (
                <img key={i}
                src={photo}
                height="45px"
                width="45px"
                className="thumbnail"
                alt="your-image-thumbnail">
                </img>)}
                )}
                <p>What is your nickname?*</p>
                <textarea name="nickname" id="nickname" maxLength="60" defaultValue="Example: jackson11!"
                onChange={this.handleNicknameChange.bind(this)}></textarea>
                <p>For privacy reasons, do not use your full name or email address</p>
                <p>Your email*</p>
                <textarea name="email" id="email" maxLength="60" defaultValue="Example: jackson11@email.com"
                onChange={this.handleEmailChange.bind(this)}></textarea>
                <p>For authentication reasons, you will not be emailed</p>
                <br></br>
                <button id="submit" onClick={this.onSubmit.bind(this)}>Submit review</button>
              </form>
            </div>
          </div>
        </div>
    )
  }
}


export default WriteReview