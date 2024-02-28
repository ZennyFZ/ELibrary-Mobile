import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from './Style';
import CustomeHeader from '../../components/CustomHeader/CustomHeader'
import { addToCart } from '../../redux/CartReducer';
import { useDispatch } from 'react-redux';

const BookDetail = ({ route }) => {
    const navigation = useNavigation();
    const bookData = route.params.book;
    const prevScreen = route.params.prevScreen;
    const category = route.params.category;
    const dispatch = useDispatch();

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
                            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCartHandler(bookData)}>
                                <Text style={styles.addToCartButtonText}>Add to cart</Text>
                            </TouchableOpacity>
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