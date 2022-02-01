import React from 'react';
import {useState} from 'react';
import $ from 'jquery'

class ExpandedView extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      zoom: false
    }

    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleZoomClick = this.handleZoomClick.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  handleCloseClick() {
    this.setState({
      zoom: false
    })
    this.props.close()
    this.props.clickTracker('Close Expanded View', 'ExpandedView')
  }

  handleZoomClick() {
    var zoomState = this.state.zoom
    this.setState({
      zoom: !this.state.zoom
    })
  }

  handleMouseMove(e) {
    const {clientX: x, clientY: y} = e;
    var $image = $('img')
    $image.css('transform-origin', `${x}px ${y}px`)
  }

  render() {
    var imageStyle = this.state.zoom ? 'zoom-in' : 'zoom-out'

    if (this.props.isOpen) {

      return (
        <div className={"modal-wrapper"}>
          <div onClick={this.handleCloseClick} className={"modal-backdrop"} />
            <div className={"modal-box"}>
              <button onClick={this.handleCloseClick}>X</button>
              <div className={"thumbnail-icon"}>test</div>
              <img onClick={this.handleZoomClick} onMouseMove={this.handleMouseMove}
              className={imageStyle} src={this.props.image} alt="image-expanded"/>
            </div>
        </div>
      )
    }
    return null
  }
}



export default ExpandedView;