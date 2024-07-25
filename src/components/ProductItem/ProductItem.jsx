import React from 'react'

const ProductItem = ({product}) => {
  return (
    <div >
      <img src={product.image.url} alt="image" />
      <div>
        <h4>{product.name}</h4>
        <p>{product.text}</p>
        <p className="price">{product.price}</p>
      </div>
    </div>
  )
}

export default ProductItem;