import React from 'react';
import StyleBubble from './StyleSelectBubble.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const StyleSelector = (props) => {
  const rows = [...Array( Math.ceil(props.styles.results.length / 4) )];
  const formattedArr = rows.map( (row, idx) => props.styles.results.slice(idx * 4, idx * 4 + 4) );
  const styleRows = formattedArr.map((row, index) => (
    <div className='POStyleRowContainer' key={index}>
      {row.map((element, index) => {
        if (element.style_id === props.displayedStyle.style_id) {
          return <div className='POStyleContainer' key={index}>
            <StyleBubble style={element} updater={props.changeStyle} usecheck={true} styleId={element.style_id} />
          </div>;
        } else {
          return <div className='POStyleContainer' key={index}>
            <StyleBubble style={element} updater={props.changeStyle} usecheck={false} styleId={element.style_id} />
          </div>;
        }
      })}
    </div>
  ));
  return (
    <div className='styleSelector'>
      <div>
        <p className='POStyleName'><strong>{'Style >'}</strong> {props.displayedStyle.name}</p>
      </div>
      {styleRows}
    </div>
  );
};

export default StyleSelector;