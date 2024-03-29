import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    myBookTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
    bookCard: {
        width: windowWidth / 2.2,
        height: "auto",
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 10,
    },
    bookCardContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        marginTop:20
    },
    bookCardtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    bookCardAuthor: {
        fontSize: 14,
        color: "#7f8c8d",
        marginBottom: 5,
    },
    bookCardPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1435C9",
    },
    bookCardButton: {
        backgroundColor: "#E67E22",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    bookCardButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    bookViewerContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    noBook: {
        display: 'flex',
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noBookText: {
        fontSize: 30,
        fontWeight: 'bold',
    }
})

export default styles;