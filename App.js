// Libraries 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { storeData } from './utils/AsyncStorage';
import { Provider } from 'react-redux';
import cartStore from './redux/store';

// Custom Components
import {Loading} from './components/Loading/Loading';

// Screens
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import PaymentScreen from './screens/Payment/PaymentScreen'
import CheckoutScreen from './screens/Payment/CheckoutScreen';
import AccountScreen from './screens/Account/AccountScreen';
import OrderScreen from './screens/Account/Order/OrderScreen';
import EditProfileScreen from './screens/Account/EditProfile/EditProfileScreen';
import ChangePasswordScreen from './screens/Account/ChangePassword/ChangePasswordScreen';
import CartScreen from './screens/Cart/CartScreen';
import CategoryScreen from './screens/Category/CategoryScreen';
import CategoryDetailScreen from './screens/Category/CategoryDetailScreen';
import MyBookScreen from './screens/MyBook/MyBookScreen';
import BookDetail from './screens/BookDetail/BookDetailScreen';
import BookListScreen from './screens/BookList/BookListScreen';
import SearchScreen from './screens/Search/SearchScreen';
import BookViewerScreen from './screens/MyBook/BookViewerScreen';
import AdminScreen from './screens/Admin/AdminScreen';

// APIs and Utils
import { getCurrentUser } from './apis/UserService';
import { screenOptions, tabOptions } from './utils/TabSetting';
import OrderDetailScreen from './screens/Account/Order/OrderDetailScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("")

  const getInitialRoute = () => {
    getCurrentUser().then((res) => {
      if (res.status === 200) {
        storeData("userId", res.data.user._id)
        setInitialRoute("Home")
      } else {
        setInitialRoute("Login")
      }
    }).catch((err) => {
      setInitialRoute("Login")
    })
  }

  useEffect(() => {
    getInitialRoute()
  }, [])

  if (initialRoute === "") {
    return (
      <Loading />
    )
  }

  return (
    <StripeProvider publishableKey="pk_test_51OkoLnCB8E3j4yFBOsRUji1rylJNhC60BWmmYTKXXIiKb4vtmI1frFoYw9ydlDRUi0SQOpsnPoSGGbOHXGhl7Bvl00m25gKZER">
      <Provider store={cartStore}>
        <NavigationContainer style={{ backgroundColor: "#9ca3af40" }}>
          <Tab.Navigator initialRouteName={initialRoute} screenOptions={screenOptions}>
            <Tab.Screen name="Login" component={LoginScreen} options={tabOptions} />
            <Tab.Screen name="Register" component={RegisterScreen} options={tabOptions} />
            <Tab.Screen name="Welcome" component={WelcomeScreen} options={tabOptions} />
            <Tab.Screen name="Payment" component={PaymentScreen} options={tabOptions} />
            <Tab.Screen name="Checkout" component={CheckoutScreen} options={tabOptions} />
            <Tab.Screen name="BookList" component={BookListScreen} options={tabOptions} />
            <Tab.Screen name="BookDetail" component={BookDetail} options={tabOptions} />
            <Tab.Screen name="CategoryDetail" component={CategoryDetailScreen} options={tabOptions} />
            <Tab.Screen name="Search" component={SearchScreen} options={tabOptions} />
            <Tab.Screen name="BookViewer" component={BookViewerScreen} options={tabOptions} />
            <Tab.Screen name="EditProfile" component={EditProfileScreen} options={tabOptions} />
            <Tab.Screen name="ChangePassword" component={ChangePasswordScreen} options={tabOptions} />
            <Tab.Screen name="Order" component={OrderScreen} options={tabOptions} />
            <Tab.Screen name="OrderDetail" component={OrderDetailScreen} options={tabOptions} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Category" component={CategoryScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="MyBook" component={MyBookScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </StripeProvider>
  );
}
