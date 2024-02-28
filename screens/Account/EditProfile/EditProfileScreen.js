import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Style";
import { useCallback, useState } from "react";
import { getCurrentUser, updateProfile } from "../../../apis/UserService";
import { deleteToken } from "../../../utils/SecureStore";

const EditProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [orginalEmail, setOrginalEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();

    const checkFieldConditions = (name, email, phone) => {
        if (name === "" || email === "" || phone === "") {
            Alert.alert("Error", "Empty is not allowed!");
            return false;
        }
        if (!email.includes("@") || !email.includes(".")) {
            Alert.alert("Error", "Invalid email!");
            return false;
        }
        if (phone.length !== 10) {
            Alert.alert("Error", "Invalid phone number!");
            return false;
        }
        if (!/^[a-zA-Z\s]*$/.test(name)) {
            Alert.alert("Error", "Invalid name!");
            return false;
        }
        return true;
    };

    const getUserInformation = () => {
        getCurrentUser().then((res) => {
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setOrginalEmail(res.data.user.email);
            setPhone(res.data.user.phone);
        }).catch((err) => {
            console.log(err);
        });
    };

    const logout = () => {
        deleteToken();
        AsyncStorage.clear();
        navigation.navigate("Login");
    }

    useFocusEffect(
        useCallback(() => {
            getUserInformation();
        }, [])
    );

    const editProfile = () => {
        const errorCheck = checkFieldConditions(name, email, phone);
        if (errorCheck === true) {
            Alert.alert(
                "Edit Profile",
                "Are you sure you want to edit your profile?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            const response = await updateProfile(name, email, "", phone);
                            if (response.status === 200) {
                                console.log(response);
                                if (email !== orginalEmail) {
                                    Alert.alert("Success", "Profile updated successfully, please login again!");
                                    logout();
                                } else {
                                    Alert.alert("Success", "Profile updated successfully!");
                                    navigation.navigate("Account");
                                }
                            } else {
                                Alert.alert("Error", "Failed to update profile!");
                            }
                        }
                    }
                ]
            );
        }
    }

    return (
        <View>
            <View style={styles.editProfileHeader}>
                <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                    <Ionicons name="arrow-left" size={30} color="black" style={styles.goBack} />
                </TouchableOpacity>
                <Text style={styles.editProfileText}>Edit Profile</Text>
            </View>
            <View style={styles.editProfileContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        editable={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        editable={true}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        editable={true}
                        keyboardType="numeric"
                    />
                </View>
                <Text>If you change email, you need to login again</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => editProfile()}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default EditProfile;