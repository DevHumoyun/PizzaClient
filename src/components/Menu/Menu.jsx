import React, { useEffect, useState } from 'react'
import Navbar2 from '../Navbar2/Navbar2'
import { getOneCategory } from '../../server/categoryServer'
import ProductItem from '../ProductItem/ProductItem'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu = () => {

  const [ category, setCategory ] = useState();
  let {menuId} = useSelector(state => state.storageSlice)



  const handleGetCategory = async () => {
    try {
      if(!menuId){
        menuId = localStorage.getItem('menuId')
      }
      const data =await  getOneCategory(menuId);
      setCategory(data.category[0])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetCategory()
  } ,[menuId])
  return (
    <>
    <Navbar2 />
    <div>
      <h3>{category?.title}</h3>
      <div>
        {
          category &&
          category.products.map(item => {
            return(
              <ProductItem key={item._id} product={item} />
            )
          })
        }
      </div>
    </div>
    </>
  )
}

export default Menu
