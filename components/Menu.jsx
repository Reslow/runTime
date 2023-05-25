import { View, TouchableOpacity, StyleSheet, screen, Text } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthentication } from "../hooks/useAuthentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, MenuItem } from "react-native-material-menu";

export default function MenuComponent({ navigation }) {
  const [visible, setVisible] = useState(false);
  const auth = getAuth();
  const { user } = useAuthentication();

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  async function handleSignout() {
    console.log("bye");
    await AsyncStorage.setItem("user", "");
    await AsyncStorage.setItem("data", "");
    console.log("s", auth);

    const signed = await signOut(auth);
    console.log("signed", signed);

    // navigation.navigate("Root");
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: 20,
          height: 30,
          alignItems: "flex-start",
        }}
      >
        <Menu
          visible={visible}
          anchor={
            <Text onPress={showMenu}>
              <MaterialIcons name="menu" size={36} color="black" />
            </Text>
          }
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={hideMenu}>
            <Text onPress={hideMenu}>
              <MaterialIcons name="close" size={36} color="black" />
            </Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              [hideMenu, handleSignout()];
            }}
          >
            logout
          </MenuItem>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ screen });
