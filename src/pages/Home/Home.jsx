import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getAllCategories, getCategoryProducts } from '../../server/categoryServer'
import "./Home.scss"
import { getAksiya } from '../../server/aksiyaServer'
import FireImage from "../../img/Fire.png"
import CheckMap from '../../components/CheckMap/CheckMap'
import { updateUser } from '../../server/usersServer'
import { toast } from 'react-toastify'
import ProductItem from '../../components/ProductItem/ProductItem'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Signup2 from '../Signup2/Signup2'
import { setMenuStorage } from '../../redux/reduxStore/storageSlice'
import { useDispatch } from 'react-redux'
import WatchProduct from '../../components/watchProduct/WatchProduct1'

const Home = () => {
    const [categories , setCategories ] = useState([]);
    const [aksiya , setAksiya ] = useState([]);
    const [openMap , setOpenMap ]  = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo , setModalInfo ] = useState({})
    const [userAddress , setUserAddress ] = useState();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleCategories = async () => {
        try {
            const data = await getCategoryProducts();
            setCategories(data.categories)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetAksiya = async () => {
        try {
            const data = await getAksiya();
            setAksiya(data.aksiya)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeAddress = async () => {
        try {
            const id = localStorage.getItem('myId')
            const formData = new FormData();
            console.log(userAddress);
            formData.append('address' , JSON.stringify(userAddress  ))
            const data = await updateUser(formData, id);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleMenu = (id) => {
        localStorage.setItem('menuId' , id)
        dispatch(setMenuStorage(id ))
        navigate('/menu')
        
    }

    const handleOpenModal= (product) => {
        setIsModalOpen(true)
        setModalInfo(product)
    }

    useEffect(() => {
        handleCategories();
        handleGetAksiya()
        
    }, [])
  return (
        <>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signup2' element={<Signup2 />} />
                {/* <Route path='/watchProduct/:id' element={<WatchProduct />} /> */}
            </Routes>
            <Navbar />

            <div className='home'>
                <div className="categories">
                            <div className='category-item'>
                                <img src={FireImage} alt="" />
                                <h4>Акции</h4>
                            </div>
                {
                    categories &&
                    categories.map(item => {
                        return (
                            <div onClick={() => handleMenu(item._id)} key={item._id} className='category-item'>
                                <img src={item.image.url} alt="image" />
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })
                }
                </div>

                <div className="aksiya">
                    {
                        aksiya &&
                        aksiya.map(item => {
                            return (
                                <div className='aksiya-item' key={item._id} style={
                                    {backgroundImage: `url(${item.image.url})`,
                                    
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center', 
                                    }
                                    }>
                                    <p>{item.text}</p>
                                
                                </div>
                            )
                        })
                    }
                </div>

                <div className='check-address'>
                    <label htmlFor="check-address-input">
                        <h4>Проверить адрес доставки </h4>
                        <input type="text" placeholder='Адрес'/>
                        {
                            openMap ? <>
                                <button onClick={handleChangeAddress} >Изменить</button>
                                <button onClick={() => setOpenMap(false)}>Отменить</button>
                            </>:
                            <button onClick={() => setOpenMap(true)} className='btn'>Проверить</button>
                        }
                        
                    </label>
                        {
                            openMap && <CheckMap setUserAddress={setUserAddress} />
                        }
                </div>

                {
                    categories.map(category => {
                        return(
                            <div key={category._id}>
                                <h3>{category.title}</h3>
                                {
                                    category.products?.map(item => {
                                        return(
                                            <ProductItem handleOpenModal={handleOpenModal} key={item._id} product={item} />
                                            
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <WatchProduct isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalInfo={modalInfo} />
                {/* <Footer/> */}

                </div>
        </>

  )
}

export default Home
