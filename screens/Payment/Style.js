import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dfe1e6",
    },
    paymentHeader: {
        flexDirection: "row",
        padding: 20,
        marginTop: 20,
    },
    paymentHeaderText: {
        fontSize: 20,
        color: "black",
    },
    goBack: {
        marginRight: 10,
    },
    paymentMethodContainer: {
        padding: 20,
        backgroundColor: "white",
        height: "auto",
    },
    choosePaymentText: {
        fontSize: 20,
        padding: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "black",
    },
    paymentOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "white",
        borderRadius: 20,
        borderWidth: 5,
        elevation: 5,
    },
    paymentIcon: {
        width: 100,
        height: 100,
    },
    paymentOptionText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    payContainer: {
        width: windowWidth,
        height: windowHeight / 3,
        justifyContent: "center",
        alignItems: "center",
    },
    payContainerText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    payContainerButton: {
        padding: 20,
        backgroundColor: "#2196f3",
        color: "white",
        fontSize: 20,
        borderRadius: 20,
        marginTop: 15
    },
    qrCodeContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        elevation: 5,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    normalPaymentContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: windowHeight
    },
    paymentMethodText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    qrCode: {
        width: windowWidth - 40,
        height: windowHeight / 1.5,
        alignSelf: "center",
    },
    waitingText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    updateStatusButton: {
        padding: 20,
        backgroundColor: "#2196f3",
        color: "white",
        fontSize: 20,
        borderRadius: 20,
        marginTop: 15
    }
})

export default styles;