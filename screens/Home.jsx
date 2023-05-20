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
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthentication } from "../hooks/useAuthentication";

const Home = ({ navigation, user }) => {
  const { authuser } = useAuthentication();
  const [signedIn, setSignedIn] = useState();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", authuser.uid));
      await deleteUser(authuser).then((w) => console.log(w));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const userObj = user;

    setSignedIn(userObj);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Menu navigation={navigation} />
        </View>
        <View style={styles.mainContentContainer}>
          <View>{signedIn}</View>
          <HistoryList user={user} />
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
