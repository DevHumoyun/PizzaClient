import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ProductItem.css"

const ProductItem = ({product, handleOpenModal}) => {

  const navigate = useNavigate()

  const handleWatchProduct = () => {
    navigate(`/watchProduct/${product._id}`)
  }
  return (
    <div className="card">
        <div className='content' onClick={() => handleOpenModal(product)} >
        <img src={product.image.url} alt="image" />
        <div>
          <h4>{product.name}</h4>
          <p>{product.text}</p>
          <p className="price">{product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;