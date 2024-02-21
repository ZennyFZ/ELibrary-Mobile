import { usePlatformPay } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { getStripeSecret } from '../../apis/PaymentService';
import { Alert, Text, View } from 'react-native';

const PaymentScreen = () => {
    const [stripeSecret, setStripeSecret] = useState('');
    const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay();

    const getStripeSecretData = () => {
        getStripeSecret(100000).then((response) => {
            console.log(response.data.clientSecret)
            setStripeSecret(response.data.clientSecret)
        }).catch((error) => {
            console.log(error)
        })
    }

    const checkGooglePaySupport = async () => {
        if (!(await isPlatformPaySupported({ googlePay: { testEnv: true } }))) {
            Alert.alert('Google Pay is not supported.');
        }else{
            getStripeSecretData()
        }
    }

    useEffect(() => {
        // checkGooglePaySupport()
    }, [])

    const handlePayment = async () => {
        const { error } = await confirmPlatformPayPayment(
            stripeSecret,
            {
                googlePay: {
                    testEnv: true,
                    merchantName: 'ELibrary',
                    merchantCountryCode: 'VN',
                    currencyCode: 'VND',
                }
            }
        );

        if (error) {
            Alert.alert(error.code, error.message);
            // Update UI to prompt user to retry payment (and possibly another payment method)
            return;
        }
        Alert.alert('Success', 'The payment was confirmed successfully.');
    }

    return (
        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

        </View>
    )
}

export default PaymentScreen;
