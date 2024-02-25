import axios from "axios";
import { CATEGORY_API_URL } from "./APIConfig";
import { getToken } from "../utils/SecureStore";

const headerOptions = {
    "Cookie": `jwt=${getToken()}`,
}

const getCategories = () => {
    return axios.get(`${CATEGORY_API_URL}/get-all-categories`, {headers: headerOptions});
}

const addCategory = (name) => {
    return axios.post(`${CATEGORY_API_URL}/add-category`, {
        name
    }, { headers: headerOptions});
}

const updateCategory = (id, name) => {
        return axios.put(`${CATEGORY_API_URL}/update-category/`, {
        id,
        name
    }, { headers: headerOptions});
}

const deleteCategory = (id) => {
    return axios.delete(`${CATEGORY_API_URL}/delete-category/${id}`, { headers: headerOptions});
}

export { getCategories, addCategory, updateCategory, deleteCategory };