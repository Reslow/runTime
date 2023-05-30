import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import HistoryList from "../components/HistoryList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "../components/Menu";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthentication } from "../hooks/useAuthentication";
import { deleteUser } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const Home = ({ navigation }) => {
  const { user } = useAuthentication();

  const handleDelete = async () => {
    try {
      await AsyncStorage.setItem("user", "");
      await AsyncStorage.setItem("data", "");
      const runsRef = collection(db, "runs");
      const q = query(runsRef, where("user", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docref = doc.ref;
        deleteDoc(docref);
      });

      await deleteUser(user);
      await deleteDoc(doc(db, "users", user.uid));
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
    }
  };

  function navigateToRun(id) {
    navigation.navigate("RunList", {
      selectedId: id,
    });
  }

  function navigateToHome() {
    navigation.navigate("Home");
  }

  function navigateToHello() {
    navigation.navigate("Hello");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu navigateToHello={navigateToHello} />
        </View>
        <View style={styles.mainContentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>ready to get some work done?</Text>
          </View>
          <HistoryList
            navigationToRun={navigateToRun}
            navigationToHome={navigateToHome}
          />
          <TouchableOpacity
            user={user}
            style={[styles.button, styles.primary]}
            onPress={() => navigation.navigate("New")}
          >
            <Text style={[styles.buttonText, styles.primary]}>New</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Text>Account</Text>
          <Text style={styles.user}>{user && user.email} </Text>

          <TouchableOpacity
            style={[styles.button, styles.secondary]}
            onPress={() => handleDelete()}
          >
            <Text style={[styles.buttonText, styles.secondary]}>
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
    padding: 10,
    backgroundColor: "#ffffff",
  },
  menuContainer: {
    margin: 5,
  },

  bottomContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 4,
    minWidth: "80%",
    maxWidth: "90%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 24,
    textAlign: "center",
  },
  greeting: {
    fontFamily: "rub-mid",
    fontSize: 16,
    textAlign: "center",
  },
  user: {
    textAlign: "center",
    fontFamily: "rub-mid",
    fontSize: 16,
  },

  primary: {
    color: "#ffffff", //White
    backgroundColor: "#373634", //black
    fontFamily: "rub-xbold",
  },
  secondary: {
    color: "#373634", //grey
    backgroundColor: "#f6f6f6", //black
    fontFamily: "rub-bold",
    marginTop: 10,
  },
});
