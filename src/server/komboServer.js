import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverURL})

export const getKombo = async () => {
    let res = await API.get(`/kombo/`)
    return res.data;
}
