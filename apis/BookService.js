import axios from "axios";
import { BOOK_API_URL } from "./APIConfig";
import { getToken } from "../utils/SecureStore";

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
const addBook = async(title, author, publisher, publishDate, pages, language, price, image, description, category, file) => {
    const token = await getToken();
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
    }, { headers: { Cookie: `jwt=${token}` } });
}

const uploadBookImage = async(formData) => {
    const token = await getToken();
    return axios.post(`${BOOK_API_URL}/upload-book-image`, formData, { headers: { 'Cookie': `jwt=${token}` }});
}

const uploadBookFile = async(formData) => {
    const token = await getToken();
    return axios.post(`${BOOK_API_URL}/upload-book-file`, formData, { headers: { 'Cookie': `jwt=${token}` }});
}

const updateBook = async(id, title, author, publisher, publishDate, pages, language, price, image, description, category, file) => {
    const token = await getToken();
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
    }, { headers: { Cookie: `jwt=${token}` } });
}

const deleteBook = async(id) => {
    const token = await getToken();
    return axios.delete(`${BOOK_API_URL}/delete-book/${id}`, { headers: { Cookie: `jwt=${token}` } });
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
const suggestBookForUser = async(userId) => {
    const token = await getToken();
    return axios.post(`${BOOK_API_URL}/suggest-book`, { id: userId },  { headers: { Cookie: `jwt=${token}` } });
}

export { getBooks, getBook, getCategories, addBook, uploadBookImage, uploadBookFile, updateBook, deleteBook, filterBookByCategory, searchBook, suggestBookForUser }
