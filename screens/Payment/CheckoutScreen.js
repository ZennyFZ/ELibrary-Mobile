import { useFocusEffect, useNavigation } from "@react-navigation/native";
import styles from "./Style";
import { View, Text, TouchableOpacity, Image, Alert, Button } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkPaidVietQR } from "../../apis/PaymentService";
import { useCallback, useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { createOrder } from "../../apis/OrderService";
import { writeOrderLog } from "../../apis/UserService";
import { Loading2 } from '../../components/Loading/Loading';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = ({ route }) => {
    const navigation = useNavigation();
    const [paymentStatus, setPaymentStatus] = useState("Waiting");
    const [isLoading, setIsLoading] = useState(false);
    const link = route.params.link;
    const paymentMethod = route.params.paymentMethod;
    const transactionId = route.params.transactionId;
    const totalAmount = route.params.totalAmount;
    const userId = route.params.userId;
    const cart = route.params.cart;

    const handleUpdateStatus = () => {
        setIsLoading(true);
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
                        setIsLoading(false);
                        AsyncStorage.removeItem("cart")
                        Alert.alert("Payment Status", "Payment is successful")
                        navigation.navigate("Home")
                    }
                }).catch(async(error) => {
                    setIsLoading(false);
                    const logId = await writeLog(userId, totalAmount, paymentMethod, cart)
                    if (logId) {
                        Alert.alert("Internal Server Error", `Please provide this code ${logId} to our Messenger to resolve the problem`)
                    }
                    console.log(error);
                })
            } else {
                handleUpdateStatus()
            }
        }).catch((error) => {
            setIsLoading(false);
            Alert.alert("Payment Status", "Something went wrong. please checkout again")
            console.log(error);
        })
    }

    const handleNormalPayment = (paymentStatus) => {
        if (paymentStatus === "Paid") {
            createOrder(userId, totalAmount, paymentMethod, cart).then((res) => {
                if (res.status === 200) {
                    Alert.alert("Payment Status", "Payment is successful")
                    navigation.navigate("Home")
                }
            }).catch(async (error) => {
                let logId = await writeLog(userId, totalAmount, paymentMethod, cart);
                Alert.alert("Payment Status", `Something went wrong. please provide this code ${logId} to our Messenger to resolve the problem`)
                console.log(error);
            })
        } else {
            Alert.alert("Payment Status", "Payment failed. please checkout again")
            navigation.navigate("Payment")
        }
    }

    const writeLog = async(userId, totalAmount, paymentMethod, cart) => {
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

    if (isLoading) {
        return <Loading2 />
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
                    <Text style={styles.waitingText}>Payment Status: {paymentStatus}</Text>
                    <Text style={styles.waitingText}>Contact us with transaction id if it is too long</Text>
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