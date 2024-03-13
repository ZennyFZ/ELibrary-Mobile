import { TouchableOpacity, View, Alert } from "react-native";
import { WebView } from 'react-native-webview';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCallback, useEffect, useRef, useState } from "react";
import { summarize } from "../../apis/SummarizationService";
import { Loading } from "../../components/Loading/Loading";

const BookViewerScreen = ({ route }) => {
    const [pdfURL, setPdfURL] = useState("");
    const [summarizedText, setSummarizedText] = useState("");
    const navigation = useNavigation();

    const webViewRef = useRef();

    const removeMarkdown = (htmlString) => {
        let result = htmlString.replace(/<br>/g, '');
        result = result.replace(/\*\*|\_\_/g, '');
        return result;
    }

    const summarizeBook = () => {
        summarize(route.params.bookName).then((response) => {
            setSummarizedText(response.data.summarizedText);
        }).catch((error) => {
            summarizeBook();
            console.log(error);
        });
    }

    const showSummary = () => {
        Alert.alert("Summary", removeMarkdown(summarizedText));
    }

    useFocusEffect(
        useCallback(() => {
            webViewRef.current.reload();
            setPdfURL(`https://docs.google.com/viewer?url=${route.params.pdfLink}&embedded=true`);
            summarizeBook();
        }, [route.params.pdfLink])
    );

    useEffect(() => {
        webViewRef.current.reload();
        setPdfURL(`https://docs.google.com/viewer?url=${route.params.pdfLink}&embedded=true`);
        summarizeBook();
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => { navigation.navigate("MyBook"), setPdfURL("") }}>
                    <Ionicons name="arrow-left" size={30} color="black" style={{ padding: 10, marginTop: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { showSummary() }}>
                    <Ionicons name="card-text-outline" size={30} color="black" style={{ padding: 10, marginTop: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { webViewRef.current.reload() }}>
                    <Ionicons name="reload" size={30} color="black" style={{ padding: 10, marginTop: 30 }} />
                </TouchableOpacity>
            </View>
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