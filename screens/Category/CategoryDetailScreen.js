import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";
import { filterBookByCategory } from "../../apis/BookService";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/CustomHeader/CustomHeader";
import Loading from "../../components/Loading/Loading";
import { addToCart } from "../../redux/CartReducer";
import { useDispatch } from "react-redux";
import { Skeleton } from "moti/skeleton";
const CategoryDetailScreen = ({ route }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
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
        navigation.navigate("BookDetail", { prevScreen: "CategoryDetail", category: book.category.name, book: book })
    }

    const addToCartHandler = (book) => {
        dispatch(addToCart(book));
    }

    useFocusEffect(
        useCallback(() => {
            getBooksByCategory();
        }, [categoryName])
    );

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader prevScreen={"Category"} />
            <FlatList
                data={books}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity key={item._id} onPress={() => goToBookDetail(item)}>
                            <View style={styles.bookCard}>
                            <Skeleton.Group show={loading}
                                    >
                                <View style={styles.bookCardContent}>

                                    <Skeleton
                                    width={200}
                                    height={300}
                                    colorMode="light"
                                    backgroundColor='#D4D4D4'
                                    radius={"square"}
                                    >
                                        <Image source={{ uri: item.image }} style={{ width: 200, height: 300 }} />
                                    </Skeleton>
                                    <View style={{height:5}}/>
                                    <Skeleton
                                    width={"100%"}
                                    colorMode="light"
                                    backgroundColor='#D4D4D4'
                                    >
                                        <View style={styles.bookCardContent_skeleton}>
                                        <Text style={styles.bookCardtitle} numberOfLines={1} ellipsizeMode="tail" >{item.title}</Text>
                                        </View>
                                    </Skeleton>
                                    <View style={{height:5}}/>
                                    <Skeleton
                                    width={"90%"}
                                    colorMode="light"
                                    backgroundColor='#D4D4D4'
                                    >
                                        <View style={styles.bookCardContent_skeleton}>
                                        <Text style={styles.bookCardAuthor}>{item.author}</Text>
                                        </View>
                                    </Skeleton>
                                    <View style={{height:5}}/>
                                    <Skeleton
                                    width={100}
                                    colorMode="light"
                                    backgroundColor='#D4D4D4'
                                    >
                                        <View style={styles.bookCardContent_skeleton}>
                                        <Text style={styles.bookCardPrice}>{item.price}đ</Text>
                                        </View>
                                    </Skeleton>
                                    <View style={{height:5}}/>
                                    {/* {loading == false ? (
                                    <TouchableOpacity style={styles.bookCardButton} onPress={() => addToCartHandler(item)}>
                                        <Text style={styles.bookCardButtonText}>Add To Cart</Text>
                                    </TouchableOpacity>
                                    ) : (
                                        <View style={styles.skeleton_btn}></View>
                                    )} */}
                                </View>
                                </Skeleton.Group>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item._id}
            />
        </View >
    );
}

export default CategoryDetailScreen;