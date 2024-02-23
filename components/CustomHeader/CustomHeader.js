import { Text, TouchableOpacity, View } from "react-native"
import styles from "./Style"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const CustomHeader = () => {
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate("Home");
    }

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToHome}>
                    <Ionicons name="arrow-left" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>E-Library</Text>
                <TouchableOpacity>
                    <Ionicons name="cart" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomHeader;