import { Alert, Button, FlatList, Image, Text, View } from "react-native";
import styles from "./Style";
import { removeFromCart, clearCart } from "../../redux/CartReducer";
import { useDispatch } from "react-redux";
import { retrieveData } from "../../utils/AsyncStorage";
import { useEffect, useState } from "react";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const dispatch = useDispatch();

    const onRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    }

    const onClearCart = () => {
        dispatch(clearCart());
    }

    const onPay = () => {
        Alert.alert('Payment', 'Payment feature is not available yet');
    }

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price, 0);
    }

    const getCartItems = async () => {
        const cartItems = await retrieveData('cart');
        setCartItems(cartItems);
        return cartItems;
    }

    useEffect(() => {
        getCartItems();
    }, [cartItems]);

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem} key={item._id}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}đ</Text>
            </View>
            <Button title="Remove" onPress={() => onRemoveItem(item._id)} style={styles.removeButton} />
        </View>
    );

    return (
        <View style={styles.container}>
            {cartItems?.length > 0 ? (
                <View style={styles.container}>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item._id}
                        style={styles.listContainer}
                    />
                    <View style={styles.cartFooter}>
                        <Text style={styles.cartTotal}>Total: {calculateTotal(cartItems)}đ</Text>
                        <Button title="Clear Cart" onPress={() => onClearCart()} style={styles.clearButton} />
                        <Button title="Pay Now" onPress={() => onPay()} style={styles.payButton} />
                    </View>
                </View>
            ) : (
                <View style={styles.emptyCart}>
                    <Text style={styles.emptyCartText}>Cart is empty</Text>
                </View>
            )}
        </View>
    );
}

export default Cart;