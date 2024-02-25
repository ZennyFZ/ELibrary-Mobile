import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import {filterBookByCategory} from "../../apis/BookService";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loading from "../../components/Loading/Loading";

const CategoryDetailScreen = ({ route }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState("");
    const navigation = useNavigation();
    let categoryName = route.params.category;

    const getBooksByCategory = () => {
        setLoading(true)
        filterBookByCategory(categoryName).then((response) => {
            setBooks(response.data.bookList)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    const goToBookDetail = (book) => {
        navigation.navigate("BookDetail", { prevScreen: "CategoryDetail", category: book.category.name , book: book })
    }

    useFocusEffect(
        useCallback(() => {
            getBooksByCategory();
        }, [categoryName])
    );

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View>
            <CustomHeader prevScreen={"Category"} />
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
    );
}

export default CategoryDetailScreen;