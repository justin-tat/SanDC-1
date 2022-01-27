import React from 'react';

export default function ProductCard({ key, id, image, category, name, price}) {
 // console.log(category)
 return (
   <div className="related-card" key={id}>
       <div>{image}</div>
       <b>{category}</b>
       <div>{name} ${price}</div>
       <div></div>
   </div>
 )
}


