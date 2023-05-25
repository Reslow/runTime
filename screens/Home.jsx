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

const Home = ({ navigation }) => {
  const { user } = useAuthentication();

  const handleDelete = async () => {
    try {
      await AsyncStorage.setItem("user", "");
      await AsyncStorage.setItem("data", "");
      await deleteDoc(doc(db, "users", user.uid));
      const runsRef = collection(db, "runs");
      const q = query(runsRef, where("user", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc);
        const docref = doc.ref;
        deleteDoc(docref);
        console.log(doc);
      });

      const h = await deleteUser(user);
      console.log(h);
    } catch (error) {
      alert(error.message);
    }
  };

  function navigateToRun() {
    navigation.navigate("RunList");
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu navigation={navigation} />
        </View>
        <View style={styles.mainContentContainer}>
          <View>
            <Text>Hi {user && user.email} </Text>
          </View>
          <HistoryList navigation={navigateToRun} />
          <TouchableOpacity
            user={user}
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
