import React, { useEffect, useState } from 'react';
import pizza from "../../img/Rectangle 4.png"
import fire from "../../img/Group 81.png"
import cheese from "../../img/Group 83.png"
import product from "../../img/Group 89.png"
import peperoni from "../../img/Group 90.png"  
import sauce from "../../img/Group 91.png"
import mushroom from "../../img/Group 727.png"
import onions from "../../img/Group 728.png"
import maybe from "../../img/Group 729.png"
import "./WatchProduct.css"

import { Button, Modal } from 'antd';
import { getExtraIngredient, getProductIngredients } from '../../server/ingredientsServer';
import { getAllProducts } from '../../server/productsServer';
import { useDispatch } from 'react-redux';
import { pushKorzinka } from '../../redux/reduxStore/korzinkaSlice';

const WatchProduct = ({setIsModalOpen , isModalOpen , modalInfo, categoryTitle}) => {
    const [ingredients , setIngredients ] = useState([]);
    const [extra , setExtra ] = useState([]);
    const sizes = [20, 28 , 33]
    const [size , setSize ] = useState(sizes[0]);
    const [cost , setCost ] = useState(modalInfo.price);
    const [activeIndex, setActiveIndex] = useState(0);
    const [extraActive, setExtraActive ] = useState([]);
    const [products , setProducts ] = useState([])

    const dispatch = useDispatch()
    

    const handleCancel = () => {
      setIsModalOpen(false);
    };

  const handleProductIngredients = async ( ) => {
    try {
      const data = await getProductIngredients(modalInfo._id);
      setIngredients(data.ingredients);
    } catch (error) {
      console.log(error);
    }

  }
  const handleExtraIngredients = async () => {
    try {
      const data = await getExtraIngredient(modalInfo._id);
      setExtra(data.ingredients);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeCost = (data) => {
    setSize(data)
    if(data == 20){
      setCost(modalInfo.price)
    }else{
      setCost(Math.floor(data / 20 * Number(modalInfo.price )))
    }
  }

  const handleGetAllProducts = async () => {
    setProducts([])
    try {
      const data = await getAllProducts();
      const arr = modalInfo.products.map(item => {
        data.products.find(item2 => {
          if(item2._id == item){
            setProducts(prev => [...prev , item2])
          }
        })
      })
      
    } catch (error) {
      console.log(error);
    }
  } 
  
  const handleClickActive = (index) => {
    setActiveIndex(index);
  };

  const handleAddPrice = (item) => {
    if(extraActive.find(data => data.id == item._id)){
      setExtraActive(extraActive.filter(data => data.id !== item._id))
      return setCost(prev => prev *1 - Number(item.price))
    }else{
    setExtraActive(prev => [...prev , {id:item._id, price: item.price}])
    } 

    setCost(prev => prev *1 + Number(item.price))
  }

  const handleAddKorzinka = () => {
    dispatch(pushKorzinka({name: modalInfo.name ? modalInfo.name : modalInfo.title , text: modalInfo.text , price: cost, image : modalInfo.image, extra: extraActive}))
    
  }

  useEffect(() => {
    handleProductIngredients();
    handleExtraIngredients();
    handleChangeCost(20);
    if(categoryTitle == 'Комбо'){
      handleGetAllProducts()
    }
    
  } ,[modalInfo])
  return (
    <>
      
      <Modal className='Products' footer={false} closable open={isModalOpen} onCancel={handleCancel}>
        
      <div className="products-content">
        <div className="products-content-right">
          <button className='new'>NEW</button>
          <img src={modalInfo?.image?.url} alt=""  className='pizza'/>
        </div>
        <div className="products-content-left">
          <p><img src={fire} alt="fire" /> {modalInfo.name}</p>
          <div className="left-item">
            {
              ingredients.map(item => {
                return(
                  <button key={item._id} className="additional-products">
                    <div className="additional-products-item">
                      <img src={item.image.url} alt="image" />
                    </div>
                    <div className="additional-products-title">
                      <h5>{item.title}  </h5>
                    </div>
                  </button>
                )
              })
            }
          </div>
          <div className="dimensions">
            {
              categoryTitle == "Пицца" &&
              <div className="top">
              <button className={`left ${activeIndex == 0 ? 'active-type' : ''}`} onClick={() => {
                handleClickActive(0)
              }}>Традиционное</button>
              <button className={`left ${activeIndex == 1 ? 'active-type' : ''}`} onClick={() => {
                handleClickActive(1)
              }} >Тонкое</button>
            </div>
            }
            <div className="bottom">
              {
                categoryTitle == "Пицца" &&
                sizes.map((item, index) => {
                  return(
                    <div key={index} onClick={() => handleChangeCost(item)} className={`left ${(size == item ? "active-sm" : "")}` }>{item} см</div>
                  )
                })
              }
              
            </div>
          </div>
          <div>
            {
              categoryTitle == 'Комбо' &&
              products.map((item , index) => {
                return(
                  <div key={index} className='kombo-box'>
                    <img className='kombo-img' src={item.image.url} alt="image" />
                    <h4 className='kombo-title'>{item.name}</h4>
                  </div>
                )
              })
            }
          </div>
          <div className="supplement">
            {
              categoryTitle == "Пицца" && <h3>Добавьте в пиццу</h3>
            }
            <div className="left-item">
              {
                extra.map(item => {
                  return(
                    <button key={item._id} className={`additional-products ${extraActive.find(data => data.id == item._id)  ? "active-extra" : ""}`} onClick={() => handleAddPrice(item)} >
                      <div className="additional-products-item">
                        <img src={item.image.url} alt="image" />
                      </div>
                      <div className="additional-products-title">
                        <h5>{item.title}</h5>
                        <p className='price'>{item.price} ₽</p>
                      </div>
                    </button>
                  )
                })
              } 
          </div>
          </div>
          <div className="common-money">
            <h3>Итого: {cost}₽</h3>
            <button onClick={handleAddKorzinka}>Добавить</button>
          </div>
        </div>
      </div>
    
      </Modal>
    </>
    
  )
}

export default WatchProduct;