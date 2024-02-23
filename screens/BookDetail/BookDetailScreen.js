import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from './Style';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
const BookDetail = ({ route }) => {
    const navigation = useNavigation();
    const bookData = route.params.book;
    const prevScreen = route.params.prevScreen;

    const goToPrevScreen = () => {
        navigation.navigate(prevScreen)
    }

    const goToCart = () => {
        navigation.navigate("Cart")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.bookDetailHeader}>
                    <TouchableOpacity onPress={goToPrevScreen}>
                        <Image source={require('../../assets/Arrow.png')} style={styles.arrow} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToCart}>
                        <Ionicons name="cart-outline" size={30} style={styles.cart} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Image source={{ uri: bookData.image }} style={styles.detailImage} />

                    <View style={styles.overviewDetailBox}>
                        <View style={styles.priceAndCartBox}>
                        <Text style={styles.overviewDetailPrice}>{bookData.price}đ</Text>
                        <TouchableOpacity style={styles.addToCartButton}>
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