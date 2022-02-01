import React, {useState} from 'react'
import ThumbnailBar from './ThumbnailBar.jsx'
// import ExpandedView from './ExpandedView.jsx'
import ExpandedView from './ExpandedView'
import Modal from 'react-modal'
import {FaArrowAltCircleRight, FaArrowAltCircleLeft} from 'react-icons/fa'

class MainImage extends React.Component {
  constructor(props) {
    super(props)
    // console.log('index', this.props.index)
    this.state = {
     expand: false,
     image: this.props.image
    }
  this.nextSlide = this.nextSlide.bind(this)
  this.prevSlide = this.prevSlide.bind(this)
  this.handleClick = this.handleClick.bind(this)
  this.iconClick = this.iconClick.bind(this)
  }

  nextSlide() {
   this.props.mainImageNext()
   this.props.clickTracker('Main Image Next', 'MainImage.jsx')
  }

  prevSlide() {
  this.props.mainImagePrev()
  this.props.clickTracker('Main Image Previous', 'MainImage.jsx')
  }

  handleClick() {
    this.props.expandedView()
    this.props.clickTracker('Main Image Expanded View', 'MainImage.jsx')
  }

  iconClick(photo) {
    // console.log('overview icon clicked', photo)
    this.props.iconClick(photo, index)
  }

  render() {
    // const format = {
    //   height: 700,
    //   width: 590,
    //   padding: 30
    // }
    var rightArrow;
    var leftArrow;
    if(this.props.index < this.props.photos?.length - 1 && this.props.index > 0) {
      rightArrow = <FaArrowAltCircleRight className="right-arrow" onClick={this.nextSlide} />
      leftArrow = <FaArrowAltCircleLeft className="left-arrow" onClick={this.prevSlide}/>
    }
    if(this.props.index === 0) {
      leftArrow = <div></div>;
      rightArrow = <FaArrowAltCircleRight className="right-arrow" onClick={this.nextSlide} />
    }
    if(this.props.index === this.props.photos?.length - 1) {
      rightArrow = <div></div>
      leftArrow =  <FaArrowAltCircleLeft className="left-arrow" onClick={this.prevSlide}/>
    }

    return (
      <div className="slider">
        {leftArrow}
        {rightArrow}
            <img className="main-image" alt="main-image" onClick={this.handleClick} src={this.props.image}/>
            <ExpandedView clickTracker={this.props.clickTracker} isOpen={this.props.modalOpen} close={this.handleClick} iconClick={this.props.iconClick}
            photos={this.props.photos} image={this.props.image} />
      </div>
    )
  }
}

export default MainImage;

 // <div className={index === this.state.current ? 'slide active' : 'slide'} key={index}>
            //   {index === this.state.current && <img className="image" src={photo.url}/>}
            // </div>
 {/* <ThumbnailBar changeThumbnail={this.changeThumbnail}
        photos={this.props.photos} currentMain={this.state.currentMain}/> */}