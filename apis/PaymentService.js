import axios from 'axios'
import { PAYMENT_API_URL } from './APIConfig'

const getStripeSecret = (amount) => {
    return axios.post(`${PAYMENT_API_URL}/create-payment-intent`, {
        amount
    })
}

export { getStripeSecret}