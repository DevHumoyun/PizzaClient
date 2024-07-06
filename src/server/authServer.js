import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const register = async (formData) => {
    let res = await API.post('/users/signup', formData)
    return res.data;
}

export const login = async (formData) => {
    let res = await API.post('/users/login' , formData);
    return res.data
}