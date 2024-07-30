import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./ProductItem.css"
import { useSelector } from 'react-redux'

const ProductItem = ({product, handleOpenModal}) => {

  const {user} = useSelector(state => state.authSlice)
  const navigate = useNavigate()

  const handleisLogged = () => {
    if(!user){
      return navigate('/login')
    }
    handleOpenModal(product)
  }
  
  return (
    <div className="card1">
        <div className='content1' onClick={handleisLogged} >
        <img src={product.image.url} alt="image" />
        <div className='content1-box'>
          <h4>{product.name}</h4>
          <p>{product.text}</p>
          <div className="price-btn">
            <button className="choose-btn">
              Выбрать
            </button>
          <p className="price">от {product.price} ₽</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;