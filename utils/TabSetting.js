import Ionicons from 'react-native-vector-icons/Ionicons';
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
            case 'My Book':
                iconName = focused ? 'book' : 'book-outline';
                break;
            case 'Account':
                iconName = focused ? 'person' : 'person-outline';
                break;
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#92B4D3',
    tabBarInactiveTintColor: 'gray',
})

const tabOptions = {
    tabBarButton: () => null,
    tabBarStyle: { display: 'none' },
}

export { screenOptions, tabOptions }