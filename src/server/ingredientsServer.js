import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const getProductIngredients = async (id) => {
    let res = await API.get(`/ingredients/products/${id}`)
    return res.data;
}

export const getExtraIngredient = async (id) => {
    let res = await API.get(`/ingredients/extra/${id}`)
    return res.data;
}