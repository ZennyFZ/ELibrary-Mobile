import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E67E22",
    },
    appLogocontainer: {
        display: 'flex',
        flexDirection: "row",
        padding: 30,
    },
    appLogo: {
        width: 50,
        height: 50,
    },
    appTitle: {
        color: "white",
        paddingLeft: 10,
        fontSize: 30,
    },
    messengerIcon: {
        position: 'absolute',
        right: 30,
        top: 30,
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '95%',
        height: 50,
        marginTop: 30,
        backgroundColor: "white",
        borderRadius: 20,
    },
    searchInput: {
        width: windowWidth - 60,
        paddingLeft: 20,
    },
    bookContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        width: windowWidth,
        height: "auto",
        backgroundColor: "#F3F4F6",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    allBookTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 20,
    },
    viewAll: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    viewAllText: {
        color: "#E67E22",
    },
    bookCard: {
        width: 250,
        height: 'auto',
        backgroundColor: "white",
        margin: 10,
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,

    },
    bookCardContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookCardtitle: {
        fontSize: 16,
        fontWeight: "bold",
        width: 200,
    },
    bookCardAuthor: {
        fontSize: 14,
        color: "#A0A0A0",
    },
    bookCardPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1435C9",
    },
    bookCardButton: {
        backgroundColor: "#E67E22",
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    bookCardButtonText: {
        color: "white",
    },
})

export default styles;