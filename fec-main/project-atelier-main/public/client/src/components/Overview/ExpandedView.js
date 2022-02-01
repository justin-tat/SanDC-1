import React from 'react';
import {useState, useEffect} from 'react';
import $ from 'jquery'

const ExpandedView = (props) => {


  const [zoom, setZoom] = useState(false)
  const [imageStyle, setImageStyle] = useState('zoom-out')

  //when compdoesmount and when zoom (whatever is in array) state changes, runs
  //use reducer, use dispatch, use ref, use callback robin wieruch--react blog

//50 v max height
//50 v max width

//display: flex
//justify content: cneter
//align -items : center
  useEffect(()=> {
    if(zoom) {
      setImageStyle('zoom-in')
    } else {
      setImageStyle('zoom-out')
    }
  }, [zoom])


  const handleCloseClick = () => {
    setZoom(false)
    props.close()
    props.clickTracker('Close Expanded View', 'ExpandedView.js')
  }

  const handleZoomClick = () => {
    setZoom(prev => !prev)
    props.clickTracker('Zoom Expanded View', 'ExpandedView.js')
  }

  const handleMouseMove = () => {
    const {clientX: x, clientY: y} = event;
    var $image = $('img')
    $image.css('transform-origin', `${x}px ${y}px`)
  }

  const handleIconClick = (event, photo, index) => {
    props.iconClick(photo, index)
    props.clickTracker('Expanded View Icon', 'ExpandedView.js')
  }

    if (props.isOpen) {
      return (
        <div className={"modal-wrapper"}>
          <div onClick={handleCloseClick} className={"modal-backdrop"} />
            <div className={"modal-box"}>

              <div className="modal-side-bar">
              <button className={"modal-close-btn"} onClick={handleCloseClick}>X</button>
              <div className="icon-wrapper">
              {props.photos.map((photo, index) =>
                <button style={{top: index * 50}} key={index}
                className={"thumbnail-icon"}
                onClick={(e)=>handleIconClick(e, photo.url, index)}>.</button>
                )}
                </div>
              </div>

              <img onClick={handleZoomClick} onMouseMove={handleMouseMove}
              className={imageStyle} src={props.image} draggable="true"/>
              </div>

        </div>
      )
    }
    return null
}

export default ExpandedView

