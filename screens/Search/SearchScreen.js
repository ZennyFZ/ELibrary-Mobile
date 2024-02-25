import { FlatList, Image, Text, View } from "react-native"
import styles from "./Style"
import { searchBook } from "../../apis/BookService";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading/Loading";

const SearchScreen = ({ route }) => {
    const navigation = useNavigation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState("");
    const keyword = route.params.searchText;

    const search = () => {
        setLoading(true);
        searchBook(keyword).then((res) => {
            setBooks(res.data.bookList);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    const goToBookDetail = (bookInformation) => {
        navigation.navigate("BookDetail", { prevScreen: "Home", book: bookInformation });
    }

    useFocusEffect(
        useCallback(() => {
            search();
        }, [keyword])
    )

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader prevScreen={"Home"} />
            <Text style={styles.searchResultText}>
                {keyword? `Search result for "${keyword}"` : "Search result for all books"}
            </Text>
            <FlatList
                data={books}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => goToBookDetail(item)}>
                            <View style={styles.bookCard}>
                                <View style={styles.bookCardContent}>
                                    <Image source={{ uri: item.image }} style={{ width: 280, height: 300 }} />
                                    <Text style={styles.bookCardtitle} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
                                    <Text style={styles.bookCardAuthor}>{item.author}</Text>
                                    <Text style={styles.bookCardPrice}>{item.price}đ</Text>
                                    <TouchableOpacity style={styles.bookCardButton}>
                                        <Text style={styles.bookCardButtonText}>Add To Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default SearchScreen;