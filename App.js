import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login/LoginScreen';
import RegisterScreen from './screens/Register/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import PaymentScreen from './screens/Payment/PaymentScreen'
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const initialRoute = "Login"

  return (
    <StripeProvider publishableKey="pk_test_51OkoLnCB8E3j4yFBOsRUji1rylJNhC60BWmmYTKXXIiKb4vtmI1frFoYw9ydlDRUi0SQOpsnPoSGGbOHXGhl7Bvl00m25gKZER">
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}
