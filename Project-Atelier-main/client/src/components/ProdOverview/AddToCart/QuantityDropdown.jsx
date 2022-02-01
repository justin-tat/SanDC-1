import React from 'react';

const QuantityDropdown = (props) => {
  if (!props.selectedQuantity) {
    return (
      <div>
        <select id='PODisabledQuantity' disabled>
          <option value='' hidden>-</option>
        </select>
      </div>
    );
  } else {
    var sizeArr = [];
    if (props.selectedQuantity < 15) {
      for (var i = 1; i <= props.selectedQuantity; i++) {
        sizeArr.push(i);
      }
    } else {
      for (var i = 1; i <= 15; i++) {
        sizeArr.push(i);
      }
    }
    return (
      <div className='POATOC'>
        <select id='POQuantitySelector'>
          {sizeArr.map((element, index) => {
            return <option key={index}>{element}</option>;
          })}
        </select>
      </div>
    );
  }
};

export default QuantityDropdown;