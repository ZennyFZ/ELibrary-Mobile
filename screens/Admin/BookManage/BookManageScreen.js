import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { addBook, getBooks } from "../../../apis/BookService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { getCategories } from "../../../apis/CategoryService";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { uploadFile, uploadImage } from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function BookManageScreen({ navigation }) {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);
  const isFocus = useIsFocused();
  const [bookList, setBookList] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publishDate: "",
    pages: "",
    language: "",
    price: "",
    image: "",
    description: "",
    category: "",
    file: "",
  });
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUploadPDF, setIsLoadingUploadPDF] = useState(false);
  const [dataModalInput, setDataModalInput] = useState({});

  const getCategoryName = (id) => {
    if (!id) {
      return "";
    }
    let category = categories.filter((item) => item._id === id);
    return category[0].name ?? "";
  };

  const capitalizedStr = (obj) => {
    let str = Object.keys(obj)[0];
    if (!str) {
      return;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleUploadFilePDF = async () => {
    try {
      setIsLoadingUploadPDF(true);
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.assets[0].canceled && result.assets[0].mimeType === "application/pdf") {
        const downloadURL = await uploadFile(result.assets[0].uri, "pdf");
        if (downloadURL) {
          setNewBook({ ...newBook, file: downloadURL });
        }
      }
      setIsLoadingUploadPDF(false);
    } catch (error) {
      setIsLoadingUploadPDF(false);
      console.log("🚀 ~ pickImage ~ error:", error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.assets[0].canceled) {
        setIsLoading(true);
        const downloadURL = await uploadImage(result.assets[0].uri, "image");
        setIsLoading(false);
        if (downloadURL) {
          setNewBook({ ...newBook, image: downloadURL });
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("🚀 ~ pickImage ~ error:", error);
    }
  };

  const handleCreate = () => {
    let check = Object.values(newBook).filter((item) => item === "");

    if (check.length > 0) {
      Alert.alert("Please enter complete information!!!");
      return;
    }

    addBook(
      newBook.title,
      newBook.author,
      newBook.publisher,
      newBook.publishDate,
      newBook.pages,
      newBook.language,
      newBook.price,
      newBook.image,
      newBook.description,
      newBook.category,
      newBook.file
    )
      .then((res) => {
        if (res.status === 200) {
          Alert.alert("Create new book successfully", "", [
            {
              text: "View book",
              style: "cancel",
              onPress: () => {
                let url = newBook.file;
                setNewBook({
                  title: "",
                  author: "",
                  publisher: "",
                  publishDate: "",
                  pages: "",
                  language: "",
                  price: "",
                  image: "",
                  description: "",
                  category: "",
                  file: "",
                });
                setModalVisible(false);
                navigation.navigate("ViewBookScreen", {
                  url: url,
                  prevScreen: "BookManage",
                });
              },
            },
            {
              text: "Book list",
              onPress: () => {
                getData();
                setNewBook({
                  title: "",
                  author: "",
                  publisher: "",
                  publishDate: "",
                  pages: "",
                  language: "",
                  price: "",
                  image: "",
                  description: "",
                  category: "",
                  file: "",
                });
                setModalVisible(false);
              },
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data.error);
        console.log("🚀 ~ handleCreate ~ err:", err.response.data.error);
      });
  };

  const handleCancel = () => {
    let check = Object.values(newBook).filter((item) => item !== "");
    if (check.length > 0) {
      Alert.alert("Do you want to keep the draft?", "", [
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            setModalVisible(false);
            setNewBook({
              title: "",
              author: "",
              publisher: "",
              publishDate: "",
              pages: "",
              language: "",
              price: "",
              image: "",
              description: "",
              category: "",
              file: "",
            });
          },
        },
        {
          text: "Yes",
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]);
      return;
    } else {
      setModalVisible(false);
    }
  };

  const handleInputText = (text) => {
    let key = Object.keys(dataModalInput)[0];
    if (key === "category") {
      if (!text) {
        return;
      }
    }
    if (key === "publishDate") {
      const year = text.getFullYear();
      const month = String(text.getMonth() + 1).padStart(2, "0");
      const day = String(text.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setNewBook({ ...newBook, [key]: formattedDate });
      setShowPicker(false);
      return;
    }
    setNewBook({ ...newBook, [key]: text });
  };

  const getData = () => {
    getCategories().then((res) => {
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
    });
    getBooks().then((res) => {
      if (res.status === 200) {
        setBookList(res.data.bookList);
      }
    });
  };
  useEffect(() => {
    getData();
  }, [isFocus]);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search book here..."
          style={{ width: "100%", marginLeft: 10 }}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        ListEmptyComponent={
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "gray", opacity: 0.6 }}>Empty</Text>
          </View>
        }
        data={bookList.filter((item) => item.title?.toLowerCase().includes(searchText?.toLocaleLowerCase()))}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("BookDetailManage", { book: item, prevScreen: "BookManage", categories: categories });
                // navigation.navigate("BookViewer", { pdfLink: item.file });
              }}
              style={{ backgroundColor: "#FAF6F6", flexDirection: "row", borderRadius: 10, marginHorizontal: 10 }}
            >
              <Image source={{ uri: item.image }} style={{ width: 106, height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, padding: 8 }}>
                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "column" }}>
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {item.title} - {item.author}
                    </Text>
                    <Text style={{ opacity: 0.5, width: "80%", marginBottom: 10 }} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item.price}
                    <Text style={{ color: "#C059AD" }}> VNĐ</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={{ width: "100%", height: 40, backgroundColor: "#67a0bf" }}
      >
        <Text style={{ textAlign: "center", marginTop: 8, fontSize: 18 }}>Create new book</Text>
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          {newBook.image && <Image source={{ uri: newBook.image }} style={styles.detailImage} />}
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
          <Button disabled={isLoading} title="Upload image" onPress={pickImage} />
          <View style={styles.overviewDetailBox}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.overviewDetailPrice}>
                Price: {newBook.price}
                <Ionicons
                  name="pencil"
                  size={25}
                  color="gray"
                  onPress={() => {
                    setModalInput(true);
                    setTimeout(() => {
                      inputRef?.current?.focus();
                    }, 200);
                    setDataModalInput({ price: newBook.price });
                  }}
                />
              </Text>
            </View>
            <Text style={styles.overviewDetailTitle}>
              Title: {newBook.title}
              <Ionicons
                name="pencil"
                size={25}
                color="gray"
                onPress={() => {
                  setModalInput(true);
                  setTimeout(() => {
                    inputRef?.current?.focus();
                  }, 200);
                  setDataModalInput({ title: newBook.title });
                }}
              />
            </Text>
            <Text style={styles.overviewDetailAuthor}>
              Author: {newBook.author}
              <Ionicons
                name="pencil"
                size={25}
                color="gray"
                onPress={() => {
                  setModalInput(true);
                  setTimeout(() => {
                    inputRef?.current?.focus();
                  }, 200);
                  setDataModalInput({ author: newBook.author });
                }}
              />
            </Text>
            <Text style={styles.overviewDetailDescription}>
              Description: {newBook.description}
              <Ionicons
                name="pencil"
                size={25}
                color="gray"
                onPress={() => {
                  setModalInput(true);
                  setTimeout(() => {
                    inputRef?.current?.focus();
                  }, 200);
                  setDataModalInput({ description: newBook.description });
                }}
              />
            </Text>
          </View>
          <View style={styles.bigLine} />
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>Book detail</Text>
              {newBook.file ? (
                <Text style={{ fontSize: 16, color: "green" }}>Upload file successfully*</Text>
              ) : (
                <Text style={{ fontSize: 16, color: "red" }}>There is no file uploaded yet*</Text>
              )}
            </View>
            {isLoadingUploadPDF && <ActivityIndicator size="small" color="#0000ff" />}
            <Button
              disabled={isLoadingUploadPDF}
              title="Upload file (PDF)"
              onPress={() => {
                handleUploadFilePDF();
              }}
            />
            <View style={styles.bookDetailLine}></View>
            <View style={styles.bookDetailBox}>
              <View style={styles.bookDetailContent}>
                <Text style={styles.bookDetailContentTitle}>Publisher:</Text>
                <Text style={styles.bookDetailContentValue}>
                  {newBook.publisher}{" "}
                  <Ionicons
                    name="pencil"
                    size={25}
                    color="gray"
                    onPress={() => {
                      setModalInput(true);
                      setTimeout(() => {
                        inputRef?.current?.focus();
                      }, 200);
                      setDataModalInput({ publisher: newBook.publisher });
                    }}
                  />
                </Text>
              </View>
              <View style={styles.bookDetailContent}>
                <Text style={styles.bookDetailContentTitle}>Publish Date:</Text>
                <Text style={styles.bookDetailContentValue}>
                  {newBook.publishDate.split("T")[0]}{" "}
                  <Ionicons
                    name="pencil"
                    size={25}
                    color="gray"
                    onPress={() => {
                      setShowPicker(true);
                      setDataModalInput({ publishDate: newBook.publishDate });
                    }}
                  />
                </Text>
              </View>
              <View style={styles.bookDetailContent}>
                <Text style={styles.bookDetailContentTitle}>Category:</Text>
                <Text style={styles.bookDetailContentValue}>
                  {getCategoryName(newBook.category)}{" "}
                  <Ionicons
                    name="pencil"
                    size={25}
                    color="gray"
                    onPress={() => {
                      setModalInput(true);
                      setDataModalInput({ category: newBook.category });
                    }}
                  />
                </Text>
              </View>
              <View style={styles.bookDetailContent}>
                <Text style={styles.bookDetailContentTitle}>Language:</Text>
                <Text style={styles.bookDetailContentValue}>
                  {newBook.language}{" "}
                  <Ionicons
                    name="pencil"
                    size={25}
                    color="gray"
                    onPress={() => {
                      setModalInput(true);
                      setTimeout(() => {
                        inputRef?.current?.focus();
                      }, 200);
                      setDataModalInput({ language: newBook.language });
                    }}
                  />
                </Text>
              </View>
              <View style={styles.bookDetailContent}>
                <Text style={styles.bookDetailContentTitle}>Pages:</Text>
                <Text style={styles.bookDetailContentValue}>
                  {newBook.pages}{" "}
                  <Ionicons
                    name="pencil"
                    size={25}
                    color="gray"
                    onPress={() => {
                      setModalInput(true);
                      setTimeout(() => {
                        inputRef?.current?.focus();
                      }, 200);
                      setDataModalInput({ pages: newBook.pages });
                    }}
                  />
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Pressable
            style={{ flex: 1 / 2 }}
            onPress={() => {
              handleCancel();
            }}
          >
            <Text style={{ fontSize: 18, backgroundColor: "#FA6957", textAlign: "center", padding: 10 }}>Cancel</Text>
          </Pressable>
          <Pressable
            style={{ flex: 1 / 2 }}
            onPress={() => {
              handleCreate();
            }}
          >
            <Text style={{ fontSize: 18, backgroundColor: "#67a0bf", textAlign: "center", padding: 10 }}> Create</Text>
          </Pressable>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalInput}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", width: "80%", borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 5, fontWeight: "bold" }}>{capitalizedStr(dataModalInput)}</Text>
            {Object.keys(dataModalInput)[0] === "category" ? (
              <Picker selectedValue={newBook.category ?? null} onValueChange={(itemValue, itemIndex) => handleInputText(itemValue)}>
                <Picker.Item label="Select category" value="" style={{ fontSize: 18, fontWeight: "bold" }} />
                {categories?.map((item) => {
                  return <Picker.Item key={item._id} label={item.name} value={item._id} />;
                })}
              </Picker>
            ) : (
              <TextInput
                ref={inputRef}
                defaultValue={Object.values(dataModalInput)[0]}
                numberOfLines={4}
                multiline
                style={styles.modalView}
                onChangeText={(text) => {
                  handleInputText(text);
                }}
                keyboardType={Object.keys(dataModalInput)[0] === "price" || Object.keys(dataModalInput)[0] === "pages" ? "numeric" : "default"}
              />
            )}

            <View style={{ width: "100%", flexDirection: "row", height: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalInput(false);
                }}
                style={{ width: "100%", backgroundColor: "#b4d75d", justifyContent: "center", alignItems: "center" }}
              >
                <Ionicons name="checkmark-circle-outline" size={16} />
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {showPicker && (
        <DateTimePicker
          value={newBook.publishDate ? new Date(newBook.publishDate) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === "dismissed") {
              setShowPicker(false);
              return;
            }
            handleInputText(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
  },
  detailImage: {
    width: windowWidth,
    height: windowHeight / 2.5,
  },
  overviewDetailBox: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  overviewDetailAuthor: {
    fontSize: 25,
    color: "gray",
    fontWeight: "bold",
  },
  overviewDetailDescription: {
    fontSize: 20,
    color: "gray",
    marginTop: 10,
  },
  overviewDetailTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  overviewDetailPrice: {
    fontSize: 35,
    color: "#1435C9",
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bigLine: {
    borderBottomWidth: 10,
    borderBottomColor: "#d1d5de",
    marginTop: 20,
  },
  bookDetail: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
  },
  bookDetailLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5de",
    marginTop: 20,
  },
  bookDetailBox: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  bookDetailContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  bookDetailContentTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bookDetailContentValue: {
    fontSize: 20,
  },
});
