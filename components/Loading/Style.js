import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width; // 100% width
const windowHeight = Dimensions.get('window').height; // 100% height

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    }
});

export default styles;