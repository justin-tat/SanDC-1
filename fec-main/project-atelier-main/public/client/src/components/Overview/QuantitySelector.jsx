import React from 'react';
import QuantityDropDown from './QuantityDropDown.jsx'

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props)
   this.state = {
     disable: false
   }

   this.handleChange = this.handleChange.bind(this)
}

handleChange(e) {
  // console.log('quantity', e.target.value)
  var quantity = e.target.value
  this.props.selectQuantity(quantity)
  this.props.clickTracker('Quantity DropDown', 'QuantitySelector.jsx')
}

  render() {
    var disable;
    console.log('this.props.size', this.props.size)
    if (this.props.size === 'Select Size' || this.props.available === 0) {
      disable = true
    } else {
      disable = false
    }
    return (
      <select className="quantity-selector" onChange={this.handleChange} disabled={disable}>
        <option >{disable? '-' : '1'}</option>
        <QuantityDropDown size={this.props.size} available={this.props.available}/>
      </select>
    )
  }
}

export default QuantitySelector;