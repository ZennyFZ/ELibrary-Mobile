import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: 15,
    }
})

export default styles;