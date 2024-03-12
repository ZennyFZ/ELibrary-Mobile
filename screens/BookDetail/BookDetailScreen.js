import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from './Style';
import CustomeHeader from '../../components/CustomHeader/CustomHeader'
import { addToCart } from '../../redux/CartReducer';
import { useDispatch } from 'react-redux';
import { retrieveData } from '../../utils/AsyncStorage';
import { getBooks } from '../../apis/UserService';
import { useState } from 'react';
const BookDetail = ({ route }) => {
    const navigation = useNavigation();
    const bookData = route.params.book;
    const prevScreen = route.params.prevScreen;
    const category = route.params.category;
    const [isOwned, setIsOwned] = useState(false);
    const dispatch = useDispatch();

    const isInMyBook = async (bookID) => {
        try {
            // Retrieve user data
            const userId = await retrieveData('userId');

            // Check owned books
            if (userId) {
                const books = await getBooks(userId);
                // console.log(bookID)
                // console.log(books.data.bookList)
                // console.log(books.data.bookList.some((book) => book._id === bookID))
                const isUserOwnsBook = books.data.bookList.some((book) => book._id === bookID)
                setIsOwned( isUserOwnsBook)
                return isUserOwnsBook
            }
        } catch (err) {
            console.log(err);
            return false
        }
    }

    const addToCartHandler = (book) => {
        dispatch(addToCart(book));
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <CustomeHeader prevScreen={prevScreen} category={category} />

                <View>
                    <Image source={{ uri: bookData.image }} style={styles.detailImage} />

                    <View style={styles.overviewDetailBox}>
                        <View style={styles.priceAndCartBox}>
                            <Text style={styles.overviewDetailPrice}>{bookData.price}đ</Text>
                            {isInMyBook(bookData._id)?(<></>): null}
                            {isOwned ? (
                                <TouchableOpacity style={styles.DisableaddToCartButton} >
                                    <Text style={styles.addToCartButtonText}>Already have</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCartHandler(bookData)}>
                                    <Text style={styles.addToCartButtonText}>Add to cart</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                        <Text style={styles.overviewDetailTitle}>{bookData.title}</Text>
                        <Text style={styles.overviewDetailAuthor}>Author: {bookData.author}</Text>
                        <Text style={styles.overviewDetailDescription}>{bookData.description}</Text>
                    </View>

                    <View style={styles.bigLine} />

                    <View>
                        <Text style={styles.bookDetail}>Book detail</Text>
                        <View style={styles.bookDetailLine}></View>
                        <View style={styles.bookDetailBox}>
                            <View style={styles.bookDetailContent}>
                                <Text style={styles.bookDetailContentTitle}>Publisher:</Text>
                                <Text style={styles.bookDetailContentValue}>{bookData.publisher}</Text>
                            </View>
                            <View style={styles.bookDetailContent}>
                                <Text style={styles.bookDetailContentTitle}>Publish Date:</Text>
                                <Text style={styles.bookDetailContentValue}>{bookData.publishDate.split('T')[0]}</Text>
                            </View>
                            <View style={styles.bookDetailContent}>
                                <Text style={styles.bookDetailContentTitle}>Category:</Text>
                                <Text style={styles.bookDetailContentValue}>{bookData.category.name}</Text>
                            </View>
                            <View style={styles.bookDetailContent}>
                                <Text style={styles.bookDetailContentTitle}>Language:</Text>
                                <Text style={styles.bookDetailContentValue}>{bookData.language}</Text>
                            </View>
                            <View style={styles.bookDetailContent}>
                                <Text style={styles.bookDetailContentTitle}>Pages:</Text>
                                <Text style={styles.bookDetailContentValue}>{bookData.pages}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default BookDetail;