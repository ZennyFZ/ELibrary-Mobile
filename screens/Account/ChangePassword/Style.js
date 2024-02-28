import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    changePasswordHeader: {
        flexDirection: "row",
        padding: 20,
        marginTop: 20,
    },
    goBack: {
        marginRight: 10,
    },
    changePasswordText: {
        fontSize: 20,
        color: "black",
    },
    changePasswordContainer: {
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
    changeButton: {
        width: 300,
        backgroundColor: "#4BD894",
        borderRadius: 25,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
})

export default styles;