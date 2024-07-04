import React from 'react'
import "./Navbar.css"
import img from "../../img/Group 1.png"
import img2 from "../../img/Group 2.png"
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

const Navbar = () => {
  return (
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
              <h4>Проверить адрес</h4>
              <h4>Среднее время доставки*: 00:24:19</h4>
            </div>
            <div className="nav-right">
              <h4>Время работы: c 11:00 до 23:00</h4>
              <UserOutlined className='user'/>Войти в аккаунт
            </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="nav-low">
          <div className="nav-low-left">
            <img src={img2} alt="pizza" />
            <h4>Куда пицца</h4>
          </div>
          <div className="nav-low-right">
            <button><ShoppingCartOutlined className='shopping'/> 0 ₽</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar