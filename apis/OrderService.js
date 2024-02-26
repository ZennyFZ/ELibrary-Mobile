import axios from 'axios';
import { ORDER_API_URL } from './APIConfig';
import { getToken } from '../utils/SecureStore'

const createOrder = (userId, totalPrice, paymentMethod, bookList) => {
    return axios.post(`${ORDER_API_URL}/create-order`, { userId, totalPrice, paymentMethod, bookList }, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

const getAllOrders = () => {
    return axios.get(`${ORDER_API_URL}/get-all-orders`, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

const getOrderByUserId = (userId) => {
    console.log(userId);
    return axios.get(`${ORDER_API_URL}/get-order/${userId}`, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

const getOrderDetail = (orderId) => {
    return axios.get(`${ORDER_API_URL}/get-order-detail/${orderId}`, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

export { createOrder, getAllOrders, getOrderByUserId, getOrderDetail }