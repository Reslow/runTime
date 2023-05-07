import { View, TouchableOpacity, StyleSheet, screen, Text } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

export default function MenuComponent({ handleSignout, handleDelete }) {
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

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
            {" "}
            <Text onPress={hideMenu}>
              <MaterialIcons name="close" size={36} color="black" />
            </Text>
          </MenuItem>
          <MenuItem onPress={(hideMenu, handleSignout)}>logout</MenuItem>
        </Menu>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ screen });
