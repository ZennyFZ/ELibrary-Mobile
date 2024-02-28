import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import Ionicons from 'react-native-vector-icons/Fontisto';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { getBooks, suggestBookForUser } from "../../apis/BookService";
import { retrieveData } from '../../utils/AsyncStorage'
import { addToCart } from "../../redux/CartReducer";

import SearchBar from "../../components/SearchBar/SearchBar";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchBookData = async () => {
    try {
      const booksResponse = await getBooks();
      setBooks(booksResponse.data.bookList);

      const id = await retrieveData("userId");

      const suggestedBooksResponse = await suggestBookForUser(id);
      if (suggestedBooksResponse.data.bookList) {
        setSuggestedBooks(suggestedBooksResponse.data.bookList);
      }
    } catch (error) {
      console.log('home: '+error);
    }
  };

  const goToBookList = () => {
    navigation.navigate("BookList");
  }

  const goToBookDetail = (bookInformation) => {
    console.log(bookInformation);
    navigation.navigate("BookDetail", { prevScreen: "Home", book: bookInformation });
  }

  const addToCartHandler = (book) => {
    dispatch(addToCart(book));
  }

  useEffect(() => {
    fetchBookData()
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.appLogocontainer}>
          <Image source={require("../../assets/elibrary.png")} style={styles.appLogo} />
          <Text style={styles.appTitle}>E-Library</Text>
          <TouchableOpacity style={styles.messengerIcon}>
            <Ionicons name="messenger" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <SearchBar />

        <View style={styles.bookContainer}>
          {/* Show first 6 books */}
          <View>
            <View>
              <Text style={styles.allBookTitle}>Books</Text>
              <TouchableOpacity style={styles.viewAll} onPress={goToBookList}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}

            >
              {books.slice(0, 6).map(book => {
                return (
                  <TouchableOpacity key={book._id} onPress={() => goToBookDetail(book)} >
                    <View style={styles.bookCard}>
                      <Image source={{ uri: book.image }} style={{ width: 200, height: 300 }} />
                      <View style={styles.bookCardContent}>
                        <Text style={styles.bookCardtitle} numberOfLines={1} ellipsizeMode="tail" >{book.title}</Text>
                        <Text style={styles.bookCardAuthor}>{book.author}</Text>
                        <Text style={styles.bookCardPrice}>{book.price}đ</Text>
                        <TouchableOpacity style={styles.bookCardButton} onPress={() => addToCartHandler(book)}>
                          <Text style={styles.bookCardButtonText}>Add To Cart</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Suggested books */}
            {suggestedBooks.length > 0 && (
              <View>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20, marginTop: 20 }}>Suggested Books</Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {suggestedBooks.slice(0, 6).map(book => {
                    return (
                      <View key={book._id}>
                        <View style={styles.bookCard}>
                          <Image source={{ uri: book.image }} style={{ width: 200, height: 300 }} />
                          <View style={styles.bookCardContent}>
                            <Text style={styles.bookCardtitle} numberOfLines={1} ellipsizeMode="tail" >{book.title}</Text>
                            <Text style={styles.bookCardAuthor}>{book.author}</Text>
                            <Text style={styles.bookCardPrice}>{book.price} VND</Text>
                            <TouchableOpacity style={styles.bookCardButton}>
                              <Text style={styles.bookCardButtonText}>Add To Cart</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )
            }
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;