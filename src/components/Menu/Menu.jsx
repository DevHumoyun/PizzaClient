import React, { useEffect, useState } from 'react'
import Navbar2 from '../Navbar2/Navbar2'
import { getOneCategory } from '../../server/categoryServer'
import ProductItem from '../ProductItem/ProductItem'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getKombo } from '../../server/komboServer'
import WatchProduct from '../watchProduct/WatchProduct1'
import './Menu.scss'

const Menu = () => {

  const [ category, setCategory ] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo , setModalInfo ] = useState({})
  const [categoryTitle , setCategoryTitle ] = useState('');
  let {menuId} = useSelector(state => state.storageSlice)
  


  const handleGetCategory = async () => {
    try {
      if(!menuId){
        menuId = localStorage.getItem('menuId')
      }

      if(menuId == 'kombo'){
            const data = await getKombo();
            setCategory({products:data.kombos , title: "Комбо"});
            
      }
      else{
        const data =await  getOneCategory(menuId);
        setCategory(data.category[0])
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenModal= (product , title) => {
    setIsModalOpen(true)
    setModalInfo(product)
    setCategoryTitle(title)
}

  useEffect(() => {
    handleGetCategory()
  } ,[menuId])
  return (
    <>
    <Navbar2 />
    <div className='menu container'>
      <h3>{category?.title}</h3>
      <div className='menu-box'>
        {
          category &&
          category.products.map(item => {
            return(
              <ProductItem handleOpenModal={() => handleOpenModal(item , category.title)}  key={item._id} product={item} />
            )
          })
        }
      </div>
    </div>

    <WatchProduct isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} categoryTitle={categoryTitle} modalInfo={modalInfo} />
    </>
  )
}

export default Menu
