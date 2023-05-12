import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import HistoryList from "../components/HistoryList";

import Menu from "../components/Menu";
import List from "../components/List";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthentication } from "../hooks/useAuthentication";
import { getAuth } from "firebase/auth";

const Home = ({ navigation }) => {
  const { user } = useAuthentication();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user).then((w) => console.log(w));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu />
        </View>
        <View style={styles.mainContentContainer}>
          <View>
            <Text>
              signed in as {user && JSON.parse(user).currentUser.email}
            </Text>
          </View>
          <HistoryList user={user && user.email} />
          <TouchableOpacity
            style={[styles.button, styles.primary]}
            onPress={() => navigation.navigate("New")}
          >
            <Text style={[styles.buttonText, styles.primary]}>New</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.BottomContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primary]}
            onPress={() => handleDelete()}
          >
            <Text style={[styles.buttonText, styles.primary]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  menuContainer: {
    margin: 5,
  },
  mainContentContainer: {
    background: "pink",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 4,
    width: "100%",
    minWidth: "80%",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "rub-xbold",
    fontSize: 24,
  },
  primary: {
    color: "#ffffff", //White
    backgroundColor: "#373634", //black
  },
});
