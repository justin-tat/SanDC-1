import React from 'react';

class ProductBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var { meta } = this.props;
    var chars = meta.characteristics;
    var keys = Object.keys(chars);
    var breakdown = null;
    if (keys.length > 0) {
      breakdown = keys.map((char, index) => {
        return(
          <div key={index}>{char}: {parseFloat(chars[char].value).toFixed(2)}</div>
        )
      })
    }

    return (
      <div className="rr-product-breakdown">
        <b>Product Breakdown</b>
        {breakdown}
        <br/>
      </div>
    )
  }
}

export default ProductBreakdown;