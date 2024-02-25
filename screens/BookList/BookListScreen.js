import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import styles from './Style';
import { useState, useEffect } from 'react';
import { getBooks } from '../../apis/BookService';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigation } from '@react-navigation/native';

const BookListScreen = () => {
    const navigation = useNavigation();
    const [books, setBooks] = useState([]);

    const getAllBooks = () => {
        getBooks().then((res) => {
            setBooks(res.data.bookList);
        }).catch((err) => {
            console.log(err);
        });
    }

    const goToBookDetail = (bookInformation) => {
        navigation.navigate("BookDetail", { prevScreen: "BookList", book: bookInformation });
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader prevScreen={"Home"} />
            <SearchBar />
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
export default BookListScreen;