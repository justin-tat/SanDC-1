import React from 'react';

const Category = (props) => {
var upperCase = props.category.toUpperCase()
  return (
    <div className="category">{upperCase}</div>
  )
}

export default Category;