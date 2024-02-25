import { TextInput, TouchableOpacity, View } from "react-native"
import styles from "./Style"
import { useState } from "react";
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const searchKeyword = () => {
    navigation.navigate('Search', { searchText });
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search books here..."
        onChangeText={setSearchText}
        value={searchText}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={searchKeyword}>
        <Ionicon name="search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchBar