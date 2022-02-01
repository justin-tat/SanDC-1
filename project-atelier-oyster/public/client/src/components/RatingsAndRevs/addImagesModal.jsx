import React from 'react'

class AddImagesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUrl: '',
      photoUrls: []
    }
    this.handleCloseClick.bind(this)
    this.handleUrlChange.bind(this)
    this.addUrl.bind(this)
  }

  handleCloseClick(e) {
    e.preventDefault()
    this.props.closeModal()
    this.props.clickTracker('done button in add images modal', 'writeReview.jsx')
  }

  handleUrlChange(e) {
    this.setState({
      currentUrl: e.target.value
    })
  }

  addUrl(e) {
    e.preventDefault()
    let currentUrl = this.state.currentUrl
    let currentUrls = this.state.photoUrls
    if (currentUrls.length < 5) {
      currentUrls.push(currentUrl)
      this.setState({
        photoUrls: currentUrls
      })
      this.props.addImageUrl(this.state.currentUrl)
    } else {
      alert('Maximum 5 images allowed per review')
    }
    this.props.clickTracker('add image button add review', 'addImagesModal.jsx')
  }

  render() {
    if (!this.props.show) {
      return (
        <div></div>
      )
    } else {
      let photoUrls = this.state.photoUrls
      return (
        <div className="review-modal-backdrop">
          <div className="add-images-modal-box">
            <span class="close" onClick={this.handleCloseClick.bind(this)}>&times;</span>
            <br></br>
            <h3>Add Images to Your Review</h3>
              <label for="add-image">Image URL: </label>
              <input type="url" id="add-image" name="add-image" onChange={this.handleUrlChange.bind(this)}></input>
            <br></br>
            <br></br>
            <button onClick={this.addUrl.bind(this)}>Add Image</button>
            <br></br>
            <br></br>
            {this.state.photoUrls.map((photo, i) => {
              return (
                <img key={i}
                src={photo}
                height="45px"
                width="45px"
                className="thumbnail"
                alt="thumbnail"></img>)}
            )}
            <p>Images remaining: {5 - this.state.photoUrls.length}</p>
            <br></br>
            <br></br>
            <button onClick={this.handleCloseClick.bind(this)}>Done</button>
          </div>
        </div>
      )
    }
  }
}

export default AddImagesModal