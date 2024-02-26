import axios from "axios";
import { STATISTIC_API_URL } from "./APIConfig";
import { getToken } from '../utils/SecureStore'

const getTotalBooksSold = () => {
    return axios.get(`${STATISTIC_API_URL}/books-sold`, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

const getTotalCustomers = () => {
    return axios.get(`${STATISTIC_API_URL}/total-customer`, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

const getTotalRevenue = (year) => {
    return axios.get(`${STATISTIC_API_URL}/total-revenue/?year=${year}`, {
        headers: {
            "Cookie": `jwt=${getToken()}`,
        }
    });
}

export { getTotalBooksSold, getTotalCustomers, getTotalRevenue }