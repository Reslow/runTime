import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuthentication } from "../hooks/useAuthentication";
import { signOut, deleteUser, getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuComp = ({ setVisible, visible, navigation }) => {
  const auth = getAuth();
  const { user } = useAuthentication();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  async function handleSignout() {
    console.log("logout");
    await AsyncStorage.setItem("user", "");
    const res = await signOut(auth);
    console.log(res);
  }

  const HandleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <Provider>
      <View style={styles.menuContainer}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={styles.menu}
          anchor={
            <Button onPress={openMenu}>
              {!visible ? (
                <MaterialIcons name="menu" size={24} color="black" />
              ) : (
                <MaterialIcons name="close" size={24} color="black" />
              )}
            </Button>
          }
        >
          <View styles={styles.itemsContainer}>
            <View style={styles.itemCon}>
              <Text style={styles.item}>Runtime</Text>
            </View>
            <Menu.Item
              style={styles.itemCon}
              onPress={handleSignout}
              titleStyle={styles.item}
              title="logout"
            />
            <Menu.Item
              style={styles.itemCon}
              onPress={HandleDelete}
              titleStyle={styles.item}
              title="Delete account"
            />
          </View>
        </Menu>
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 20,
    alignItems: "flex-start",
    minWidth: "100%",

    backgroundColor: "#AFF3C0",
  },
  menu: {
    position: "absolute",
    top: 50,
    padding: 15,
    borderRadius: 5,
  },
  itemsContainer: {
    backgroundColor: "black", //green
    padding: 15,
    position: "relative",
    bottom: 100,
  },
  item: {
    backgroundColor: "#AFF3C0", //green
    fontFamily: "rub-bold",
    fontSize: 18,
  },
  itemCon: {
    padding: 5,
    backgroundColor: "#AFF3C0", //green
  },
});

export default MenuComp;
