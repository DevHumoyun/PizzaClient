import React, { useEffect, useState } from 'react'
import "./Navbar3.scss"
import img from "../../img/Group 1.png"
import img2 from "../../img/Group 2.png"
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { setUser } from '../../redux/reduxStore/authSlice'
import KorzinkaModel from '../KorzinkaModel/KorzinkaModel'
import { getCategoryProducts } from '../../server/categoryServer'
import { setMenuStorage } from '../../redux/reduxStore/storageSlice'

const Navbar3 = () => {
  const {user } = useSelector(state => state.authSlice);
  const {korzinkaPrice } = useSelector(state => state.korzinkaSlice)
  const [modal2Open , setModal2Open ] = useState(false);
  const [categories , setCategories ] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate('/login')
  }

  const handleMenu = (id) => {
    localStorage.setItem('menuId' ,id );
    dispatch(setMenuStorage(id))
    navigate(`/menu/`)
  }

  useEffect(() => {
      handleGetCategories()
  } ,[])


  const handleGetCategories = async () => {
    try {
      const data = await getCategoryProducts();
      setCategories(data.categories)

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleGetCategories()
  } ,[])
  return (
   <div className="nav-main3">
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

            </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="nav-low naw-low3">
          <Link to={'/'} className="nav-low-left">
            <img src={img2} alt="pizza" />
            <h4>Куда пицца</h4>
          </Link>
          <ul className='navbar3-categories'>
                <li className='navbar-category-item'>Акции</li>
                <li  className='navbar-category-item' >Комбо</li>
                {
                  categories.map(item => {
                    return(
                      <li onClick={() => handleMenu(item._id)} key={item._id}>
                        {item.title}
                      </li>
                    )
                  })
                }
                
            </ul>
          <div className="nav-low-right">
            <button onClick={() => setModal2Open(true)} ><ShoppingCartOutlined className='shopping'/> {korzinkaPrice} ₽</button>
          </div>
        </div>
      </div>
    </nav>
    <KorzinkaModel isModalOpen={modal2Open} setIsModalOpen={setModal2Open} />
   </div>
  )
}

export default Navbar3
