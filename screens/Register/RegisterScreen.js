import { View, Image, StatusBar, TextInput, Text, TouchableOpacity, Alert } from "react-native"
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'
import styles from './Style'
import { useState } from "react";
import { registerAccount } from "../../apis/UserService";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const handleRegister = () => {
        if (!regex.test(email)) {
            Alert.alert("Invalid email format");
            return;
        }
        if (!email || email.trim() === '') {
            Alert.alert("Email cannot be empty or just spaces");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        registerAccount(email, password).then((response) => {
            Alert.alert("Account created successfully");
            navigation.navigate('Login');
        }).catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                Alert.alert(error.response.data.message);
            } else {
                Alert.alert("An error occurred while creating account");
            }
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
                        <TextInput placeholder='Email' value={email} onChangeText={setEmail} placeholderTextColor={'gray'} />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Password' value={password} onChangeText={setPassword} placeholderTextColor={'gray'} secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor={'gray'} secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => { handleRegister() }}>
                            <Text style={styles.loginButtonText}>Register</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.registerAsk}>
                        <Text style={styles.registerAskHeadingText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.registerAskSubText}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}


export default RegisterScreen