import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import img from "../../img/Group 1.png"
import img2 from "../../img/Group 2.png"
import { FacebookOutlined, InstagramOutlined, PhoneOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  DropdownButton } from 'react-bootstrap'
import Dropdown from '../Dropdown/Dropdown'
import { setUser } from '../../redux/reduxStore/authSlice'
import KorzinkaModel from '../KorzinkaModel/KorzinkaModel'
import { setKorzinka } from '../../redux/reduxStore/korzinkaSlice'
import Footer from '../Footer/Footer'

const Navbar = ({isModalOpen , isLog}) => {
  const {user } = useSelector(state => state.authSlice);
  const {korzinkaPrice , korzinka } = useSelector(state => state.korzinkaSlice)
  const [modal2Open , setModal2Open ] = useState(false);
  const[isBar , setIsBar ] = useState(false)
  

 

  const handleChangeBar = () => {
    setIsBar(prev => !prev)
  }

  useEffect(() => {
    console.log(isLog);

  } , [isLog])
  
  return (
   <div className={`nav-main ${isModalOpen && "nav-index"} ${isLog && 'nav-log'}`}>
     <nav>
      <div className="container">
        <div className="nav-top">
            <div className="nav-left">
              <div className="navbar">
                  <img src={img} alt="location" />
                  <select>
                    <option value="moskva">Москва</option>
                    <option value="toshkent">Toshkent</option>
                  </select>
              </div>
              <h4 className='h4 prover-address'>Проверить адрес</h4>
              <h4 className='h4'>Среднее время доставки*: 00:24:19</h4>
            </div>
            <div className="nav-right">
              <h4>Время работы: c 11:00 до 23:00</h4>
              
              <Dropdown />
            </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="nav-low">
          <Link to={'/'} className="nav-low-left">
            <img src={img2} alt="pizza" />
            <h4>Куда пицца</h4>
          </Link>
          <div className="nav-low-right">
            <button className='shopping-btn' onClick={() => setModal2Open(true)} >
              <ShoppingCartOutlined className='shopping'/> 
              <p>{korzinkaPrice} ₽</p>
              <span className='btn-mini-span'>{korzinka.length}</span>
              </button>
            <button onClick={handleChangeBar} className='bar-menu'>
              {
                !isBar ? <i class="fa-solid fa-bars"></i> :
                <i className='fa-solid fa-xmark'></i>
              }
            </button>
          </div>
        </div>

        {
          isBar &&
          <div>
                <Dropdown />
                <hr />
                <ul className='bar-ul'>
                  <li>Акции</li>
                  <li>О компании</li>
                  <li>Пользовательское соглашение</li>
                  <li>Условия гарантии</li>
                  <li>Ресторан</li>
                  <li>Контакты</li>
                  <li>Поддержка</li>
                  <li>Отследить заказ</li>
                </ul>

                <div className="left">
                  <h4>Контакты</h4>
                  <p><PhoneOutlined className='icon'/> +7 (926) 223-10-11</p>
                  <p><img src={img} alt="location" /> Москва, ул. Юных Ленинцев, д.99</p>
                  <p><FacebookOutlined className='icon'/> Facebok  <InstagramOutlined className='icon'/> Instagram</p>
                </div>
          </div>
        }
      </div>
    </nav>
    <KorzinkaModel isModalOpen={modal2Open} setIsModalOpen={setModal2Open} />
   </div>
  )
}

export default Navbar
