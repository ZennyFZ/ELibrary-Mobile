import axios from 'axios'
import { USER_API_URL } from './APIConfig'

const loginAccount = (email, password) => {
    return axios.post(`${USER_API_URL}/login`, {
        email,
        password
    })
}

const registerAccount = (email, password) => {
    return axios.post(`${USER_API_URL}/register`, {
        email,
        password,
    })
}

export { loginAccount, registerAccount }