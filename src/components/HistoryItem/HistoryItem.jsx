import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getOneProduct } from '../../server/productsServer'

const HistoryItem = ({item}) => {
    const [isOpen , setIsOpen ] = useState(false)
    

    const showStatus = (status) => {
        if(status == 'Pending'){
            return 'Обрабатывается'
        }else if(status == 'Done'){
            return "Выполнен"
        }else{
            return 'Отмена'
        }
    }
    const showPayment = (payment) => {
        if(payment == 'Cash'){
            return 'Наличкой'
        }else if(payment == 'Card'){
            return "Картой"
        }else{
            return 'ApplePay'
        }
    }

    

   
    useEffect(() => {
        
    } ,[])
  return (
    <div>
      <div className='history-box'>
                                <div className="history-box-header">
                                    <div className="history-header-items demo-history-item">
                                        <span className="color"></span>
                                    <div className='not-flex'>
                                        <h4>Заказ</h4>
                                            <div>
                                                <h3>№{item.orderId}</h3>
                                                <p className="date">{moment(item.createdAt).format('DD-MM-YYYY')}</p>
                                            </div>
                                    </div>
                                    </div>
                                    <div className="history-header-items">
                                        <h4>Сумма заказа</h4>
                                        <div>
                                            <h3>{item.price} ₽</h3>
                                        
                                        </div>
                                    </div>
                                    <div className="history-header-items">
                                        <h4>Статус</h4>
                                        <div>
                                            <h3>
                                                {showStatus(item.status)}
                                            </h3>
                                        
                                        </div>
                                    </div>
                                    <div className="history-header-items">
                                        <h4>Оплачено</h4>
                                        <div>
                                            <h3>{showPayment(item.payType)}</h3>
                                        
                                        </div>
                                    </div>
                                    <div className="history-header-items">
                                    <i onClick={() => setIsOpen(prev => !prev)} class={`fa-solid fa-chevron-${isOpen ? 'down' : 'up'}`}></i>
                                    </div>
                                </div>
                                <hr />
                                <div className="history-body">
                                    <div className="history-address">
                                        <h3>{item.address.name}</h3>
                                    </div>
                                    <div className="history-images">
                                        
                                        {
                                            item.products.map(prod => {
                                                return(
                                                    <img src={prod.image?.url} alt="image" />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <hr />
                                {
                                    item.products.map((prod ,index) => {
                                        return(
                                            <div key={index} className={`history-body2  ${isOpen && 'unable'}`}>
                                                <div>
                                                    <img src={prod?.image.url} alt="image" />
                                                    <h3 className="history-product-title">{prod.name}</h3>
                                                </div>
                                               
                                                <div>
                                                    <p className="history-extras">{prod.testo ? prod.testo + ' , ' : ''} {prod.size ? prod.size : ''}</p>
                                                </div>
                                                <div>
                                                <span className="product-count">{prod.count} товар</span>
                                                </div>
                                                <div>
                                                    <p className="history-price">{prod.price} ₽</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <hr />
                                <button className={`history-retry ${isOpen && 'unable'}`}>
                                    Повторить заказ
                                </button>
                            </div>
    </div>
  )
}

export default HistoryItem
