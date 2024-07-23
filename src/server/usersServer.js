import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const updateUser = async (formData , id) => {
    const token = localStorage.getItem("token")
    let res = await API.put(`/users/${id}`, formData, {headers: {token}})
    return res.data;
}

export const getOneUser = async (id) => {
    let res = await API.get(`/users/${id}`)
    return res.data;
}