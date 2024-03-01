import { Alert, Button, FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./Style";
import { removeFromCart, clearCart } from "../../redux/CartReducer";
import { useDispatch } from "react-redux";
import { retrieveData } from "../../utils/AsyncStorage";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const onRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    }

    const onClearCart = () => {
        dispatch(clearCart());
    }

    const onPay = () => {
        let totalAmount = calculateTotal(cartItems)
        navigation.navigate('Payment', { totalAmount, cartItems });
    }

    const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.price, 0);
    }

    const getCartItems = async () => {
        const cartItems = await retrieveData('cart');
        setCartItems(cartItems);
        return cartItems;
    }

    // useEffect(() => {
    //     getCartItems();
    // }, [cartItems]);
    useFocusEffect(
        React.useCallback(() => {
            getCartItems()
        },[cartItems])
    );

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem} key={item._id}>
            <View
                style={{
                    width: '30%',
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}đ</Text>
            </View>
            {/* <Button title="Remove" onPress={() => onRemoveItem(item._id)} style={styles.removeButton} /> */}
            <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => onRemoveItem(item._id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: '#777777',
                  backgroundColor: '#F0F0F3',
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cartItems?.length > 0 ? (
                <View style={styles.container}>
                    <View
                        style={styles.cart_header}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                            Cart List
                        </Text>
                        <TouchableOpacity style={styles.card_text_button} onPress={() => onClearCart()}>
                            <Text style={styles.text_button}>Delete All</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item._id}
                        style={styles.listContainer}
                    />
                    <View
                        style={{
                            paddingHorizontal: 16,
                            marginTop: 40,
                            marginBottom: 80,
                        }}>
                        <Text
                            style={{
                                fontSize: 30,
                                color: "black",
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 20,
                            }}>
                            Order Info
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 8,
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '400',
                                    maxWidth: '80%',
                                    color: "black",
                                    opacity: 0.5,
                                }}>
                                Total
                            </Text>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: '400',
                                    color: "black",
                                    opacity: 0.8,
                                }}>
                                {calculateTotal(cartItems)}đ
                            </Text>
                        </View>
                    </View>
                    {/* <View style={styles.cartFooter}>
                        <Text style={styles.cartTotal}>Total: {calculateTotal(cartItems)}đ</Text>
                        <Button title="Pay Now" onPress={() => onPay()} style={styles.payButton} />
                    </View> */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            height: '8%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10
                        }}>
                        <TouchableOpacity
                            onPress={() => onPay()}
                            style={styles.card_addbtn}>
                            <Text
                                style={styles.text_addbtn}>
                                Pay Now
                            </Text>
                        </TouchableOpacity>
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