import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const postBooking = async (formdata) => {
    const token = localStorage.getItem('token');
    let res = await API.post(`/booking` , formdata , {headers: {token}});
    return res.data;
}

export const getMyBookings = async (id) => {
    const token = localStorage.getItem('token');
    let res = await API.get(`/booking/my-bookings/${id}`, {headers: {token}});
    return res.data; 
}