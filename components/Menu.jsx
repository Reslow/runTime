import { View, TouchableOpacity, StyleSheet, screen, Text } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut, getAuth } from "firebase/auth";
import { useAuthentication } from "../hooks/useAuthentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu, MenuItem } from "react-native-material-menu";

export default function MenuComponent({ navigateToHello }) {
  const [visible, setVisible] = useState(false);
  const { user } = useAuthentication();

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const auth = getAuth();
  async function handleSignout() {
    await signOut(auth);
    await AsyncStorage.setItem("user", "");
    await AsyncStorage.setItem("data", "");
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        menuWidth={400}
        style={styles.menuContainer}
        anchor={
          <Text onPress={showMenu}>
            <MaterialIcons name="menu" size={36} color="black" />
          </Text>
        }
        onRequestClose={hideMenu}
      >
        <MenuItem onPress={hideMenu} style={styles.menu}>
          <Text onPress={hideMenu}>
            <MaterialIcons name="close" size={36} color="black" />
          </Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            [hideMenu, handleSignout()];
          }}
          style={[styles.menu, styles.logout]}
        >
          <Text style={styles.signoutText}>Sign out</Text>
        </MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#D9D9D9", //grey
  },
  logout: {
    backgroundColor: "#373634", //black
  },
  signoutText: {
    color: "#ffffff", //White
    fontFamily: "rub-xbold",
    fontSize: 16,
  },
});
