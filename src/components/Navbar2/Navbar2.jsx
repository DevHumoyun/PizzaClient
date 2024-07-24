import React, { useEffect, useState } from 'react'
import "./Navbar2.scss"
import img from "../../img/Group 1.png"
import img2 from "../../img/Group 2.png"
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/reduxStore/authSlice'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { getCategoryProducts } from '../../server/categoryServer'
import { setMenuStorage } from '../../redux/reduxStore/storageSlice'

const Navbar2 = () => {
    const [categories , setCategories ] = useState([]);
    const {user } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleGetCategories = async () => {
        try {
            const data = await getCategoryProducts()
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    }
    const handleMenu = (id) => {
      localStorage.setItem('menuId' ,id );
      dispatch(setMenuStorage(id))
      navigate(`/menu/`)
    }

    useEffect(() => {
        handleGetCategories()
    } ,[])

    

    

  return (
    <div>
      <div className="nav-main">
     <nav>
      <div className="container">
        <div className="nav-top">
            <div className="nav-left">
              <div className="navbar2">
                <Link to={'/'} className="nav-low-left">
                    <img src={img2} alt="pizza" />
                    <h4>Куда пицца</h4>
                </Link>
              </div>
              <ul className='navbar-categories'>
                <li className='navbar-category-item'>Акции</li>
                {
                    categories&& 
                    categories.map(category => {
                        return(
                            <li onClick={() => handleMenu(category._id)} className='navbar-category-item' key={categories._id}>{category.title}</li>
                        )
                    })
                }
              </ul>
            </div>
            <div className="nav-right">
                <div className="nav-low-right">
                    <button className='shopp-btn'><ShoppingCartOutlined className='shopping'/> 0 ₽</button>
                </div>
            </div>
        </div>
      </div>
    </nav>
   </div>
    </div>
  )
}

export default Navbar2
