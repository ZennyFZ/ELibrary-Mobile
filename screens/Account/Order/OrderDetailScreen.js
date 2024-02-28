import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import styles from "./Style"
import { useNavigation } from "@react-navigation/native"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from "react"
import { getOrderDetail } from "../../../apis/OrderService"

const OrderDetailScreen = ({ route }) => {
    const [books, setBooks] = useState([])
    const navigation = useNavigation()
    const orderId = route.params.orderId
    const orderDate = route.params.orderDate

    const getOrderDetailData = () => {
        getOrderDetail(orderId).then((res) => {
            setBooks(res.data[0].bookList)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getOrderDetailData()
    }, [])

    return (
        <View style={styles.orderDetailContainer}>
            <View style={styles.orderDetailHeader}>
                <TouchableOpacity onPress={() => navigation.navigate("Order")} style={styles.goBackDetail}>
                    <Ionicons name="arrow-left" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitleDetail}>Order Detail</Text>
            </View>
            <View style={styles.orderDetailIDDateBox}>
                <Text style={styles.orderDetailIDDateBoxTitle}>Order ID: {orderId}</Text>
                <Text style={styles.orderDetailIDDateBoxSubTitle}>{new Date(orderDate).toDateString()}</Text>
            </View>
            <View style={styles.orderDetailItemBox} >
                <Text style={styles.orderDetailItemBoxTitle}>Items</Text>
                <FlatList
                    data={books}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.orderDetailItemBoxContent}>
                                <Image source={{ uri: item.image }} style={styles.orderDetailItemImage} />
                                <View style={styles.orderDetailItemContent}>
                                    <Text style={styles.orderDetailItemTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                                    <Text style={styles.orderDetailItemAuthor}>{item.author}</Text>
                                    <Text style={styles.orderDetailItemPrice}>${item.price}</Text>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={item => item._id}
                />
                <View style={styles.orderDetailItemTotalContainer}>
                    <Text style={styles.orderDetailItemTotalTitle}>Total: </Text>
                    <Text style={styles.orderDetailItemTotal}>{books.reduce((acc, book) => acc + book.price, 0)}đ</Text>
                </View>
            </View>
        </View> 
    )
}

export default OrderDetailScreen