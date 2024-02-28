import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import { getBooks } from "../../apis/UserService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { retrieveData } from "../../utils/AsyncStorage";

const MyBook = () => {
    const [books, setBooks] = useState([]);
    const navigation = useNavigation();

    const getUserBooks = async () => {
        try {
            const id = await retrieveData("userId");
            const booksResponse = await getBooks(id);
            if (booksResponse.data.bookList) {
                setBooks(booksResponse.data.bookList);
            }
            setBooks(booksResponse.data.bookList);
        } catch (error) {
            console.log(error);
        }
    }

    const goToBookViewer = (bookFileUrl) => {
        console.log(bookFileUrl);
        navigation.navigate("BookViewer", { pdfLink: bookFileUrl });
    }

    useFocusEffect(
        useCallback(() => {
            getUserBooks();
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.myBookTitle}>My Books</Text>
            {books.length > 0 ? (<FlatList
                data={books}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => goToBookViewer(item.file)}>
                            <View style={styles.bookCard}>
                                <View style={styles.bookCardContent}>
                                    <Image source={{ uri: item.image }} style={{ width: 280, height: 300 }} />
                                    <Text style={styles.bookCardtitle} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
                                    <Text style={styles.bookCardAuthor}>{item.author}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item._id}
            />) : (
                <View style={styles.noBook}>
                    <Text style={styles.noBookText}>Empty Library</Text>
                </View>
            )}
        </View>
    );
}

export default MyBook;