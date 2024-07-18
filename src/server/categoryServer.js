import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const getAllCategories = async () => {
    
    let res = await API.get(`/category`)
    return res.data;
}

