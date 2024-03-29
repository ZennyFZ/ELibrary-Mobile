import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    categoryBox: {
        display: 'flex',
        alignItems: 'center',

    },
    categoryItem: {
        margin: 10,
        padding: 15,
        borderRadius: 5,
        shadowColor: '#ddd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor: "#E67E22"
    },
    categoryLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        width: windowWidth,
        height: "auto",
        backgroundColor: "#F3F4F6",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        padding: 10,
    },
    bookCardContent_skeleton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bookCardtitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    bookCardAuthor: {
        fontSize: 14,
        color: "#7f8c8d",
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
    skeleton_btn: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        height:40
    },
    bookCardButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default styles;