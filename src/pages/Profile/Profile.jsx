import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Profile.scss'
import { Link, Route, Routes } from 'react-router-dom'
import ProfileUpdate from '../../components/ProfileUpdate/ProfileUpdate'

const Profile = () => {
  const [active1 , setActive1 ] = useState('')
  const [active2 , setActive2 ] = useState('')
  return (
    <div className='profile'>
        <Navbar />
        
        <div className='account'>
            <h2 className='my-acount-title'>Мой аккаунт</h2>
            <div className='acc-btns-box'>
                <button onClick={() => {
                  setActive2('')
                  setActive1('active')
                }} className={`btn acc-btns history-btn ${active1}`}>История заказов</button>
                <Link to={'/profile/update'} onClick={() => {
                  setActive1('')
                  setActive2('active')
                }} className={`btn acc-btns setting-btn ${active2}`}>Настройки</Link>
            </div>
        </div>
            <div className="profile-display">
              <Routes>
                <Route path='update' element={<ProfileUpdate/>} />
              </Routes>
            </div>
    </div>
  )
}

export default Profile
