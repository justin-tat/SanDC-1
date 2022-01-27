import React from 'react';
class Cart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      sku: null,
      size: '',
      maxQuantity: 0,
      selectedQuantity: 0
    };
    this.selectSize = this.selectSize.bind(this);
    this.selectQuantity = this.selectQuantity.bind(this);
    this.submitToCart = this.submitToCart.bind(this);
  }

  submitToCart(event) {
    event.preventDefault();
    if (this.state.size.length > 0 && this.state.selectedQuantity > 0 && this.state.sku !== null) {
      this.props.addToCart(this.state)
      alert('Added ' + this.state.selectedQuantity + ' of size ' + this.state.size + ' to the cart.')
    } else {
      alert('Please select product options.')
    }
  }

  selectSize(event) {
    if (event.target.value !== 'Size:') {
      var skuAndQty = event.target.selectedOptions[0].id;
      var item = event.target.value
      this.setState({ sku: Number.parseInt(skuAndQty.split('qty')[0]) })
      this.setState({ size: item })
      this.setState({ maxQuantity: Number.parseInt(skuAndQty.split('qty')[1]) })
    } else {
      this.setState({ sku: null })
      this.setState({ size: '' });
      this.setState({ maxQuantity: 0 })
    }
  }

  selectQuantity(event) {
    this.setState({ selectedQuantity: Number.parseInt(event.target.value) })
  }

  render() {
    return (
      <form>
        <label htmlFor="size">Size</label>
        <select className="ov-changeSize" name="size" onChange={(e) => {this.selectSize(e); this.props.trackClicks(e, 'Overview')}}>Size
          <option key='default'>Size:</option>
          {this.props.inventory.map((item, index) => <option key={item[0] + 'qty' + item[1].quantity} id={item[0] + 'qty' + item[1].quantity}>{item[1].size}</option>)}
        </select>
        <label htmlFor="quantity">Quantity</label>
        <select className="ov-changeQuantity" name="quantity" onChange={(e) => {this.selectQuantity(e); this.props.trackClicks(e, 'Overview')}}>Quantity
          {Array.from({ length: this.state.maxQuantity + 1 }, (blank, i) => i).map((option, i) => {
            return <option key={'quantity' + i}>{i}</option>
          })}
        </select>
        <button className="ov-addItem" onClick={(e) => {this.submitToCart(e); this.props.trackClicks(e, 'Overview')}}>Submit</button>
      </form>)
  }
}

export default Cart;