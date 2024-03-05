import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "react-native";
import styles from "./Style";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { deleteBook, updateBook } from "../../../apis/BookService";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { uploadFile, uploadImage } from "../../../firebaseConfig";

const BookDetailManage = ({ route, navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [bookData, setBookData] = useState(route.params.book);
  const [dataModal, setDataModal] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isChangeText, setIsChangeText] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPDF, setIsUploadingPDF] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const prevScreen = route.params.prevScreen;
  const categories = route.params.categories;

  const handleUploadFilePDF = async () => {
    try {
      setIsUploadingPDF(true);
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (!result.assets[0].canceled && result.assets[0].mimeType === "application/pdf") {
        const downloadURL = await uploadFile(result.assets[0].uri, "pdf");
        if (downloadURL) {
          handleUpdateWithUpload({ file: downloadURL });
        }
      }
      setIsUploadingPDF(false);
    } catch (error) {
      setIsUploadingPDF(false);
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
        setIsUploading(true);
        const downloadURL = await uploadImage(result.assets[0].uri, "image");
        if (downloadURL) {
          handleUpdateWithUpload({ image: downloadURL });
        }
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      console.log("🚀 ~ pickImage ~ error:", error);
    }
  };

  const handleUpdateWithUpload = (url) => {
    id = bookData._id;
    let data = {
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
    };
    if (url.image) {
      data.image = url.image;
    } else {
      data.file = url.file;
    }
    updateBook(
      id,
      data.title,
      data.author,
      data.publisher,
      data.publishDate,
      data.pages,
      data.language,
      data.price,
      data.image,
      data.description,
      data.category,
      data.file
    )
      .then((res) => {
        if (res.status === 200) {
          showToast("Upload successfully!");
          if (url.image) {
            let temp = { ...bookData };
            temp.image = url.image;
            setBookData(temp);
            return;
          } else {
            let temp = { ...bookData };
            temp.file = url.file;
            setBookData(temp);
            return;
          }
        }
      })
      .catch((err) => {
        Alert.alert(err);
        setIsUploading(false);
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    setDataModal({});
    setIsChangeText(false);
    setModalVisible(false);
    setShowPicker(false);
    setSelectedCategory("");
  };

  const handleDelete = (id) => {
    Alert.alert("Deleted data cannot be recovered!!!", "Do you want to continue?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          deleteBook(id)
            .then((res) => {
              if (res.status === 200) {
                navigation.navigate("BookManage");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
    ]);
  };

  const capitalizedStr = (obj) => {
    let str = Object.keys(obj)[0];
    if (!str) {
      return;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChangeText = (text) => {
    let key = Object.keys(dataModal)[0];
    if (key === "publishDate") {
      const year = text.getFullYear();
      const month = String(text.getMonth() + 1).padStart(2, "0");
      const day = String(text.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      let check1 = formattedDate.toString(0);
      let check2 = bookData.publishDate.split("T")[0].toString(0);
      if (check1 === check2) {
        setIsChangeText(false);
      } else {
        setIsChangeText(true);
      }
      setDataModal({ [key]: formattedDate });
      setShowPicker(false);
      return;
    }

    if (key === "category") {
      if (bookData.category._id === text) {
        setIsChangeText(false);
      } else {
        setIsChangeText(true);
      }
      setDataModal({ [key]: text });
      setSelectedCategory(text);
      return;
    }

    if (bookData[key].toString() === text.toString()) {
      setIsChangeText(false);
    } else {
      setIsChangeText(true);
    }
    setDataModal({ [key]: text });
  };

  const handleUpdate = () => {
    let keyUpdate = Object.keys(dataModal)[0];
    id = bookData._id;
    let data = {
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
    };
    data[keyUpdate] = Object.values(dataModal)[0];
    updateBook(
      id,
      data.title,
      data.author,
      data.publisher,
      data.publishDate,
      data.pages,
      data.language,
      data.price,
      data.image,
      data.description,
      data.category,
      data.file
    )
      .then((res) => {
        if (res.status === 200) {
          let temp = { ...bookData };
          if (keyUpdate === "category") {
            let newName = categories?.filter((item) => item._id === Object.values(dataModal)[0]);
            temp.category._id = newName[0]._id;
            temp.category.name = newName[0].name;
            setBookData(temp);
            handleCloseModal();
            return;
          }

          temp[keyUpdate] = Object.values(dataModal)[0];
          setBookData(temp);
          handleCloseModal();
        }
      })
      .catch((err) => {
        Alert.alert(err);
        console.log(err);
      });
  };

  function showToast(mess) {
    ToastAndroid.show(mess, ToastAndroid.SHORT);
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              alignItems: "center",
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(prevScreen);
              }}
            >
              <Ionicons name="arrow-back-outline" size={25} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  handleDelete(bookData._id);
                }}
              >
                <Text style={{ fontSize: 18, color: "#FA6957" }}>Delete</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate(prevScreen);
              }}
            >
              <Text style={{ fontSize: 18, marginLeft: 20 }}>Update</Text>
            </TouchableOpacity> */}
            </View>
          </View>

          <View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
              <Image source={{ uri: bookData.image }} style={styles.detailImage} />
              {isUploading && (
                <View style={{ position: "absolute", alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator
                    size={100}
                    color="green"
                    style={{ position: "absolute", alignItems: "center", justifyContent: "center", zIndex: 99 }}
                  />
                </View>
              )}
            </View>
            <Ionicons
              style={{ position: "absolute", right: 10, top: 10, backgroundColor: "black", padding: 10, borderRadius: 50 }}
              name="pencil"
              size={25}
              color="gray"
              onPress={pickImage}
            />
            <View style={styles.overviewDetailBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.overviewDetailPrice}>
                  {bookData.price}đ
                  <Ionicons
                    name="pencil"
                    size={25}
                    color="gray"
                    onPress={() => {
                      setDataModal({ price: bookData.price });
                      setModalVisible(true);
                    }}
                  />
                </Text>
              </View>
              <Text style={styles.overviewDetailTitle}>
                {bookData.title}
                <Ionicons
                  name="pencil"
                  size={25}
                  color="gray"
                  onPress={() => {
                    setDataModal({ title: bookData.title });
                    setModalVisible(true);
                  }}
                />
              </Text>
              <Text style={styles.overviewDetailAuthor}>
                Author: {bookData.author}
                <Ionicons
                  name="pencil"
                  size={25}
                  color="gray"
                  onPress={() => {
                    setDataModal({ author: bookData.author });
                    setModalVisible(true);
                  }}
                />
              </Text>
              <Text style={styles.overviewDetailDescription}>
                {bookData.description}
                <Ionicons
                  name="pencil"
                  size={25}
                  color="gray"
                  onPress={() => {
                    setDataModal({ description: bookData.description });
                    setModalVisible(true);
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
                {bookData.file && (
                  <Pressable
                    onPress={() => {
                      navigation.navigate("ViewBookScreen", {
                        url: bookData.file,
                        prevScreen: "BookDetailManage",
                        book: bookData,
                        categories: categories,
                      });
                    }}
                    style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                  >
                    <Ionicons name="eye-outline" size={25} />
                    <Text style={{ fontSize: 12 }}>View Book</Text>
                  </Pressable>
                )}
              </View>
              {isUploadingPDF && <ActivityIndicator size="small" color="#0000ff" />}
              <Button
                disabled={isUploadingPDF}
                title="Update file (PDF)"
                onPress={() => {
                  handleUploadFilePDF();
                }}
              />
              <View style={styles.bookDetailLine}></View>
              <View style={styles.bookDetailBox}>
                <View style={styles.bookDetailContent}>
                  <Text style={styles.bookDetailContentTitle}>Publisher:</Text>
                  <Text style={styles.bookDetailContentValue}>
                    {bookData.publisher}{" "}
                    <Ionicons
                      name="pencil"
                      size={25}
                      color="gray"
                      onPress={() => {
                        setDataModal({ publisher: bookData.publisher });
                        setModalVisible(true);
                      }}
                    />
                  </Text>
                </View>
                <View style={styles.bookDetailContent}>
                  <Text style={styles.bookDetailContentTitle}>Publish Date:</Text>
                  <Text style={styles.bookDetailContentValue}>
                    {bookData.publishDate.split("T")[0]}{" "}
                    <Ionicons
                      name="pencil"
                      size={25}
                      color="gray"
                      onPress={() => {
                        setDataModal({ publishDate: bookData.publishDate.split("T")[0] });
                        setModalVisible(true);
                      }}
                    />
                  </Text>
                </View>
                <View style={styles.bookDetailContent}>
                  <Text style={styles.bookDetailContentTitle}>Category:</Text>
                  <Text style={styles.bookDetailContentValue}>
                    {bookData.category.name}{" "}
                    <Ionicons
                      name="pencil"
                      size={25}
                      color="gray"
                      onPress={() => {
                        setDataModal({ category: bookData.category._id });
                        setSelectedCategory(bookData.category._id);
                        setModalVisible(true);
                      }}
                    />
                  </Text>
                </View>
                <View style={styles.bookDetailContent}>
                  <Text style={styles.bookDetailContentTitle}>Language:</Text>
                  <Text style={styles.bookDetailContentValue}>
                    {bookData.language}{" "}
                    <Ionicons
                      name="pencil"
                      size={25}
                      color="gray"
                      onPress={() => {
                        setDataModal({ language: bookData.language });
                        setModalVisible(true);
                      }}
                    />
                  </Text>
                </View>
                <View style={styles.bookDetailContent}>
                  <Text style={styles.bookDetailContentTitle}>Pages:</Text>
                  <Text style={styles.bookDetailContentValue}>
                    {bookData.pages}{" "}
                    <Ionicons
                      name="pencil"
                      size={25}
                      color="gray"
                      onPress={() => {
                        setDataModal({ pages: bookData.pages });
                        setModalVisible(true);
                      }}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", width: "80%", borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 5, fontWeight: "bold" }}>{capitalizedStr(dataModal)}</Text>
            {Object.keys(dataModal)[0] === "category" && (
              <Picker selectedValue={selectedCategory} onValueChange={(itemValue, itemIndex) => handleChangeText(itemValue)}>
                {categories?.map((item) => {
                  return <Picker.Item key={item._id} label={item.name} value={item._id} />;
                })}
              </Picker>
            )}
            {Object.keys(dataModal)[0] === "publishDate" && (
              <View>
                <Pressable
                  onPress={() => {
                    setShowPicker(true);
                  }}
                >
                  <Text style={{ fontSize: 18, textAlign: "center", margin: 10 }}> {Object.values(dataModal)[0]?.toString()}</Text>
                </Pressable>
                {showPicker && (
                  <DateTimePicker
                    value={new Date(Object.values(dataModal)[0])}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (event.type === "dismissed") {
                        setShowPicker(false);
                        return;
                      }
                      handleChangeText(selectedDate);
                    }}
                  />
                )}
              </View>
            )}
            {Object.keys(dataModal)[0] !== "category" && Object.keys(dataModal)[0] !== "publishDate" && (
              <TextInput
                numberOfLines={4}
                multiline
                style={styles.modalView}
                onChangeText={(text) => {
                  handleChangeText(text);
                }}
                value={Object.values(dataModal)[0]?.toString()}
                keyboardType={Object.keys(dataModal)[0] === "price" || Object.keys(dataModal)[0] === "pages" ? "numeric" : "default"}
              />
            )}

            <View style={{ width: "100%", flexDirection: "row", height: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                }}
                style={{ width: "50%", backgroundColor: "#FA6957", justifyContent: "center", alignItems: "center" }}
              >
                <Ionicons name="close" size={16} />
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isChangeText ? false : true}
                onPress={() => {
                  handleUpdate();
                }}
                style={{ width: "50%", backgroundColor: isChangeText ? "#b4d75d" : "gray", justifyContent: "center", alignItems: "center" }}
              >
                <Ionicons name="checkmark-circle-outline" size={16} />
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BookDetailManage;
