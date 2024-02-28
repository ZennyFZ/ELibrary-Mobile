import axios from 'axios'
import { USER_API_URL } from './APIConfig'
import { getToken } from '../utils/SecureStore'

const mobileUserAgent = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36"

const loginAccount = (email, password) => {
    return axios.post(`${USER_API_URL}/login`, {
        email,
        password
    }, {
        headers: {
            "User-Agent": mobileUserAgent
        }
    })
}

const getCurrentUser = async () => {
    const token = await getToken();
    return axios.get(`${USER_API_URL}/get-current-user`, { headers: { Cookie: `jwt=${token}` } })
}

const logout = () => {
    return axios.get(`${USER_API_URL}/logout`)
}

const registerAccount = (email, password) => {
    return axios.post(`${USER_API_URL}/register`, {
        email,
        password,
    })
}

const getBooks = async (userId) => {
    const token = await getToken();
    return axios.get(`${USER_API_URL}/get-books/${userId}`, { headers: { Cookie: `jwt=${token}` } });
}

const changePassword = async (oldPassword, newPassword) => {
    const token = await getToken();
    return axios.put(`${USER_API_URL}/change-password`, {
        oldPassword,
        newPassword
    }, { headers: { Cookie: `jwt=${token}` } })
}

export { loginAccount, getCurrentUser, registerAccount, changePassword, logout, getBooks }