import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width; // 100% width
const windowHeight = Dimensions.get('window').height; // 100% height

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight,
    },
    firstHalf: {
        width: windowWidth,
        height: windowHeight,
        position: 'absolute'
    },
    appLogo: {
        display: 'flex',
        position: 'absolute',
        width: windowWidth,
        alignItems: 'center',
        marginTop: 80
    },
    appLogoImage: {
        width: 120,
        height: 120
    },
    titleAndForm: {
        display: 'flex',
        height: windowHeight,
        width: windowWidth,
        paddingTop: 200,
        paddingBottom: 40,
        justifyContent: 'space-around'
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16
    },
    textInput: {
        backgroundColor: '#9ca3af40',
        padding: 16,
        borderRadius: 16,
        width: windowWidth - 32,
        marginBottom: 16
    },
    loginButton: {
        backgroundColor: '#38BDF8',
        padding: 16,
        borderRadius: 16,
        width: windowWidth - 32,
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    registerAsk: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    },
    registerAskHeadingText: {
        marginRight: 2
    },
    registerAskSubText: {
        color: '#0284C7'
    }
})

export default styles