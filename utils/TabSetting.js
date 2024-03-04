import { StyleSheet, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch (route.name) {
            case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
            case 'Category':
                iconName = focused ? 'grid' : 'grid-outline';
                break;
            case 'Cart':
                iconName = focused ? 'cart' : 'cart-outline';
                break;
            case 'MyBook':
                iconName = focused ? 'book' : 'book-outline';
                break;
            case 'Account':
                iconName = focused ? 'person' : 'person-outline';
                break;
        }
        if (iconName === 'cart' || iconName === 'cart-outline') {
            const cart = useSelector(state => state.cart);
            return (
                <Text>
                    <Ionicons name={iconName} size={size} color={color} />
                    <Text style={styles.cartBadge}>{cart.cart.length}</Text>
                </Text>
            )
        } else {
            return <Ionicons name={iconName} size={size} color={color} />;
        }
    },
    tabBarActiveTintColor: '#92B4D3',
    tabBarInactiveTintColor: 'gray',
})

const tabOptions = {
    tabBarButton: () => null,
    tabBarStyle: { display: 'none' },
}

const styles = StyleSheet.create({
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -10,
        borderRadius: 10,
        width: 20,
        height: 20,
        textAlign: 'center',
        color: 'black',
        fontSize: 12
    }
})

export { screenOptions, tabOptions }