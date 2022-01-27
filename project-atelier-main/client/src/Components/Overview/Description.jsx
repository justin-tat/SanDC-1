import React from 'react';
import Rating from './Rating.jsx';

function Description(props) {
  var productInfo = props.productInfo;
  return (
    <table class="ov-description">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{productInfo.name}</td>
          <td>{productInfo.category}</td>
          <td>{productInfo.description}</td>
          <td>${productInfo.default_price}</td>
        </tr>
        <tr>
          <th>Features</th>
          <th>Rating</th>
        </tr>
        <tr>
          <tr>{productInfo.features ? productInfo.features.map((feature, id) => <tr key={'feature' + id}><td><b>{feature.feature}</b>: {feature.value}</td></tr>) : ''}</tr>
          <Rating avgRating={Math.floor(props.avgRating)} />
        </tr>
      </tbody>
    </table>
  )
}

export default Description;