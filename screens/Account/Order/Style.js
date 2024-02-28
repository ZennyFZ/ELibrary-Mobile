import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dfe1e6",
        padding: 10,
    },
    header: {
        marginTop: 20,
        marginBottom: 10,
    },
    goBack: {
        width: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    orderContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    orderIDDateBox: {
        padding: 5,
    },
    orderPricePaymentBox: {
        flexDirection: "row",
        padding: 5,
    },
    orderId: {
        fontSize: 20,
        fontWeight: "bold",
    },
    orderDate: {
        fontSize: 20,
        color: "#7f8c8d",
    },
    orderPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1435C9",
    },
    orderPayment: {
        fontSize: 20,
        position: "absolute",
        right: 0,
        top: 5,
        color: "#2ECC71",
    },
    orderDetailContainer: {
        flex: 1,
        backgroundColor: "#E67E22",
        padding: 10,
        alignItems: "center",
    },
    orderDetailHeader: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        height: 180,
        width: windowWidth,
    },
    goBackDetail: {
        position: "absolute",
        left: 10,
        top: 10,
    },
    headerTitleDetail: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    orderDetailIDDateBox: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: 150,
        width: '90%',
        borderRadius: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    orderDetailIDDateBoxTitle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },
    orderDetailIDDateBoxSubTitle: {
        fontSize: 20,
        color: "grey",
    },
    orderDetailImage: {
        width: windowWidth / 3,
        height: windowHeight / 4,
    },
    orderDetailTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    orderDetailPrice: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#2ECC71",
    },
    orderDetailItemBox: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        width: windowWidth,
        height: windowHeight,
        marginTop: -40,
        zIndex: -1,
        marginBottom: -10,
    },
    orderDetailItemBoxTitle: {
        marginTop: 80,
        fontSize: 30,
        fontWeight: "bold",
        padding: 40,
    },
    orderDetailItemBoxContent: {
        flexDirection: "row",
        padding: 10,
    },
    orderDetailItemImage: {
        width: windowWidth / 3,
        height: windowHeight / 4,
    },
    orderDetailItemContent: {
        padding: 10,
    },
    orderDetailItemTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    orderDetailItemAuthor: {
        fontSize: 20,
        color: "grey",
    },
    orderDetailItemPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1435C9",
    },
    orderDetailItemTotalContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    orderDetailItemTotalTitle: {
        fontSize: 25,
        fontWeight: "bold",
    },
    orderDetailItemTotal: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#1435C9",
    },
    emptyOrder: {
        display: 'flex',
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyOrderText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default styles;