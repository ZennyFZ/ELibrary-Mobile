import { Text, View, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width; // 100% width
const windowHeight = Dimensions.get('window').height; // 100% height

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image style={styles.firstHalf} source={require('../assets/GettingStarted.png')} />

            <View style={styles.heading}>
                <Text style={styles.headingText}>Find your</Text>
                <Text style={styles.headingText}>favorite <Text style={{color: "#3D98E7"}}>books</Text>!</Text>
            </View>

            <View style={styles.subHeading}>
                <Text style={styles.subHeadingText}>Unlock a world of knowledge with E-Library: Where pages come alive</Text>
            </View>

            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.push('Login')}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight,
    },
    firstHalf: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight - 400,
    },
    heading: {
        position: 'absolute',
        top: windowHeight - 400,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    subHeading: {
        top: windowHeight - 300,
        width: windowWidth,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subHeadingText: {
        fontSize: 25,
        color: 'gray',
        textAlign: 'center',
    },
    getStartedButton: {
        top: windowHeight - 300,
        width: windowWidth - 32,
        padding: 16,
        backgroundColor: '#3D98E7',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },
    getStartedButtonText: {
        fontSize: 20,
        color: 'white',
    }
})

export default WelcomeScreen