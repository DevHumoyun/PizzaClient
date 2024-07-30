import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Profile.scss'
import { Link, Route, Routes } from 'react-router-dom'
import ProfileUpdate from '../../components/ProfileUpdate/ProfileUpdate'
import Navbar3 from '../../components/Navbar3/Navbar3'
import History from '../History/History'

const Profile = () => {
  const [active1 , setActive1 ] = useState('')
  const [active2 , setActive2 ] = useState('')
  return (
        <>
          <Navbar3 />
          <div className='profile'>
              
              <div className='account'>
                  <h2 className='my-acount-title'>Мой аккаунт</h2>
                  <div className='acc-btns-box'>
                      <Link to={'/profile/history'} onClick={() => {
                        setActive2('')
                        setActive1('active')
                      }} className={`btn acc-btns history-btn ${active1}`}>История заказов</Link>
                      <Link to={'/profile/update'} onClick={() => {
                        setActive1('')
                        setActive2('active')
                      }} className={`btn acc-btns setting-btn ${active2}`}>Настройки</Link>
                  </div>
              </div>
                  <div className="profile-display">
                    <Routes>
                      <Route path='/update' element={<ProfileUpdate/>} />
                      <Route path='/history' element={<History/>} />
                    </Routes>
                  </div>
          </div>
        </>
  )
}

export default Profile
