import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoryManageScreen from "./CategoryManage/CategoryManageScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import BookManageScreen from "./BookManage/BookManageScreen";

const Drawer = createDrawerNavigator();

const Admin = ({ navigation }) => {
  const drawerOption = {
    unmountOnBlur: true,
    headerTitleAlign: "center",
    headerRight: () => (
      <Ionicons
        name="arrow-back-outline"
        size={20}
        color="black"
        style={{ marginRight: 10 }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
    ),
  };

  return (
    <Drawer.Navigator initialRouteName="BookManage">
      <Drawer.Screen name="BookManage" component={BookManageScreen} options={{ ...drawerOption, headerTitle: "Book Manage" }} />
      <Drawer.Screen name="CategoryManage" component={CategoryManageScreen} options={{ ...drawerOption, headerTitle: "Category Manage" }} />
    </Drawer.Navigator>
  );
};

export default Admin;
