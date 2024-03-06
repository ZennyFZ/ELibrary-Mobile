import { TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useRef, useState } from "react";

const ViewBookScreen = ({ route }) => {
  const [pdfURL, setPdfURL] = useState("");
  const navigation = useNavigation();
  const prevScreen = route.params.prevScreen;
  const categories = route.params.categories;
  const book = route.params.book;

  const webViewRef = useRef();

  const handleNavigation = () => {
    if (prevScreen === "BookManage") {
      setPdfURL("");
      navigation.navigate("BookManage");
      return;
    }
    navigation.navigate("BookDetailManage", { book: book, prevScreen: "BookManage", categories: categories }), setPdfURL("");
  };

  useFocusEffect(
    useCallback(() => {
      webViewRef.current.reload();
      setPdfURL(`https://docs.google.com/viewer?url=${route.params.url}&embedded=true`);
    }, [route.params.url])
  );

  useEffect(() => {
    webViewRef.current.reload();
    setPdfURL(`https://docs.google.com/viewer?url=${route.params.url}&embedded=true`);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          handleNavigation();
        }}
      >
        <Ionicons name="arrow-left" size={30} color="black" style={{ paddingLeft: 10, marginVertical: 10 }} />
      </TouchableOpacity>
      <WebView source={{ uri: pdfURL }} bounces={false} ref={(ref) => (webViewRef.current = ref)} cacheEnabled={false} />
    </View>
  );
};

export default ViewBookScreen;
