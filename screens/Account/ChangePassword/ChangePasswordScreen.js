import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import styles from "./Style";
import { useState } from "react";
import { changePassword } from "../../../apis/UserService";

const ChangePasswordScreen = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation();

    const handleSubmitPassword = () => {
        changePassword(oldPassword, newPassword).then((response) => {
            Alert.alert("Password changed successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }).catch((error) => {
            console.log(error)
        })
    }
    const checkPasswords = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        // Passwords match, continue with password change logic
        handleSubmitPassword();
    }
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
                        onChangeText={(text) => setOldPassword(text)}
                        placeholder="Old Password"
                        value={oldPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setNewPassword(text)}
                        secureTextEntry={true}
                        placeholder="New Password"
                        value={newPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={true}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                    />
                </View>
                <TouchableOpacity style={styles.changeButton} onPress={() => { checkPasswords() }}>
                    <Text style={styles.buttonText}>Change</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default ChangePasswordScreen;