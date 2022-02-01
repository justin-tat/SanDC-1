import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const StyleBubble = (props) => {
  const update = () => {
    props.updater(props.style, props.styleId);
  };

  if (props.usecheck) {
    return (
      <div className='POStyleCircleContainer' onClick={update}>
        <img alt={'Selected Style'} className='POStyleSmallImg' alt={props.style.name} src={props.style.photos[0].thumbnail_url} />
        <FontAwesomeIcon icon={faCheckCircle} className='POStyleCheck'/>
      </div>
    );
  } else {
    return (
      <div className='POStyleCircleContainer' onClick={update}>
        <img alt={'Other Styles'} className='POStyleSmallImg' alt={props.style.name} src={props.style.photos[0].thumbnail_url} />
      </div>
    );
  }
};

export default StyleBubble;