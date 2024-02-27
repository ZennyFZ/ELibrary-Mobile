import axios from 'axios';
import { ORDER_API_URL } from './APIConfig';
import { getToken } from '../utils/SecureStore'

const createOrder = async(userId, totalPrice, paymentMethod, bookList) => {
    const token = await getToken();
    return axios.post(`${ORDER_API_URL}/create-order`, { userId, totalPrice, paymentMethod, bookList }, { headers: { Cookie: `jwt=${token}` } });
}

const getAllOrders = async() => {
    const token = await getToken();
    return axios.get(`${ORDER_API_URL}/get-all-orders`, { headers: { Cookie: `jwt=${token}` } });
}

const getOrderByUserId = async(userId) => {
    const token = await getToken();
    return axios.get(`${ORDER_API_URL}/get-order/${userId}`, { headers: { Cookie: `jwt=${token}` } });
}

const getOrderDetail = async(orderId) => {
    const token = await getToken();
    return axios.get(`${ORDER_API_URL}/get-order-detail/${orderId}`, { headers: { Cookie: `jwt=${token}` } });
}

export { createOrder, getAllOrders, getOrderByUserId, getOrderDetail }