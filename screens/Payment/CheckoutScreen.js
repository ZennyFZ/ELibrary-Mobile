import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./Style";
import { View, Text, TouchableOpacity, Image, Alert, Button } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkPaidVNPay, checkPaidVietQR } from "../../apis/PaymentService";
import { useCallback, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { createOrder } from "../../apis/OrderService";
import { writeOrderLog } from "../../apis/UserService";
import { Loading2, Spinner } from '../../components/Loading/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkPaidMomo } from "../../apis/PaymentService";
import {useDispatch } from "react-redux";
import { clearCart } from "../../redux/CartReducer";
const CheckoutScreen = ({ route }) => {
    const navigation = useNavigation();
    const [paymentStatus, setPaymentStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const link = route.params.link;
    const paymentMethod = route.params.paymentMethod;
    const transactionId = route.params.transactionId;
    const totalAmount = route.params.totalAmount;
    const userId = route.params.userId;
    const cart = route.params.cart;

    const dispatch = useDispatch();
    const onClearCart = () => {
        dispatch(clearCart());
    }

    const handleQRPaymentStatus = () => {
        checkPaidVietQR().then((res) => {
            const paymentResponse = res.data.data.map((item) => {
                if (item["Mô tả"].includes(transactionId)) {
                    setIsLoading(false);
                    setPaymentStatus("Paid");
                    return true;
                }
                return false;
            })

            if (paymentResponse === true) {
                createOrder(userId, totalAmount, paymentMethod, cart).then((res) => {
                    if (res.status === 200) {
                        setPaymentStatus("Paid");
                        //AsyncStorage.removeItem("cart")
                        setPaymentStatus("");
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }, { name: 'Cart' }, { name: 'Payment' }, { name: 'Checkout' }],
                        });                    
                        onClearCart();
                        Alert.alert("Payment Status", "Payment is successful")
                        setTimeout(() => {
                            navigation.navigate("Home")
                        }, 3000)
                    }
                }).catch(async (error) => {
                    const logId = await writeLog(userId, totalAmount, paymentMethod, cart)
                    if (logId) {
                        setIsLoading(false);
                        Alert.alert("Internal Server Error", `Please provide this code ${logId} to our Messenger to resolve the problem`)
                        navigation.navigate("Home")
                    }
                    console.log(error);
                })
            } else {
                setTimeout(() => {
                    handleQRPaymentStatus()
                }, 5000)
            }
        }).catch((error) => {
            console.log(error);
            setTimeout(() => {
                handleQRPaymentStatus()
            }, 5000)
        })
    }

    const handleNormalPaymentStatus = async (paymentMethod, orderData) => {
        setIsLoading(true);
        if (paymentMethod === "Momo") {
            try {
                checkPaidMomo(orderData).then((res) => {
                    if (res.status === 200 && res.data.data.message === "Successful.") {
                        createOrder(userId, totalAmount, paymentMethod, cart).then((res) => {
                            if (res.status === 200) {
                                setPaymentStatus("");
                                //AsyncStorage.removeItem("cart")
                                setPaymentStatus("");
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }, { name: 'Cart' }, { name: 'Payment' }, { name: 'Checkout' }],
                                });                              
                                onClearCart();
                                setIsLoading(false);
                                Alert.alert("Payment Status", "Payment is successful")
                                navigation.navigate("Home")
                            }
                        })
                    }
                })
            } catch (error) {
                setIsLoading(false);
                let logId = await writeLog(userId, totalAmount, paymentMethod, cart);
                Alert.alert("Payment Status", `Something went wrong. please provide this code ${logId} to our Messenger to resolve the problem`)
                navigation.navigate("Home")
                console.log(error);
            }
        }

        if (paymentMethod === "VNPay") {
            try {
                const { vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_CardType, vnp_OrderInfo, vnp_PayDate, vnp_ResponseCode, vnp_TmnCode, vnp_TransactionNo, vnp_TransactionStatus, vnp_TxnRef, vnp_SecureHash } = orderData;
                const queryParams = `vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_BankTranNo=${vnp_BankTranNo}&vnp_CardType=${vnp_CardType}&vnp_OrderInfo=${encodeURIComponent(vnp_OrderInfo)}&vnp_PayDate=${vnp_PayDate}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TmnCode=${vnp_TmnCode}&vnp_TransactionNo=${vnp_TransactionNo}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHash=${vnp_SecureHash}`
                checkPaidVNPay(queryParams).then((res) => {
                    if (res.status === 200 && res.data.RspCode === "00") {
                        createOrder(userId, totalAmount, paymentMethod, cart).then((res) => {
                            if (res.status === 200) {
                                setPaymentStatus("");
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }, { name: 'Cart' }, { name: 'Payment' }, { name: 'Checkout' }],
                                });
                                //AsyncStorage.removeItem("cart")
                                onClearCart();
                                setIsLoading(false);
                                Alert.alert("Payment Status", "Payment is successful")
                                navigation.navigate("Home")
                            }
                        })
                    }
                })
            } catch (error) {
                setIsLoading(false);
                let logId = await writeLog(userId, totalAmount, paymentMethod, cart);
                Alert.alert("Payment Status", `Something went wrong. please provide this code ${logId} to our Messenger to resolve the problem`)
                navigation.navigate("Home")
                console.log(error);
            }
        }
    }

    const writeLog = async (userId, totalAmount, paymentMethod, cart) => {
        let logString = `${userId};${totalAmount};${paymentMethod};${JSON.stringify(cart)}`;
        const response = await writeOrderLog(logString).then((res) => {
            if (res.status === 200) {
                return res.data.logId;
            }
        }).catch((err) => {
            console.log(err);
        })
        return response
    }

    const handleDeepLink = (event) => {
        const data = Linking.parse(event.url);
        // Successful.
        if (data.queryParams["message"] === "Successful.") {
            handleNormalPaymentStatus("Momo", data.queryParams["orderId"]);
        }

        if (data.queryParams["vnp_TransactionStatus"] === "00") {
            handleNormalPaymentStatus("VNPay", data.queryParams);
        }

        // Failed.
        if (data.queryParams["message"] === "Transaction denied by user." || data.queryParams["vnp_ResponseCode"] === "24") {
            Alert.alert("Payment Status", "Payment is failed")
            navigation.navigate("Payment")
        }
        console.log(data);
    }

    useEffect(() => {
        if (paymentMethod === "VietQR") {
            handleQRPaymentStatus()
        }
        Linking.addEventListener('url', handleDeepLink);
    }, [])

    if (isLoading) {
        return (
            <Loading2 size="Large" loadingText="Processing" />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.paymentHeader}>
                <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
                    <Ionicons name="arrow-left" size={30} color="black" style={styles.goBack} />
                </TouchableOpacity>
                <Text style={styles.paymentHeaderText}>Checkout</Text>
            </View>
            {paymentMethod === "VietQR" ? (
                <View style={styles.qrCodeContainer}>
                    <Text style={styles.paymentMethodText}>{transactionId}</Text>
                    <Text style={styles.paymentMethodText}>Scan the QR code to proceed payment</Text>
                    <Image source={{ uri: link }} style={styles.qrCode} />
                    {paymentStatus === "Waiting" || paymentStatus === "" ? (
                        <View style={styles.waitingStatusContainer}>
                            <Spinner />
                            <Text style={styles.waitingText}>Waiting for payment</Text>
                            <Text style={styles.attentionText}>Contact us with transaction id if it is too long</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.waitingText}>{paymentStatus}. Thanks for Purchasing</Text>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.normalPaymentContainer}>
                    <Text style={styles.paymentMethodText}>You will be redirect to {paymentMethod} gateway to pay your order</Text>
                    <Button
                        title="Pay Now"
                        onPress={() => WebBrowser.openBrowserAsync(link)}
                    />
                </View>
            )
            }
        </View>
    )
}

export default CheckoutScreen;