import { View, Image, StatusBar, TextInput, Text, TouchableOpacity } from "react-native"
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native'
import styles from './Style'

const RegisterScreen = () => {
    const navigation = useNavigation();
    
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
                        <TextInput placeholder='Email' placeholderTextColor={'gray'} />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300).duration(1000).springify()} style={styles.textInput}>
                        <TextInput placeholder='Confirm Password' placeholderTextColor={'gray'} secureTextEntry />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()}>
                        <TouchableOpacity style={styles.loginButton}>
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