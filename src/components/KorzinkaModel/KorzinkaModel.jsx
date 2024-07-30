import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './KorzinkaModel.scss'
import { useDispatch, useSelector } from 'react-redux';
import { minusProduct, plustProduct } from '../../redux/reduxStore/korzinkaSlice';

const KorzinkaModel = ({isModalOpen, setIsModalOpen}) => {
    const {korzinka , korzinkaPrice} = useSelector(state => state.korzinkaSlice);

    const dispatch = useDispatch()

    
  return (
    <div >
       {
        isModalOpen &&
        <div className="my-modal">
            <div className="my-modal-box">
                <div className="my-modal-header">
                    <h3>Ваш заказ</h3>
                    <i onClick={() => setIsModalOpen(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className="my-modal-body">
                    {
                        korzinka.map((item, index) => {
                            return(
                                <div className='korzinka-item' key={index}>
                                    <div className="korzinka-left">
                                        <img src={item.image.url} alt="" />
                                    </div>
                                    <div className="korzinka-right">
                                        <h4>{item.name}</h4>
                                        <p>{item.testo ? item.testo + ' , ' : ''}{item.size} {item.size && 'см'} </p>
                                        <div className="korzinka-right-box">
                                            <div className="counter">
                                                <button onClick={() => dispatch(minusProduct(item))} className="minus-btn">-</button>
                                                <span className='counter-display'>{item.count}</span>
                                                <button onClick={() => dispatch(plustProduct(item))} className="plus-btn">+</button>
                                            </div>
                                            <div className="korzinka-price">
                                                {item.price} ₽
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="my-modal-footer">
                    <div>
                    <h3 className='modal-footer-h3'>Итого: {korzinkaPrice}  ₽</h3>
                    <button className='modal-booking-btn'>Оформить заказ</button>
                    </div>
                </div>
            </div>
        </div>
       } 
    </div>
  );
};

export default KorzinkaModel;