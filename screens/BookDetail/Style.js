import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    arrow: {
        width: 25,
        height: 25,
        marginTop: 25,
    },
    cart: {
        marginTop: 25,
    },
    bookDetailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 25,
    },
    detailImage: {
        width: windowWidth,
        height: windowHeight / 1.5,
    },
    overviewDetailBox: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    priceAndCartBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addToCartButton: {
        backgroundColor: '#1435C9',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    addToCartButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    overviewDetailPrice: {
        fontSize: 40,
        color: '#1435C9',
        fontWeight: 'bold'
    },
    overviewDetailTitle: {
        fontSize: 30, 
        fontWeight: 'bold'
    },
    overviewDetailAuthor: {
        fontSize: 25,
        color: 'gray',
        fontWeight: 'bold',
    },
    overviewDetailDescription: {
        fontSize: 20,
        color: 'gray',
        marginTop: 10,
    },
    bigLine: {
        borderBottomWidth: 10,
        borderBottomColor: '#d1d5de',
        marginTop: 20,
    },
    bookDetail: {
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    bookDetailLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5de',
        marginTop: 20,
    },
    bookDetailBox: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    bookDetailContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    bookDetailContentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    bookDetailContentValue: {
        fontSize: 20,
    },
})

export default styles;