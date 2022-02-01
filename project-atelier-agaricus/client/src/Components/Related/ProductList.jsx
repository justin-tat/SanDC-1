import React from 'react'
import ProductCard from './ProductCard.jsx';


export default function ProductList({ products }) {
 return (
   <div className='related-card-container'>
     {products.map(product =>
       <ProductCard
         id={product.id}
         category={product.category}
         name={product.name}
         price={product.default_price}
       />
     )}
   </div>
 )
}
