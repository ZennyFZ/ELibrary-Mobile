import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        width: '100%',
        height: '100%',
        
    },
    cartBox: {
        flex: 1,
    },
    listContainer: {
        paddingBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        shadowColor: '#ddd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginBottom: 10,

    },
    productImage: {
        // width: 60,
        // height: 60,
        // marginRight: 20,
        width: '80%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
    productSubtotal: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    removeButton: {
        color: '#f00',
    },
    cartFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
    payButton: {
        backgroundColor: '#008000',
        borderRadius: 5,
        padding: 10,
    },
    emptyCart: {
        display: 'flex',
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    //pay button
    card_addbtn:{
        width: '86%',
            height: '90%',
            backgroundColor:"blue",
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
    },
    text_addbtn: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: "white",
        textTransform: 'uppercase',
    },
    //Text button
    card_text_button: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      text_button: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#43a7e0',
      },
    //cart_header
    cart_header: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 16,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    }
})

export default styles;