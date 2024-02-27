import axios from 'axios'
import { SUMMARIZATION_API_URL } from './APIConfig'
import { getToken } from '../utils/SecureStore'

const summarize = async(text) => {
    const token = await getToken();
    return axios.post(`${SUMMARIZATION_API_URL}`, {
        text
    }, { headers: { Cookie: `jwt=${token}` } })
}

export { summarize };