import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import {Dropdown , DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setKorzinka } from '../../redux/reduxStore/korzinkaSlice'
import { setUser } from '../../redux/reduxStore/authSlice'

const Dropdown1 = () => {
    const {user } = useSelector(state => state.authSlice)
    const dispatch = useDispatch();
  const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        dispatch(setKorzinka([]))
        dispatch(setUser(null));
        navigate('/login')
      }
  return (
    <div>
      <DropdownButton className='dropdown' variant='secondary' id="dropdown-basic-button" title={<div><UserOutlined className='user'/> Войти в аккаунт</div>}>
                {
                  user ? <>
                  <Dropdown.Item className='dropdown-item bonus'  >100 бонусов</Dropdown.Item>
                <Dropdown.Item  className='dropdown-item' ><Link className='dropdown-link' to={'/profile/history'}>История заказов</Link></Dropdown.Item>

                <Dropdown.Item className='dropdown-item' ><Link className='dropdown-link' to={'/profile/update'}>Настройки</Link></Dropdown.Item>

                <Dropdown.Item onClick={handleLogout} className='logout dropdown-item'>Выход из аккаунта</Dropdown.Item></> :

                <Dropdown.Item><Link className='dropdown-link' to={'/login'}>Войти</Link></Dropdown.Item>

                }
              </DropdownButton>
    </div>
  )
}

export default Dropdown1
