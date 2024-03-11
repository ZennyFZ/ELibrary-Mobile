import { View, Image, StatusBar, TextInput, Text, TouchableOpacity, Alert } from "react-native"
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'
import styles from './Style'
import { loginAccount } from '../../apis/UserService'
import { useEffect, useState } from "react";
import { saveToken } from '../../utils/SecureStore'
import { Loading2 } from "../../components/Loading/Loading";
import { storeData } from "../../utils/AsyncStorage";
import { setIsAdmin } from "../../redux/CartReducer";
import { useDispatch } from "react-redux";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const login = () => {
        setIsLoading(true)
        loginAccount(email, password).then((res) => {
            const userId = res.data.userId
            const jwtToken = res.data.token
            const role = res.data.role
            saveToken(jwtToken)
            storeData("userId", userId)
            storeData("role",role)
            role === "admin" ? dispatch(setIsAdmin(true)) : dispatch(setIsAdmin(false))
            setIsLoading(false)
            navigation.navigate('Home')
        }).catch((error) => {
            setIsLoading(false)
            Alert.alert('Error', 'Invalid email or password!')
            console.log(error)
        })
    }    

    if (isLoading) {
        return <Loading2 loadingText="Loading..." size="large" />
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
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerAskSubText}>Register</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen