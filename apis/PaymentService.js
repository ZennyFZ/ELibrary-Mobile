import axios from 'axios'
import { PAYMENT_API_URL } from './APIConfig'
import { getToken } from '../utils/SecureStore'

const getStripeSecret = (amount) => {
    return axios.post(`${PAYMENT_API_URL}/create-payment-intent`, {
        amount
    })
}

const getVNPayUrl = async (amount, mobileUri) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/payment`, {
        amount,
        methodType: 'Bank',
        mobileUri
    }, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const getMomoUrl = async (amount, apiType) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/momo`, {
        amount,
        apiType
    }, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const getZaloPayUrl = async (amount, apiType) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/zalopay`, {
        amount,
        apiType
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

const checkPaidVNPay = async (queryParams) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/check-paid-vnpay/?${queryParams}`, null, {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const checkPaidMomo = async (orderId) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/check-paid-momo/`, {orderId} , {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

const checkPaidZaloPay = async (orderId) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/check-paid-zalopay/`, {apptransid: orderId} , {
        headers: {
            "Cookie": `jwt=${token}`,
        }
    })
}

export { getStripeSecret, getVNPayUrl, getMomoUrl, getZaloPayUrl, getVietQRUrl, checkPaidVietQR, checkPaidVNPay, checkPaidMomo, checkPaidZaloPay }