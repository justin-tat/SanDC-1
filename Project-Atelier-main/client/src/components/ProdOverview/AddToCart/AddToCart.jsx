import React from 'react';
import SizeDropdown from './SizeDropdown.jsx';
import QuantityDropdown from './QuantityDropdown.jsx';
import AddToFavorite from './AddToFavorite.jsx';

class AddToCart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      desiredSize: 'Select Size',
    };
  }

  componentDidUpdate({displayedStyle}) {
    if (this.state.desiredSize !== 'Select Size') {
      this.setState({
        desiredSize: 'Select Size',
      });
    }
  }

  changeSku (sku, skuNum) {
    this.setState({
      sku: skuNum,
      skuQuantity: sku.quantity,
      desiredSize: sku.size,
    });
  }

  updateButtonText () {
    alert('Added to Cart!');
  }
  render () {
    return (
      <div className='POAddToCart'>
        <SizeDropdown displayedSkus={this.props.displayedStyle.skus} changeSku={this.changeSku.bind(this)} />
        <QuantityDropdown selectedQuantity={this.state.skuQuantity} />
        <div >
          <button className='POAddToCartbutton' id='POAddToCartbutton' onClick={this.updateButtonText}>Add To Cart</button>
        </div>
        <AddToFavorite toggleFavorite={this.props.toggleFavorite.bind(this)} addToFavorites={this.props.addToFavorites}
          currentStyleId={this.props.currentStyleId} />
      </div>
    );
  }
}

export default AddToCart;