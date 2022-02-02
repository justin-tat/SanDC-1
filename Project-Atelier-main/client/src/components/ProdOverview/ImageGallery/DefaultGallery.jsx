import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';


const MAX_THUMBNAILS = 7;

class DefaultGallery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      startIndex: 0,
    };

  }

  componentDidUpdate({photos}) {
    if (this.state.selectedIndex > photos.length - 1) {
      this.setState({
        selectedIndex: photos.length - 1,
      });
    }
  }

  rotateRight () {
    if (this.state.selectedIndex < this.props.photos.length - 1) {
      this.setState({
        selectedIndex: this.state.selectedIndex += 1,
      });
    } else {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  rotateLeft () {
    if (this.state.selectedIndex <= this.props.photos.length - 1 && this.state.selectedIndex !== 0) {
      this.setState({
        selectedIndex: this.state.selectedIndex -= 1,
      });
    } else {
      this.setState({
        selectedIndex: this.props.photos.length - 1,
      });
    }
  }

  rotateDown () {
    if (this.startIndex + (2 * (MAX_THUMBNAILS - 1)) < this.props.photos.length) {
      this.setState ({
        startIndex: this.state.startIndex + (MAX_THUMBNAILS - 1),
      });
    } else {
      this.setState ({
        startIndex: this.props.photos.length - MAX_THUMBNAILS,
      });
    }
  }

  rotateUp () {
    if (this.startIndex - (2 * (MAX_THUMBNAILS - 1)) > 0) {
      this.setState ({
        startIndex: this.state.startIndex - (MAX_THUMBNAILS - 1),
      });
    } else {
      this.setState ({
        startIndex: 0,
      });
    }
  }



  thumbToDisp(index) {
    this.setState({
      selectedIndex: index
    });
  }

  render () {
    return (
      <div className='POImageGallery' data-testid="ImageGallery">
        <div className='POThumbContainer'>
          {(this.props.photos.length < MAX_THUMBNAILS) ? null : <FontAwesomeIcon icon={faArrowUp} size='lg' id='ThumbArrowUp' onClick={this.rotateUp.bind(this)} />}
          {new Array(Math.min(MAX_THUMBNAILS, this.props.photos.length)).fill(0).map((_, index) => {
            const photoIndex = this.state.startIndex + index;
            if (this.state.selectedIndex === photoIndex) {
              return <img alt={photoIndex} className='PODisplayThumbImg POThumbImg' key={index} src={this.props.photos[photoIndex].thumbnail_url} onClick={() => { this.thumbToDisp(photoIndex); }} />;
            } else {
              return <img alt={photoIndex} className='POThumbImg' key={index} src={this.props.photos[photoIndex].thumbnail_url} onClick={() => { this.thumbToDisp(photoIndex); }} />;
            }
          })}
          {(this.props.photos.length < MAX_THUMBNAILS) ? null : <FontAwesomeIcon icon={faArrowDown} size='lg' id='ThumbArrowDown' onClick={this.rotateDown.bind(this)}/>}
        </div>
        <div className='POImgContainer'>
          <FontAwesomeIcon icon={faChevronCircleLeft} size='2x' className='POLeft' onClick={this.rotateLeft.bind(this)} />
          <img alt={'DisplayImage'} className='PODisplayImg' src={this.props.photos[this.state.selectedIndex].url} onClick={() => { this.props.switchImageModal(); this.props.updateIndex(this.state.selectedIndex); }} />
          <FontAwesomeIcon icon={faChevronCircleRight} size='2x' className='PORight' onClick={this.rotateRight.bind(this)} />
        </div>
      </div>
    );
  }
}

export default DefaultGallery;