import axios from "axios";
import { STATISTIC_API_URL } from "./APIConfig";
import { getToken } from '../utils/SecureStore'

const getTotalBooksSold = async() => {
    const token = await getToken();
    return axios.get(`${STATISTIC_API_URL}/books-sold`, { headers: { Cookie: `jwt=${token}` } });
}

const getTotalCustomers = async() => {
    const token = await getToken();
    return axios.get(`${STATISTIC_API_URL}/total-customer`, { headers: { Cookie: `jwt=${token}` } });
}

const getTotalRevenue = async(year) => {
    const token = await getToken();
    return axios.get(`${STATISTIC_API_URL}/total-revenue/?year=${year}`, { headers: { Cookie: `jwt=${token}` } });
}

export { getTotalBooksSold, getTotalCustomers, getTotalRevenue }