import * as SecureStore from 'expo-secure-store';

const saveToken = (token) => {
    SecureStore.setItem('jwt', token);
}

const getToken = () => {
    return SecureStore.getItem('jwt');
}

const deleteToken = async() => {
    await SecureStore.deleteItemAsync('jwt');
}

export { saveToken, getToken, deleteToken };