import React, { useEffect, useState } from 'react'
import Navbar3 from '../../components/Navbar3/Navbar3';
import "./Korzinka2.css";
import planeImg from '../../img/Group 92.png';
import { useDispatch, useSelector } from 'react-redux';
import { minusProduct, plustProduct, pushKorzinka } from '../../redux/reduxStore/korzinkaSlice';
import { getOneCategory } from '../../server/categoryServer';
import { v4 } from 'uuid';
import  Footer  from '../../components/Footer/Footer';
import { postBooking } from '../../server/bookingServer';
import { useNavigate } from 'react-router-dom';

const Korzinka2 = () => {
  const dispatch = useDispatch()
  const {user } = useSelector(state => state.authSlice)
  const {korzinka , korzinkaPrice} = useSelector(state => state.korzinkaSlice);
  const [extrProducts, setExtraProducts ] = useState([]);
  const [souses, setSouses ] = useState([]);
  const [manageTime , setManageTime ] = useState('По времени');
  const [manageSdachi , setManageSdachi ] = useState('Без сдачи');
  const [manageOplata , setManageOplata ] = useState('Cash');
  const [manageComment , setMannageComment ] = useState(null);
  const [addressDetails , setAddressDetails] = useState({
    dom :'',
    kvartira: '',
    podyezd : '',
    domofon: '',
    etaj : ''
  });
  
  const navigate = useNavigate()

  const handleCategoryProducts = async () => {
    try {
      const data = await getOneCategory('669bc2d1dd5ed05253fee32a')
      const data2 = await getOneCategory('66a8d69e43cd36b46a79e2a6');

      setSouses(data2.category[0].products)
      setExtraProducts(data.category[0].products)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  
  const handleAddKorzinka = (modalInfo) => {
    const abc = {
      id: v4(),
      name: modalInfo.name ? modalInfo.name : modalInfo.title ,
      text: modalInfo.text ,
      price: modalInfo.price,
      image : modalInfo.image, 
      count: 1,
      _id:modalInfo._id
    }
    dispatch(pushKorzinka(abc))
    let localKorzinka = JSON.parse(localStorage.getItem('korzinka'));
    if(localKorzinka){
      localKorzinka.push(abc)
      localStorage.setItem('korzinka' , JSON.stringify(localKorzinka))
    }else{
      localStorage.setItem('korzinka' , JSON.stringify([abc

      ]))
    }
  }
  const handleOptionChange = (event) => {
    setManageTime(event.target.value);
    
  };
  const handleChangeSdachi = (event) => {
    setManageSdachi(event.target.value);
  };

  const handleChangeOplata = (event) => {
    setManageOplata(event.target.value);
  }
  const handleChangeComment = (event ) => {
    setMannageComment(event.target.value)
  }

  const handleChangeAddresdetails = (event) => {
    let abc = addressDetails
    abc[event.target.name] = event.target.value
    setAddressDetails(abc)
  }

  const handleCreateBooking = async () => {
    try {
      
      const value = {
        orderId: Date.now(),
        address: {...user.address, details: addressDetails},
        price: korzinkaPrice,
        payType: manageOplata,
        products: korzinka,
        consumerId: user._id,
        comment: manageComment,
        timeManagement: manageTime
      }

      const data = await postBooking(value);
      navigate('/process')

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleCategoryProducts();
    
  } ,[])
  return (
    <>
          <Navbar3/>
    <div className='container2'>
        <div className="zakaz">
          <h2>Ваш заказ</h2>
          {
            korzinka?.map(item => {
              return(
                <div className="content">
                  <div className='content-box'>
                    <img src={item.image.url} alt="img" />
                    <div className="text">
                      <h4>{item.name}</h4>
                      <h5>{item.testo ? item.testo + ' , ' : ''}{item.size} {item.size && 'см'}</h5>
                    </div>
                  </div>
                  <div className='content-box'>
                  <div className="count">
                    <button onClick={() => dispatch(minusProduct(item))}>-</button>
                    <span>{item.count}</span>
                    <button onClick={() => dispatch(plustProduct(item))}>+</button>
                  </div>
                  <h3>{item.price}₽</h3>
                  </div>
                </div>
              )
            })
          }
          <div className="promokod">
            <div className="item">
              <input type="text" placeholder='Промокод'/>
              <button><img src={planeImg} alt="" /></button>
            </div>
            <h3>Итого: {korzinkaPrice} ₽</h3>
          </div>
          <div className="zakaz-carousel">
            <h2 className='titlee'>Добавить к заказу?</h2>
              <div className="flex">
                {
                  extrProducts.map(item => {
                    return(
                      <div className="flex-item">
                        <img src={item.image.url} alt="image" />
                        <div>
                          <h4 className="title">{item.name}</h4>
                          <p>{item.portion}</p>
                          <button onClick={() => handleAddKorzinka(item)} className='price-btn'>{item.price} ₽</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <h2 className='titlee'>Соусы</h2>
              <div className="flex">
                {
                  souses.map(item => {
                    return(
                      <div className="flex-item">
                        <img src={item.image.url} alt="image" />
                        <div>
                          <h4 className="title">{item.name}</h4>
                          <p>{item.portion}</p>
                          <button onClick={() => handleAddKorzinka(item)} className='price-btn'>{item.price} ₽</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
          </div>
          <div className="info">
            <h3> О вас</h3>
            <div className="info-div">
              <div className="info-item">
                <p>Имя*</p>
                <input type="text" defaultValue={user?.name}/>
              </div>
              <div className="info-item">
                <p>Номер телефона**</p>
                <input type="text" defaultValue={user?.telephone}/>
              </div>
              <div className="info-item">
                <p>Почта*</p>
                <input type="text" defaultValue={user?.email}/>
              </div>
            </div>
          </div>
          <hr />
          <div className="dostavka">
            <div className="dostavka-item">
              <h3>Доставка</h3>
              <div className="btn">
                <div className="btn1">
                  Доставка
                </div>
                <div className="btn1">Самовывоз</div>
              </div>
            </div>
            <h6>Улица*</h6>
            <input type="text" defaultValue={user?.address.name} className='ulisa'/>
            <div className="dostavka-item">
              <div className="input">
                <p>Дом</p>
                <input onChange={handleChangeAddresdetails} name='dom' type="text" placeholder='1а'/>
              </div>
              <div className="input">
                <p>Подъезд</p>
                <input onChange={handleChangeAddresdetails} name='podyezd' type="text" placeholder='1'/>
              </div>
              <div className="input">
                <p>Этаж</p>
                <input onChange={handleChangeAddresdetails} name='etaj' type="text" placeholder='2'/>
              </div>
              <div className="input">
                <p>Квартира</p>
                <input onChange={handleChangeAddresdetails} name='kvartira' type="text" placeholder='3'/>
              </div>
              <div className="input">
                <p>Домофон</p>
                <input onChange={handleChangeAddresdetails} name='domofon' type="text" placeholder='0000'/>
              </div>
            </div>
            <p>Когда выполнить заказ?</p>
            <div className="dostavkaa-item">
              <h5><label htmlFor="skorey">
                <input  onChange={handleOptionChange} name='zakaz1' value={'Как можно скорее'} id='skorey' type="radio" />
                Как можно скорее
                </label></h5>
              <h5>
                <label htmlFor="vremeni">
                <input checked onChange={handleOptionChange} name='zakaz1' value={'По времени'} id='vremeni' type="radio" /> По времени
                </label>
              </h5>
            </div>
            <hr />
            <h3>Оплата</h3>
            <div className="dostavkaa-item">
              <h5>
                <label htmlFor="nalichnimi">
                  <input onChange={handleChangeOplata} value={'Cash'}  name='oplata' type="radio" id='nalichnimi' /> Наличными
                </label>
              </h5>
              <h5>
              <label htmlFor="kartoy">
                  <input onChange={handleChangeOplata} value={'Card'} name='oplata' type="radio" id='kartoy' /> Картой
                </label>
              </h5>
              <h5>
                <label htmlFor="applepay">
                  <input onChange={handleChangeOplata} value={'Applepay'} name='oplata' type="radio" id='applepay' /> Apple Pay
                </label>
              </h5>
            </div>
            <hr />
            <h3>Сдача</h3>
            <div className="dostavkaa-item">
              <h5>
                <label htmlFor="nosdacha">
                  <input checked onChange={handleChangeSdachi} name='sdacha' value={'Без сдачи'} type="radio" id='nosdacha' />Без сдачи
                </label>
              </h5>
              <h5>
                <label htmlFor="sdacha">
                  <input onChange={handleChangeSdachi} name='sdacha' value={'Сдача с'} id='sdacha' type="radio" />Сдача с
                </label>
              </h5>
              
              {
                manageSdachi != "Без сдачи" &&
                <h5><input className='sdachi-inp' type="text" defaultValue={'0'}/>₽</h5>
              }
            </div>
            <hr />
            <h3>Комментарий</h3>
            <textarea onChange={handleChangeComment} className='textarea-zakaz' placeholder='Есть уточнения?' name="Есть уточнения?" id="" rows={10} cols={145}></textarea>
            <hr />
            <div className="dostavka-item">
              <h3 className='last'>Итого: {korzinkaPrice} ₽</h3>
              <button onClick={handleCreateBooking}>Оформить заказ</button>
            </div>
          </div>
        </div>

    </div>
        <Footer />
    </>
  )
}

export default Korzinka2;