import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const getAksiya = async () => {
    let res = await API.get('/aksiya')
    return res.data;
}

export const login = async (formData) => {
    let res = await API.post('/users/login' , formData);
    return res.data
}