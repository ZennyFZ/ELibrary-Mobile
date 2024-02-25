import axios from "axios";
import { BOOK_API_URL } from "./APIConfig";
import { getToken } from "../utils/SecureStore";

const headerOptions = {
    "Cookie": `jwt=${getToken()}`,
}

const getBooks = () => {
    return axios.get(`${BOOK_API_URL}/get-all-books`);
}

const getBook = (id) => {
    return axios.get(`${BOOK_API_URL}/${id}`);
}

const getCategories = () => {
    return axios.get(`${BOOK_API_URL}/get-all-categories`);
}

//CRUD (admin only)
const addBook = (title, author, publisher, publishDate, pages, language, price, image, description, category, file) => {
    return axios.post(`${BOOK_API_URL}/add-book`, {
        title,
        author,
        publisher,
        publishDate,
        pages,
        language,
        price,
        image,
        description,
        isDeleted: false,
        category,
        file
    }, { withCredentials: true });
}

const uploadBookImage = (formData) => {
    return axios.post(`${BOOK_API_URL}/upload-book-image`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
}

const uploadBookFile = (formData) => {
    return axios.post(`${BOOK_API_URL}/upload-book-file`, formData, { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true });
}

const updateBook = (id, title, author, publisher, publishDate, pages, language, price, image, description, category, file) => {
    return axios.put(`${BOOK_API_URL}/update-book/${id}`, {
        title,
        author,
        publisher,
        publishDate,
        pages,
        language,
        price,
        image,
        description,
        category,
        file
    }, { withCredentials: true });
}

const deleteBook = (id) => {
    return axios.delete(`${BOOK_API_URL}/delete-book/${id}`, { withCredentials: true });
}

//filter
const filterBookByCategory = (category) => {
    return axios.get(`${BOOK_API_URL}/filter-book?category=${category}`);
}

//search
const searchBook = (keyword) => {
    return axios.get(`${BOOK_API_URL}/search?name=${keyword}`);
}

//suggest
const suggestBookForUser = (userId) => {
    return axios.post(`${BOOK_API_URL}/suggest-book`, { id: userId }, {headers: headerOptions});
}

export { getBooks, getBook, getCategories, addBook, uploadBookImage, uploadBookFile, updateBook, deleteBook, filterBookByCategory, searchBook, suggestBookForUser }
