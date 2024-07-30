import React, { useEffect, useState } from 'react'
import Navbar3 from '../../components/Navbar3/Navbar3'
import Footer from '../../components/Footer/Footer'
import Image from '../../img/Group 767.png'
import './Process.scss'
import { getMyBookings } from '../../server/bookingServer'

const Process = () => {
    const [myBookings ,setMyBookings ] = useState([])
    const handleGetMyBookings = async () => {
        try {
            const id = localStorage.getItem('myId');
            const data = await getMyBookings(id);
            console.log(data);
            setMyBookings(data.bookings)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleGetMyBookings()
    } ,[])
  return (
    <div>
      <Navbar3 />
        <div className="container">
            <div className="process">
                <div className="process-box">
                    <img src={Image} alt="image" />
                    <h3>Заказ №{myBookings.length > 0 && myBookings[myBookings.length - 1].orderId} принят</h3>
                    <p>Примерное время доставки 45 минут. Статус отследить можно нажав на кнопку ниже</p>
                    <button>Отследить заказ</button>
                </div>
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default Process
