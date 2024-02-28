import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    editProfileHeader: {
        flexDirection: "row",
        padding: 20,
        marginTop: 20,
    },
    goBack: {
        marginRight: 10,
    },
    editProfileText: {
        fontSize: 20,
        color: "black",
    },
    editProfileContainer: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: windowWidth * 0.8,
        backgroundColor: "#E8E8E8",
        borderRadius: 25,
        padding: 15,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 16,
    },
    editButton: {
        width: 300,
        backgroundColor: "#4BD894",
        borderRadius: 25,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
})

export default styles;