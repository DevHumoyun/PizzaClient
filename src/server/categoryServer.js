import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const getAllCategories = async () => {
    
    let res = await API.get(`/category`)
    return res.data;
}

export const  getOneCategory = async (id) => {
    let res = await API.get(`/category/${id}`)
    return res.data
}
export const getCategoryProducts = async () => {
    let res = await API.get('/category/products')
    return res.data
}