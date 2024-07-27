import React, { useState } from 'react'
import "./Navbar.css"
import img from "../../img/Group 1.png"
import img2 from "../../img/Group 2.png"
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { setUser } from '../../redux/reduxStore/authSlice'
import KorzinkaModel from '../KorzinkaModel/KorzinkaModel'

const Navbar = () => {
  const {user } = useSelector(state => state.authSlice);
  const [modal2Open , setModal2Open ] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate('/login')
  }
  
  return (
   <div className="nav-main">
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
              <h4 className='h4'>Проверить адрес</h4>
              <h4 className='h4'>Среднее время доставки*: 00:24:19</h4>
            </div>
            <div className="nav-right">
              <h4>Время работы: c 11:00 до 23:00</h4>
              
              <DropdownButton variant='secondary' id="dropdown-basic-button" title={<div><UserOutlined className='user'/> Войти в аккаунт</div>}>
                {
                  user ? <>
                  <Dropdown.Item className='dropdown-item bonus'  >100 бонусов</Dropdown.Item>
                <Dropdown.Item  className='dropdown-item' >История заказов</Dropdown.Item>
                <Dropdown.Item className='dropdown-item' ><Link className='dropdown-link' to={'/profile/update'}>Настройки</Link></Dropdown.Item>
                <Dropdown.Item onClick={handleLogout} className='logout dropdown-item'>Выход из аккаунта</Dropdown.Item></> :

                <Dropdown.Item><Link className='dropdown-link' to={'/login'}>Войти</Link></Dropdown.Item>

                }
              </DropdownButton>
      
            
              
              {/* {
                !user ?  <Link to={'/login'}><UserOutlined className='user'/>Войти в аккаунт</Link>:
                <Link to={'/profile'}><UserOutlined className='user'/>Профил</Link>
              } */}
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
            <button onClick={() => setModal2Open(true)} ><ShoppingCartOutlined className='shopping'/> 0 ₽</button>
          </div>
        </div>
      </div>
    </nav>
    <KorzinkaModel isModalOpen={modal2Open} setIsModalOpen={setModal2Open} />
   </div>
  )
}

export default Navbar

// import { Link, NavLink, useLocation } from "react-router-dom";
// import './Navbar.css'
// import { useState } from "react";
// export default function Header(){
//     const path = useLocation().pathname
//     const [burger, setBurger] = useState(false)
//     const toggle = () => setBurger(!burger)
//     return(
//         <>
//         <header>
//                 <div className="container">
//                     {path === '/' && <div className="header__top">
//                         <div className="top-box">
//                             <div className="header__location">
//                                 <img
//                                 src="https://pizza-site-off.netlify.app/static/media/location.bcfd89040885d364f942df2c3dda8f15.svg"
//                                 alt="Location"
//                                 />
//                                 <p>Москва</p>
//                             </div>
//                             <p className="none">Проверить адрес</p>
//                             <p className="none">Среднее время доставки*: <strong>00:24:19</strong></p>
//                         </div>
//                         <div className="header__delivery-time">
//                             <p className="media">Среднее время доставки*: <strong>00:24:19</strong></p>
//                             <p className="none">Время работы: с 11:00 до 23:00</p>
//                             <div className="header__location none">
//                                 <img
//                                 src="https://pizza-site-off.netlify.app/static/media/location.bcfd89040885d364f942df2c3dda8f15.svg"
//                                 alt="Location"
//                                 />
//                                 <p>Войти в аккаунт</p>
//                             </div>
//                         </div>
//                     </div>}
//                     <div className="header__main">
//                         <div className="nav__blox">
//                             <div className="hed__box2">
//                                 <Link to='/'> 
//                                     <img src="https://pizza-site-off.netlify.app/static/media/logos.cb06518345f8aac5b966c310bfa2884d.svg" alt="" />
//                                     Куда пицца
//                                 </Link>
//                             </div>
//                             {path !== '/' && <div className="nav__box">
//                                 <NavLink to='/'><a href="">Акции</a></NavLink>
//                                 <NavLink to='/pissa'><a href="">Пицца</a></NavLink>
//                                 <NavLink to='/sushi'><a href="">Суши</a></NavLink>
//                                 <NavLink to='/napitka'><a href="">Напитки</a></NavLink>
//                                 <NavLink to='/zakuska'><a href="">Закуски</a></NavLink>
//                                 <NavLink to='/kombo'><a href="">Комбо</a></NavLink>
//                                 <NavLink to='/desert'><a href="">Десерты</a></NavLink>
//                                 <NavLink to='/souse'><a href="">Соусы</a></NavLink>
//                             </div>}
//                             <div className="hed__box1">
//                                 <button className="hed__btn none"><i className="fa-solid fa-cart-shopping"></i>0<i className="fa-solid fa-ruble-sign"></i></button>
//                                 <button className="media__btn" onClick={toggle}>{burger ? <i class="fa-solid fa-x"></i>: <i className="fa-solid fa-bars"></i>  }</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//         </header>
//         {burger && <section className='hamburger'>
//             <div className="account">
                
//                 <img src="./images/img1.png" alt="" />
//                 <p>Войти в аккаунт</p>
//             </div>
//             <ul>
//                 <li>Акции</li>
//                 <li>О компании</li>
//                 <li>Пользовательское соглашение</li>
//                 <li>Условия гарантии</li>
//                 <li>Ресторан</li>
//                 <li>Контакты</li>
//                 <li>Поддержка</li>

// <li>Отследить заказ</li>
//             </ul>
//             <div className="contact">
//                 <div className="contact-item">
//                     <img src="" alt="" />
//                     <p>+7 (926) 223-10-11</p>
//                 </div>
//                 <div className="contact-item">
//                     <img src="" alt="" />
//                     <p>Москва, ул. Юных Ленинцев, д.99</p>
//                 </div>
//                 <div className="net">
//                     <div className="contact-item">
//                         <img src="" alt="" />
//                         <p>Facebok</p>
//                     </div>
//                     <div className="contact-item">
//                         <img src="" alt="" />
//                         <p>Instagram</p>
//                     </div>
//                 </div>
//                 <div className="time">
//                     <p>Время работы: с 11:00 до 23:00</p>
//                 </div>
//             </div>
//         </section>}
//         </>
//     )
// }