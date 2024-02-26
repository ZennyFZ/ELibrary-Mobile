import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { storeData, retrieveData } from '../utils/AsyncStorage';

export const getCartCountFromAsyncStorage = createAsyncThunk(
    'cart/getCartFromAsyncStorage',
    async () => {
        try {
            const cartString = await retrieveData('cart');
            if (cartString) {
                return cartString.length;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching cart from AsyncStorage:', error);
            return [];
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },

    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find(item => item._id == action.payload._id);
            if (itemInCart) {
                Alert.alert('Item already in cart');
            } else {
                state.cart.push({ ...action.payload });
                storeData('cart', state.cart);
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item._id !== action.payload);
            storeData('cart', state.cart);
        },
        clearCart: (state) => {
            state.cart = [];
            storeData('cart', state.cart);
        }
    }
})

export const { addToCart, getCartQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;