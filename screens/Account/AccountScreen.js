import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from "./Style";
import { useCallback, useState } from 'react';
import { getCurrentUser } from '../../apis/UserService';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { deleteToken } from '../../utils/SecureStore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
    const [user, setUser] = useState({});
    const navigation = useNavigation();

    const getUserInformation = () => {
        getCurrentUser().then((res) => {
            setUser(res.data.user);
        }).catch((err) => {
            console.log(err);
        });
    }

    const logout = () => {
        deleteToken();
        setUser({});
        AsyncStorage.clear();
        navigation.navigate("Login");
    }

    useFocusEffect(
        useCallback(() => {
            getUserInformation();
        }, [])
    );

    return (
        <View style={styles.accountContainer}>
            <Text style={styles.accountTitle}>Profile</Text>
            <View style={styles.card}>
                <Image source={require("../../assets/Avatar.png")} style={styles.avatar} />
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{user.name}</Text>
                    <Text style={styles.cardEmail}>{user.email}</Text>
                    <Text style={styles.cardPhone}>{user.phone}</Text>
                </View>
                <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate("EditProfile")}>
                    <Ionicons name="edit" size={30} color="#E67E22" />
                </TouchableOpacity>
            </View>
            <View style={styles.accountSection}>
                <FlatList
                    data={[
                        { key: 'Order', icon: 'bars', screen: 'Order' },
                        { key: 'Change password', icon: 'edit', screen: 'ChangePassword' },
                    ]}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
                            <View style={styles.sectionItem}>
                                <Ionicons name={item.icon} size={30} color="#E67E22" />
                                <Text style={styles.sectionText}>{item.key}</Text>
                                <Ionicons name="right" size={30} color="#E67E22" style={styles.rightIcon} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Account;