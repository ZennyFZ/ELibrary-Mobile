import { ActivityIndicator, Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../../../apis/CategoryService";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function CategoryManageScreen() {
  const [categories, setCategories] = useState([]);
  const [categoryEdit, setCategoryEdit] = useState({});
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState("");

  const handleCreate = () => {
    if (updateCategoryName.trim() === "") {
      setCategoryEdit({});
      setUpdateCategoryName("");
      setModalVisible(false);
      return;
    }
    addCategory(updateCategoryName.trim())
      .then((res) => {
        if (res.status === 200) {
          let temp = [{ _id: res.data.message, name: updateCategoryName }, ...categories];
          setCategories(temp);
          setCategoryEdit({});
          setUpdateCategoryName("");
          setModalVisible(false);
          return;
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      });
  };

  const handleDelete = () => {
    deleteCategory(categoryEdit._id)
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res.status);
        if (res.status === 200) {
          let temp = [...categories].filter((item) => item._id !== categoryEdit._id);
          setCategoryEdit({});
          setCategories(temp);
          setUpdateCategoryName("");
          setModalVisible(false);
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleDelete ~ err.response:", err);

        Alert.alert(err.response.data.message);
        setCategoryEdit({});
        setUpdateCategoryName("");
        setModalVisible(false);
      });
  };

  const handleUpdate = () => {
    if (updateCategoryName?.trim() === "") {
      setUpdateCategoryName("");
      setModalVisible(false);
      return;
    }
    updateCategory(categoryEdit._id, updateCategoryName)
      .then((res) => {
        if (res.status === 200) {
          let temp = [...categories].map((item) => {
            if (item._id === categoryEdit._id) {
              return {
                ...item,
                name: updateCategoryName,
              };
            }
            return item;
          });
          setCategoryEdit({});
          setCategories(temp);
          setUpdateCategoryName("");
          setModalVisible(false);
        }
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
        setCategoryEdit({});
        setUpdateCategoryName("");
        setModalVisible(false);
      });
  };

  const getAllCategories = () => {
    getCategories()
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          setCategories(res.data.categories);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <View style={{ height: "100%" }}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={{ marginLeft: 10 }} />
        <TextInput
          placeholder="Search category here..."
          style={{ width: "100%", marginLeft: 10 }}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
      </View>

      {isLoading ? (
        <View>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <FlatList
          data={categories.filter((item) => item.name?.toLowerCase().includes(searchText?.toLocaleLowerCase()))}
          ListEmptyComponent={() => (
            <View>
              <Text style={{ textAlign: "center", opacity: 0.3, fontSize: 18 }}>Empty</Text>
            </View>
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={item._id}
                style={styles.categoryList}
                onPress={() => {
                  setModalVisible(true);
                  setCategoryEdit(item);
                }}
              >
                <Text>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="#e3e3e3" />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      )}

      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{ position: "absolute", bottom: 0, width: "100%", height: 40, backgroundColor: "#67a0bf" }}
      >
        <Text style={{ textAlign: "center", marginTop: 8, fontSize: 18 }}>Create new category</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
            setCategoryEdit({});
            setUpdateCategoryName("");
          }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View style={{ backgroundColor: "white", width: "80%", borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
            <TextInput
              placeholder="Category name..."
              defaultValue={categoryEdit?.name}
              style={styles.modalView}
              onChangeText={(text) => {
                setUpdateCategoryName(text);
              }}
            />
            <View style={{ width: "100%", flexDirection: "row", height: 40 }}>
              {categoryEdit?._id ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete();
                    }}
                    style={{ width: "50%", backgroundColor: "#FA6957", justifyContent: "center", alignItems: "center" }}
                  >
                    <Ionicons name="trash-outline" size={16} />
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  {updateCategoryName ? (
                    <TouchableOpacity
                      onPress={() => {
                        handleUpdate();
                      }}
                      style={{ width: "50%", backgroundColor: "#b4d75d", justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons name="refresh" size={16} />
                      <Text>Update</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        handleUpdate();
                      }}
                      style={{ width: "50%", backgroundColor: "#6f7769", justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons name="close" size={16} />
                      <Text>Close</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    handleCreate();
                  }}
                  style={{ width: "100%", backgroundColor: "#67a0bf", justifyContent: "center", alignItems: "center" }}
                >
                  <Ionicons name="add-circle-outline" size={16} />
                  <Text>Create</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryList: {
    backgroundColor: "white",
    height: 50,
    borderBottomColor: "#ebebeb",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 1,
  },
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
});
