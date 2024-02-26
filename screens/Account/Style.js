import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    accountContainer: {
        flex: 1,
        backgroundColor: '#E67E22',
        alignItems: 'center'
    },
    accountTitle: {
        fontSize: 25,
        marginTop: 40,
        fontWeight: 'bold',
        color: '#fff'
    },
    card: {
        width: windowWidth - 40,
        height: 200,
        backgroundColor: '#fff',
        marginTop: 25,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        zIndex: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cardText: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardEmail: {
        fontSize: 15,
        color: 'gray'
    },
    editIcon: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    accountSection: {
        flex: 1,
        width: windowWidth,
        height: 300,
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 25,
    },
    sectionItem: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 3,
        borderBottomColor: '#d1d5de',
        padding: 10,
    },
    sectionText: {
        fontSize: 20,
        marginLeft: 10
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    logoutButton: {
        alignSelf: 'center',
        width: 250,
        height: 50,
        backgroundColor: '#f00',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25
    },
    logoutText: {
        fontSize: 20,
        color: '#fff'
    }
})

export default styles;