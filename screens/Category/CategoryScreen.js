import { FlatList, Text, TouchableOpacity, View } from "react-native";
import styles from "./Style";

import { getCategories } from "../../apis/CategoryService";
import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar/SearchBar";
const Category = () => {
    const [categories, setCategories] = useState([])
    const navigation = useNavigation()

    const getAllCategories = () => {
        getCategories().then((res) => {
            setCategories(res.data.categories)
        }).catch((err) => {
            console.log(err)
        })
    }

    const goToCategoryDetail = (categoryName) => {
        navigation.navigate("CategoryDetail", { category: categoryName })
    }

    useFocusEffect(
        useCallback(() => {
            getAllCategories()
        }, [])
    )

    return (
        <View style={styles.container}>
            <SearchBar/>
            <FlatList
                contentContainerStyle={styles.categoryBox}
                data={categories}
                numColumns={3}
                // horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.categoryItem}>
                        <TouchableOpacity onPress={() => goToCategoryDetail(item.name)}>
                            <Text style={styles.categoryLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default Category;