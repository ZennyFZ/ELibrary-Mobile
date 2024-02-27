import axios from "axios";
import { CATEGORY_API_URL } from "./APIConfig";
import { getToken } from "../utils/SecureStore";

const getCategories = async () => {
    const token = await getToken();
    return axios.get(`${CATEGORY_API_URL}/get-all-categories`, { headers: { Cookie: `jwt=${token}` } });
}

const addCategory = async (name) => {
    const token = await getToken();
    return axios.post(`${CATEGORY_API_URL}/add-category`, {
        name
    }, { headers: { Cookie: `jwt=${token}` } });
}

const updateCategory = async (id, name) => {
    const token = await getToken();
    return axios.put(`${CATEGORY_API_URL}/update-category/`, {
        id,
        name
    }, { headers: { Cookie: `jwt=${token}` } });
}

const deleteCategory = async (id) => {
    const token = await getToken();
    return axios.delete(`${CATEGORY_API_URL}/delete-category/${id}`, { headers: { Cookie: `jwt=${token}` } });
}

export { getCategories, addCategory, updateCategory, deleteCategory };