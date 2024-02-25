import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#E67E22",
        padding: 30,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
    },
    cartBadge: {
        position: "absolute",
        top: -5,
        right: -5,
        color: "#fff",
        borderRadius: 50,
        width: 20,
        height: 20,
        textAlign: "center",
        fontSize: 20
    }
})

export default styles;