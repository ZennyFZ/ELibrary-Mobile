import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import styles from "./Style";
import { useState } from "react";

const EditProfile = ({route}) => {
    const user = route.params.userData;
    const navigation = useNavigation();

    const editProfile = () => {

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
                        value={user.name}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        value={user.email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone"
                        value={user.phone}
                    />
                </View>
                <TouchableOpacity style={styles.editButton} onPress={() => { }}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default EditProfile;