import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import styles from "./Style";
import { useState } from "react";

const ChangePasswordScreen = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.changePasswordHeader}>
                <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                    <Ionicons name="arrow-left" size={30} color="black" style={styles.goBack} />
                </TouchableOpacity>
                <Text style={styles.changePasswordText}>Change Password</Text>
            </View>
            <View style={styles.changePasswordContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder="New Password"
                        value={newPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                    />
                </View>
                <TouchableOpacity style={styles.changeButton} onPress={() => { /* handle submit */ }}>
                    <Text style={styles.buttonText}>Change</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ChangePasswordScreen;