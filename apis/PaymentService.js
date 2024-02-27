import axios from 'axios'
import { PAYMENT_API_URL } from './APIConfig'
import { getToken } from '../utils/SecureStore'

const getStripeSecret = (amount) => {
    return axios.post(`${PAYMENT_API_URL}/create-payment-intent`, {
        amount
    })
}

const getVNPayUrl = async(amount) => {
    const token = await getToken();
    return axios.post(`${PAYMENT_API_URL}/payment`, {
        amount,
        methodType: 'Bank'
    }, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    })
}

export { getStripeSecret, getVNPayUrl }