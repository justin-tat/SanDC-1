import React from 'react'
import SizeDropDown from './SizeDropDown.jsx'

class SizeSelector extends React.Component {
  constructor(props) {
    super(props)
    // console.log('skus', this.props)
    this.state = {
       disabled: false,
       display: '',
       openList: false,
       testData: {
        2122801: {quantity: 0, size: 'XS'},
        2122802: {quantity: 0, size: 'S'},
        2122803: {quantity: 0, size: 'M'},
        2122804: {quantity: 0, size: 'L'},
        2122805: {quantity: 0, size: 'XL'},
        2122806: {quantity: 0, size: 'XXL'}
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    var size = e.target.value.split(' ')[0]
    var quantity = e.target.value.split(' ')[1]
    this.setState({
      display: size
    })
    this.props.selectSize(size, quantity)
    this.props.clickTracker('Size DropDown', 'SizeSelector.jsx')
  };

  // openDropDown() {
  //   // console.log('open drop down called')
  //   this.setState({
  //     openList: true
  //   })
  //   this.props.openSizeDropDown()
  //   return (
  //     <SizeDropDown skus={this.props.skus} handleChange={this.handleChange}/>
  //     // skus={this.state.testData}
  //   )
  // }

  componentDidMount() {
    var sum = 0;
    var display;
    // for(let sku in this.state.testData) {
      ////⚪️
    for (let sku in this.props.skus) {
      // const quantity = this.state.testData[sku].quantity
      ///⚪️
      const quantity = this.props.skus[sku].quantity
      sum += quantity
      // console.log('quant', quantity)
    }
    if (sum === 0) {
      this.props.hideAddToCart()
       this.setState({
         disabled: true,
         display: 'OUT OF STOCK'
       })
    } else {
      this.setState({
        disabled: false,
        display: 'Select Size'
      })
    }

    if (this.props.showSizes) {
      return <SizeDropDown skus={this.props.skus}/>
    }
  }

  //div height conditional -- collapsed height === 0
  //open height = auto to fit

  render() {
    var list;
    if(this.props.noSizeSelected) {
      ///⚪️
      list = <SizeDropDown skus={this.props.skus}/>
      // list = <SizeDropDown skus={this.state.testData} handleChange={this.handleChange} />
    } else {
      list = null
    }
  return (
  //  <div className="size-selector">
  //    <button className="size-selector-button" onClick={this.openDropDown} disabled={this.state.disabled}>{this.state.display}</button>
  //    {list}
  //  </div>
   <select className="size-selector" onChange={this.handleChange} disabled={this.state.disabled}>
     <option value="Select Size">{this.state.display}</option>
   <SizeDropDown skus={this.props.skus}/>
   {/* {list} */}
   </select>
  )
}
}

export default SizeSelector;
