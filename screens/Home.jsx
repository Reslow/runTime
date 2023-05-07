import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAuthentication } from "../hooks/useAuthentication";
import { signOut, deleteUser, getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Timer from "../components/Timer";
import Menu from "../components/Menu";
import List from "../components/List";
const Home = ({ navigation }) => {
  const auth = getAuth();
  const { user } = useAuthentication();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user).then((w) => console.log(w));
    } catch (error) {
      setError(error.message);

      alert(error.message);
    }
  };

  async function handleSignout() {
    await AsyncStorage.setItem("user", "");
    signOut(auth);
  }
  console.log(user);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <List />
        </View>
        <Menu handleSignout={handleSignout} handleDelete={handleDelete} />
        {user && (
          <Text style={styles.GreetingUser}>signed in as:{user.email}</Text>
        )}
      </View>
      <Timer />
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  timerContainer: {
    margin: 5,
  },
});
