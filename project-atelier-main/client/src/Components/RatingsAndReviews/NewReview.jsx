import React from 'react';
import axios from 'axios';

class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      counter: 50,
      rating: 0,
      ratingHover: 0,
      recommend: null,
      characteristics: {},
      summary: '',
      body: '',
      photos: [],
      email: '',
      name: '',
      incompleteMsg: null
    };
    this.onCharChange = this.onCharChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  newReviewClickHandler() {
    this.setState({
      showModal: true
    })
  }

  closeBtnHandler() {
    this.setState({
      showModal: false
    })
  }

  // starClick(e) {
  //   console.log(parseInt(e.target.dataset.starid));
  //   var id = e.target.dataset.starid;
  // }

  onCharChange(e) {
    var chars = this.state.characteristics;
    var charId = String(this.props.meta.characteristics[e.target.name].id);
    var val = Number.parseInt(e.target.value);
    chars[charId] = val;

    this.setState({
      characteristics: chars
    })
  }

  onBodyChange(e) {
    var countLeft = 50 - e.target.value.length;
    this.setState({
      body: e.target.value,
      counter: countLeft
    });
  }

  formSubmit(e) {
    e.preventDefault();

    var incomplete = [];
    if (this.state.rating === 0) {
      incomplete.push('Overall Rating');
    }
    if (this.state.recommend === null) {
      incomplete.push('Do you recommend this product?');
    }
    if (Object.keys(this.state.characteristics).length === 0) {
      incomplete.push('Characteristics');
    }
    if (this.state.body === '') {
      incomplete.push('Review Body');
    }
    if (this.state.name === '') {
      incomplete.push('Nickname');
    }
    if (this.state.email === '') {
      incomplete.push('Email');
    }

    if (incomplete.length > 0) {
      var message =

      <div className="incomplete-message" >
        <b>You must enter the following:</b>
        {incomplete.map((field, index) => (
            <ul key={index}>
              <li>{field}</li>
            </ul>
        ))}
      </div>

      this.setState({
        incompleteMsg: message
      })
      return;
    }

    // axios.defaults.headers.common['Authorization'] = this.props.token;
    axios({
      method: 'post',
      url: `${this.props.apiUrl}/reviews`,
      data: {
        product_id: this.props.productId,
        rating: this.state.rating,
        summary: this.state.summary,
        body: this.state.body,
        recommend: this.state.recommend,
        name: this.state.name,
        email: this.state.email,
        photos: this.state.photos,
        characteristics: this.state.characteristics
      },
      headers: {
      //   'content-type': 'application/json',
      //   Accept: 'application/json'
        Authorization: this.props.token
      }
    })
      .then((status) => {
        console.log('form submission success: ', status);
        this.setState({
          showModal: false,
          counter: 50,
          rating: 0,
          ratingHover: 0,
          recommend: false,
          characteristics: {},
          summary: '',
          body: '',
          photos: [],
          email: '',
          name: ''
        })
      })
      .catch((err) => {
        console.log('New review POST failed: ', err);
      })
  }

  onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let pics = this.state.photos;
      let img = URL.createObjectURL(e.target.files[0]);
      console.log('image uploaded', img)
      pics.push(img)
      this.setState({
        photos: pics
      })
    }
  }

  render() {
    const trackClicks = this.props.trackClicks;
    // Modal only displayed if Add Review button is clicked
    var modal;
    if (!this.state.showModal) {
      modal = null;
    } else {
      // Define Characteristics (dynamically) based on existing meta data
      var charKeys = Object.keys(this.props.meta.characteristics);
      var charRef = {
        Size: ['A size too small', 'Half a size too small', 'Perfect', 'Half a size too big', 'A size too wide'],
        Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
        Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
        Quality: ['Poor', 'Below average', 'What I expected	', 'Pretty great', 'Perfect'],
        Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
      };
      var chars = charKeys.map((char, index1) => {
        return (
          <tr key={index1}>
            <td><b>{char}</b></td>
            {charRef[char].map((ratingName, index2) => {
              index2 += 1;
              return(
                <td key={index2}>
                  <label>{ratingName}
                    <input className="rr-characteristic" type="radio" value={index2} onChange={this.onCharChange} name={char}></input>
                  </label>
                </td>
              )
            })}
          </tr>
        )
      })

      // Dynamic message for remaining characters in review body
      var minMsg;
      if (this.state.counter > 0) {
        minMsg = <small> Number of characters until minimum reached: {this.state.counter}</small>
      } else {
        minMsg = <small> Minimum reached</small>
      }

      // Thumbnail images to be displayed when image uploaded
      var images;
      if (this.state.photos.length > 0) {
        images = this.state.photos.map((image, index) => (
          <span>
            <img className="rr-photo" key={index} src={image} alt={`Picture for ${this.props.productName}`}></img>
          </span>
        ))
      } else {
        images = null;
      }

      // Define the new review modal content
      modal =
        <div className="rr-modal">
          <div className="rr-modal-content">
            <span className="rr-close-btn" onClick={e => {this.closeBtnHandler();}}>close</span>
            <h2>Write Your Review</h2>
            <h4>About the {this.props.productName}</h4>
            <form onSubmit={e => {this.formSubmit(e); trackClicks(e, 'Reviews')}}>
              <div className="rr-overall-rating">
                <b>Overall Rating * </b>
                <span className="rr-star-rating">
                  {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                      <button
                        type="button"
                        key={index}
                        // className={"rr-star-button " + (index <= (this.state.ratingHover || this.state.rating) ? "rr-star-on" : "rr-star-off")}
                        className={"rr-star-button " + (index <= this.state.rating ? "rr-star-on" : "rr-star-off")}
                        onClick={() => this.setState({rating: Number(index)})}
                        // onMouseEnter={() => this.setState({ratingHover: index})}
                        // onMouseLeave={() => this.setState({ratingHover: rating})}
                      >
                        <span className="fa fa-star"></span>
                      </button>
                    )
                  })}
                </span>
              </div>
              <b>Do you recommend this product? * </b>
              <label>Yes
                <input
                  type="radio"
                  name="recommend"
                  value={true}
                  onClick={(e) => this.setState({recommend: e.target.value == "true"})}/>
              </label>
              <label>No
                <input
                  type="radio"
                  name="recommend"
                  value={false}
                  onClick={(e) => this.setState({recommend: e.target.value == "false"})}/>
              </label>
              <br/>
              <br/>
              <b>Characteristics * </b>
              <table className="rr-paddingBtwCols">
                <thead>
                  <tr>
                    <th></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                  </tr>
                </thead>
                <tbody>
                  {chars}
                </tbody>
              </table>
              <br/>
              <br/>
              <b>Review Summary </b>
              <input
                type="text"
                maxLength="60"
                placeholder="Example: Best purchase ever!"
                size="60"
                onChange={(e) => this.setState({summary: e.target.value})}></input>
              <br/>
              <br/>
              <b>Review Body *</b>
              <br/>
              <textarea
                minLength="50"
                maxLength="1000"
                placeholder="Why did you like the product or not?"
                cols="80"
                rows="5"
                onChange={this.onBodyChange}>
              </textarea>
              {minMsg}
              <br/>
              <br/>
              <b>Upload Photos</b>
              <p>Click the "Choose File" button to upload a photo:</p>
              <input
                type="file"
                onChange={this.onImageChange}
                accept="image/gif, image/jpeg, image/png"
                style={this.state.photos.length < 5 ? null : {display: 'none'}}></input>
              {images}
              <br/>
              <br/>
              <label><b>What is your nickname * </b></label>
              <input
                type="text"
                maxLength="60"
                placeholder="Example: jackson11!"
                size="60"
                onChange={(e) => this.setState({name: e.target.value})}></input>
              <br/>
              <small>For privacy reasons, do not use your full name or email address</small>
              <br/>
              <br/>
              <b>Your email * </b>
              <input
                type="email"
                maxLength="60"
                placeholder="Example: jackson11@email.com"
                size="50"
                onChange={(e) => this.setState({email: e.target.value})}></input>
              <br/>
              <small>For authentication reasons, you will not be emailed</small>
              <br/>
              <br/>
              <button className="submit-button" type="submit">Submit Review</button>
              {this.state.incompleteMsg}
            </form>
          </div>
        </div>
    }
    return (
      <div>
        <button className="rr-modal-btn" onClick={e => {this.newReviewClickHandler(); trackClicks(e, 'Reviews')}}>Add A Review</button>
        {modal}
        <br/>
      </div>
    )
  }
}

export default NewReview;