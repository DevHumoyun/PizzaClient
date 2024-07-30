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
import KorzinkaModel from '../KorzinkaModel/KorzinkaModel'

const Navbar2 = () => {
    const [categories , setCategories ] = useState([]);
    const [modal2Open , setModal2Open ] = useState(false)
    const {user } = useSelector(state => state.authSlice);
    const {korzinkaPrice } = useSelector(state => state.korzinkaSlice);
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
      <div className="nav-main nav-main2">
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
                <li onClick={() => handleMenu('kombo')} className='navbar-category-item' >Комбо</li>
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
                    <button onClick={() => setModal2Open(true)} className='shopp-btn'><ShoppingCartOutlined className='shopping'/> {korzinkaPrice} ₽</button>
                </div>
            </div>
        </div>
      </div>
    </nav>
   </div>
   <KorzinkaModel isModalOpen={modal2Open} setIsModalOpen={setModal2Open} />
    </div>
  )
}

export default Navbar2
