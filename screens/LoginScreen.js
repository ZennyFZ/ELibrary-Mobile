import { View, StyleSheet, Image, StatusBar, TextInput, Text, TouchableOpacity, Dimensions } from "react-native"
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'

const windowWidth = Dimensions.get('window').width; // 100% width
const windowHeight = Dimensions.get('window').height; // 100% height

const LoginScreen = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image style={styles.firstHalf} source={require('../assets/background.png')} />

            <View style={styles.appLogo}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.appLogoImage} source={require('../assets/elibrary.png')} />
            </View>

            <View style={styles.titleAndForm}>
                <View style={styles.title}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.titleText}>
                        Welcome to E-Library
                    </Animated.Text>
                </View>

                <View style={styles.form}>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Email' placeholderTextColor={'gray'} />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.registerAsk}>
                        <Text style={styles.registerAskHeadingText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.push('Register')}>
                            <Text style={styles.registerAskSubText}>Register</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

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
        marginTop: 100
    },
    appLogoImage: {
        width: 120,
        height: 120
    },
    titleAndForm: {
        display: 'flex',
        height: windowHeight,
        width: windowWidth,
        paddingTop: 160,
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


export default LoginScreen