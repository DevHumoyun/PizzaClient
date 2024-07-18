import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getAllCategories } from '../../server/categoryServer'
import "./Home.scss"

const Home = () => {
    const [categories , setCategories ] = useState([])

    const handleCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data.categories)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleCategories();
        console.log(categories);
    }, [])
  return (
    <div>
        <Navbar />
        <div className="categories">
        {
            categories &&
            categories.map(item => {
                return (
                    <div className='category-item'>
                        <h4>{item.title}</h4>
                    </div>
                )
            })
        }
        </div>
        <Footer/>

    </div>
  )
}

export default Home
