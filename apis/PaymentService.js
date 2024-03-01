import axios from 'axios'
import { PAYMENT_API_URL } from './APIConfig'
import { getToken } from '../utils/SecureStore'

const getStripeSecret = (amount) => {
    return axios.post(`${PAYMENT_API_URL}/create-payment-intent`, {
        amount
    })
}

const getVNPayUrl = async (amount) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/payment`, {
        amount,
        methodType: 'Bank'
    }, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const getMomoUrl = async (amount) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/momo`, {
        amount
    }, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const getZaloPayUrl = async (amount) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/zalopay`, {
        amount
    }, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const getVietQRUrl = async (amount) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/vietqr`, {
        amount
    }, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const checkPaidVietQR = async () => {
    const token = await getToken();
    return axios.get(`${PAYMENT_API_URL}/check-paid-vietqr`, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

export { getStripeSecret, getVNPayUrl, getMomoUrl, getZaloPayUrl, getVietQRUrl, checkPaidVietQR }