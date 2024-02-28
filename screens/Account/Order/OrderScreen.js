import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getOrderByUserId } from "../../../apis/OrderService";
import { retrieveData } from "../../../utils/AsyncStorage";
import styles from "./Style";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    const getUserOrders = async () => {
        try {
            const userId = await retrieveData("userId");
            const orderData = await getOrderByUserId(userId)
            if (orderData) {
                setOrders(orderData.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getUserOrders();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.goBack}>
                    <Ionicons name="arrow-left" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Orders</Text>
            </View>
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("OrderDetail", { orderId: item._id, orderDate: item.orderDate })}>
                            <View style={styles.orderContainer}>
                                <View style={styles.orderIDDateBox}>
                                    <Text style={styles.orderId}>Order#: {item._id}</Text>
                                    <Text style={styles.orderDate}>Date: {item.createdAt.split('T')[0]}</Text>
                                </View>
                                <View style={styles.orderPricePaymentBox}>
                                    <Text style={styles.orderPrice}>{item.totalPrice}đ</Text>
                                    <Text style={styles.orderPayment}>Payment: {item.paymentMethod}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                />
            ) : (
                <View style={styles.emptyOrder}>
                    <Text style={styles.emptyOrderText}>Please buy something</Text>
                    <Text style={[styles.emptyOrderText, { marginTop: 30 }]}>{`(╯°□°）╯︵ ┻━┻`}</Text>
                </View>
            )}
        </View>
    );
}
export default OrderScreen;