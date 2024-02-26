import { Alert, Text, View } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "./Style";
import { useNavigation } from "@react-navigation/native";

const BookViewerScreen = ({ route }) => {
    const navigation = useNavigation();
    const bookFileUrl = "";

    return (
        <View>
            {Alert.alert(
                "Alert",
                "Not supported yet!",
                [
                    { text: "OK", onPress: () => navigation.navigate("MyBook") }
                ]
            )}
        </View>
    )
}

export default BookViewerScreen;