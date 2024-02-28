import { TouchableOpacity, View } from "react-native";
import { WebView } from 'react-native-webview';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCallback, useEffect, useRef, useState } from "react";

const BookViewerScreen = ({ route }) => {
    const [pdfURL, setPdfURL] = useState("");
    const navigation = useNavigation();

    const webViewRef = useRef();

    useFocusEffect(
        useCallback(() => {
            webViewRef.current.reload();
            setPdfURL(`https://docs.google.com/viewer?url=${route.params.pdfLink}&embedded=true`);
        }, [route.params.pdfLink])
    );

    useEffect(() => {
        webViewRef.current.reload();
        setPdfURL(`https://docs.google.com/viewer?url=${route.params.pdfLink}&embedded=true`);
    }, [])
    

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => { navigation.navigate("MyBook"), setPdfURL("") }}>
                <Ionicons name="arrow-left" size={30} color="black" style={{ padding: 10, marginTop: 30 }} />
            </TouchableOpacity>
            <WebView
                source={{ uri: pdfURL }}
                style={{ marginTop: 20 }}
                bounces={false}
                ref={(ref) => (webViewRef.current = ref)}
                cacheEnabled={false}
            />
        </View>
    );
}

export default BookViewerScreen;