import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export class ExpandedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.selectedIndex,
      zoomActivated: false,
    };
    let img = '';
    let lens = '';
    let container = '';
  }

  componentDidMount () {
    document.body.style.overflow = 'hidden';
    this.img = document.getElementById('PONormalImage');
    this.lens = document.getElementById('POModalLens');
    this.container = document.getElementById('POModaImageWrapper');
    this.zoomContainer = document.getElementById('POModalZoomImage');
  }

  componentWillUnmount () {
    document.body.style.overflow = 'unset';
  }

  thumbToDisplay (index) {
    this.setState({
      index: index,
    });
  }

  rotateRight () {
    if (this.state.index < this.props.photos.length - 1) {
      this.setState({
        index: this.state.index += 1,
      });
    } else {
      this.setState({
        index: 0,
      });
    }
  }


  rotateLeft () {
    if (this.state.index <= this.props.photos.length - 1 && this.state.index !== 0) {
      this.setState({
        index: this.state.index -= 1,
      });
    } else {
      this.setState({
        index: this.props.photos.length - 1,
      });
    }
  }

  imageZoom (e) {
    const ratio = 2.5;
    this.lens.style.backgroundImage = `url('${this.img.src})`;
    this.lens.style.backgroundSize = (this.img.width * ratio) + 'px ' + (this.img.height * ratio) + 'px';
    this.moveLens(e);
  }

  getCursorPos (e) {
    let a = this.img.getBoundingClientRect();
    let x = e.pageX - a.left;
    let y = e.pageY - a.top;
    return {'x': x, 'y': y};
  }

  moveLens (e) {
    const width = 150;
    const height = 0;
    const position = this.getCursorPos(e);
    const ratio = 2.5;
    let x = position.x;
    let y = position.y;
    if (x > this.img.width - (width / ratio)) {
      x = this.img.width - (width / ratio);
    }
    if (x < (width / ratio)) {
      x = (width / ratio);
    }
    if (y > this.img.height - (height / ratio)) {
      y = this.img.height - (height / ratio);
    }
    if (y < (height / ratio)) {
      y = (height / ratio);
    }
    this.lens.style.left = (x - width) + 'px';
    this.lens.style.top = (y - height) + 'px';
    this.lens.style.backgroundPosition = '-' + ((x * ratio) - width + ratio) +
      'px -' + ((y * ratio) - height + ratio) + 'px';
  }

  activateZoom (e) {
    if (!this.state.zoomActivated) {
      this.lens.style.display = 'block';
      document.getElementById('POModalThumbDisplayer').style.display = 'none';
      document.getElementById('POModalArrowContainer').style.display = 'none';
      this.setState({
        zoomActivated: true,
      });
    } else {
      this.lens.style.display = 'none';
      document.getElementById('POModalThumbDisplayer').style.display = 'flex';
      document.getElementById('POModalArrowContainer').style.display = 'flex';
      this.setState({
        zoomActivated: false,
      });
    }
  }

  render () {
    return (
      <div className='POModal' id='POModal' data-testid="ModalGallery">
        <button className='POCloseModal' onClick={this.props.switchModal}>x</button>
        <div id='POModalArrowContainer'>
          <FontAwesomeIcon icon={faArrowLeft} size='lg' id='ModalArrowLeft' className='ModalArrow' onClick={this.rotateLeft.bind(this)} />
          <FontAwesomeIcon icon={faArrowRight} size='lg' id='ModalArrowRight' className='ModalArrow' onClick={this.rotateRight.bind(this)}/>
        </div>
        <div id='POModalImageDisplayer'>
          <div id='POModalZoomImage'></div>
          <div id='POModaImageWrapper'>
            <div id='POModalLens' onMouseMove={this.imageZoom.bind(this)} onClick={this.activateZoom.bind(this)}></div>
            <img alt={'Modal Image'} className='POModalImage' id='PONormalImage' onClick={() => { this.activateZoom.bind(this)(); }} src={this.props.photos[this.state.index].url}
              onMouseMove={this.imageZoom.bind(this)}/>
          </div>
        </div>
        <div id='POModalThumbDisplayer'>
          {this.props.photos.map((element, index) => {
            if (this.state.index === index) {
              return <img alt={'Modal Thumb Display'} className='POModalDisplayThumbImg POModalThumbImg' key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisp(index); }} />;
            } else {
              return <img alt={'Modal Thumb Images'} className='POModalThumbImg' key={index} src={element.thumbnail_url} onClick={() => { this.thumbToDisplay.bind(this)(index); }} />;
            }
          })}
        </div>
      </div>
    );
  }
}

export default ExpandedModal;