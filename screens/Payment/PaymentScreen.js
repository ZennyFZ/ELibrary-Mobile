import { useCallback, useState } from 'react';
import { getMomoUrl, getVNPayUrl, getVietQRUrl, getZaloPayUrl } from '../../apis/PaymentService';
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Loading2 } from '../../components/Loading/Loading';
import * as Linking from 'expo-linking';
import styles from './Style';
import { retrieveData } from '../../utils/AsyncStorage';
import { getBooks } from '../../apis/UserService';

const PaymentScreen = () => {
    const [cart, setCart] = useState([]);
    const [isOwned, setIsOwned] = useState()
    const [userId, setUserId] = useState("");
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    const [isLoading, setIsLoading] = useState(false);
    const redirectUri = Linking.createURL()
    const paymentMethodArray = [
        {
            id: 1,
            name: "VNPay",
            logo: require('../../assets/VNPay.png')
        },
        {
            id: 2,
            name: "Momo",
            logo: require('../../assets/Momo.png')
        },
        {
            id: 3,
            name: "ZaloPay",
            logo: require('../../assets/ZaloPay.png')
        },
        {
            id: 4,
            name: "VietQR",
            logo: require('../../assets/VietQR.jpg')
        }
    ]
    const [selectedPayment, setSelectedPayment] = useState("");
    const navigation = useNavigation();

    const handleVNPPayment = () => {
        getVNPayUrl(totalAmount, redirectUri).then((res) => {
            setIsLoading(false);
            navigation.navigate("Checkout", { link: res.data.vnpUrl, paymentMethod: "VNPay", totalAmount: totalAmount, userId: userId, cart: cart })
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleMomoPayment = () => {
        getMomoUrl(totalAmount, redirectUri).then((res) => {
            setIsLoading(false);
            navigation.navigate("Checkout", { link: res.data.payUrl, paymentMethod: "Momo", totalAmount: totalAmount, userId: userId, cart: cart })
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleZaloPayPayment = () => {
        getZaloPayUrl(totalAmount, redirectUri).then((res) => {
            setIsLoading(false);
            navigation.navigate("Checkout", { link: res.data.data.orderurl, paymentMethod: "ZaloPay", totalAmount: totalAmount, userId: userId, cart: cart })
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleVietQRPayment = () => {
        getVietQRUrl(totalAmount).then((res) => {
            setIsLoading(false);
            navigation.navigate("Checkout", { link: res.data.data, paymentMethod: "VietQR", transactionId: res.data.transactionId, totalAmount: totalAmount, userId: userId, cart: cart })
        }).catch((error) => {
            console.log(error)
        })
    }

    const getColor = (id) => {
        if (id === selectedPayment) {
            return "#2196f3";
        }
        return "white";
    }

    const handlePayment = (id) => {
        if (id === "") {
            Alert.alert("Please choose payment method");
            return;
        }
        setIsLoading(true);
        switch (id) {
            case 1:
                handleVNPPayment();
                break;
            case 2:
                handleMomoPayment();
                break;
            case 3:
                handleZaloPayPayment();
                break;
            case 4:
                handleVietQRPayment();
                break;
        }
    }

    const initializePaymentScreen = async () => {
        try {
            setIsLoading(true)
            // Retrieve user data
            const userId = await retrieveData('userId');
            setUserId(userId);

            // Retrieve cart items
            const cartItems = await retrieveData('cart');
            setCart(cartItems);

            // Check owned books
            if (userId) {
                const books = await getBooks(userId);
                setIsOwned(books.data.bookList.some((book) => cart.some((item) => book._id === item._id)));
                setIsLoading(false)
            }
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            initializePaymentScreen()
        }, [])
    )

    useFocusEffect(
        useCallback(() => {
            initializePaymentScreen()
        }, [isOwned])
    )

    if (isLoading) {
        return (
            <Loading2 />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.paymentHeader}>
                <TouchableOpacity onPress={() => { navigation.navigate("Cart"), setIsOwned("")}}>
                    <Ionicons name="arrow-left" size={30} color="black" style={styles.goBack} />
                </TouchableOpacity>
                <Text style={styles.choosePaymentText}>Payment</Text>
            </View>
           
            <FlatList
                data={paymentMethodArray}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.paymentMethodContainer} >
                            <TouchableOpacity onPress={() => setSelectedPayment(item.id)} style={[styles.paymentOption, { borderColor: getColor(item.id) }]}>
                                <Image source={item.logo} style={styles.paymentIcon} />
                                <Text style={styles.paymentOptionText}>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
            <View style={styles.payContainer}>
                <Text style={styles.payContainerText}>Total Money: {totalAmount}đ</Text>
                {isOwned ? (
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text style={[styles.payContainerButton, { backgroundColor: "gray" }]}>Already haved</Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={() => handlePayment(selectedPayment)}>
                        <Text style={styles.payContainerButton}>Checkout</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default PaymentScreen;
