import React from 'react';

const SizeDropdown = (props) => {
  var sizes = Object.values(props.displayedSkus);

  const setSku = (e) => {
    var size = document.getElementById('sizeSelector').value;
    for (var key in props.displayedSkus) {
      if (props.displayedSkus[key].size === size) {
        props.changeSku(props.displayedSkus[key], key);
        break;
      } else {
        props.changeSku('Select Size');
      }
    }
  };

  if (sizes.length === 0) {
    return (
      <div className='POATOC'>
        <select disabled>
          <option value='' hidden>Out Of Stock</option>
        </select>
      </div>
    );
  } else {
    return (
      <div className='POATOC'>
        <select name='Size' id='sizeSelector' defaultValue='' onChange={setSku}>
          <option value='SelectSize' >Select Size</option>
          {sizes.map((element, index) => {
            return <option key={index}>{element.size}</option>;
          })}
        </select>
      </div>
    );
  }
};

export default SizeDropdown;