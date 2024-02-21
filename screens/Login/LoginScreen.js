import { View, Image, StatusBar, TextInput, Text, TouchableOpacity } from "react-native"
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'
import styles from './Style'
import {loginAccount} from '../../apis/UserService'
import { useState } from "react";
import { saveToken } from '../../utils/SecureStore'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    const login = () => {
        loginAccount(email, password).then((res) => {
            const jwtToken = res.data.token
            saveToken(jwtToken)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image style={styles.firstHalf} source={require('../../assets/background.png')} />

            <View style={styles.appLogo}>
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} style={styles.appLogoImage} source={require('../../assets/elibrary.png')} />
            </View>

            <View style={styles.titleAndForm}>
                <View style={styles.title}>
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.titleText}>
                        Welcome to E-Library
                    </Animated.Text>
                </View>

                <View style={styles.form}>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Email' placeholderTextColor={'gray'} onChangeText={(value) => setEmail(value)} />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Password' placeholderTextColor={'gray'} onChangeText={(value) => setPassword(value)} secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
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

export default LoginScreen