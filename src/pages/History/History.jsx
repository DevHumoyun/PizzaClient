import React, { useEffect, useState } from 'react'
import "./History.scss"
import { getMyBookings } from '../../server/bookingServer'
import moment from 'moment'
import { toast } from 'react-toastify'
import { getOneProduct } from '../../server/productsServer'
import HistoryItem from '../../components/HistoryItem/HistoryItem'

const History = () => {

    const [myBookings ,setMyBookings ] = useState([])
    const handleGetMyBookings = async () => {
        try {
            const id = localStorage.getItem('myId');
            const data = await getMyBookings(id);
            setMyBookings(data.bookings)
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(() => {
        
        handleGetMyBookings()
    } ,[])



  return (
    <>
    <div className="container">
        <div className="history">
                {
                    myBookings &&
                    myBookings.map(item => {
                        return(
                            <HistoryItem key={item._id} item={item} />
                        )
                    })
                }
        </div>  
    </div> 
    </>
  )
}

export default History
