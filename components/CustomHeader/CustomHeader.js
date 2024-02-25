import { Text, TouchableOpacity, View } from "react-native"
import styles from "./Style"
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const CustomHeader = ({ prevScreen, category }) => {
    const cart = useSelector(state => state.cart);
    const navigation = useNavigation();

    const goToHome = () => {
        navigation.navigate(prevScreen, { category: category });
    }

    const goToCart = () => {
        navigation.navigate("Cart");
    }

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToHome}>
                    <Ionicons name="arrow-left" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>E-Library</Text>
                <TouchableOpacity>
                    <Text>
                        <Ionicons name="cart" size={30} color="#fff" onPress={goToCart} />
                        <Text style={styles.cartBadge}>({cart.cart.length})</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomHeader;