import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './KorzinkaModel.scss'
import { useSelector } from 'react-redux';

const KorzinkaModel = ({isModalOpen, setIsModalOpen}) => {
    const {korzinka} = useSelector(state => state.korzinkaSlice);
    console.log(korzinka);
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
                                    <h3>{item.name}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
       } 
    </div>
  );
};

export default KorzinkaModel;