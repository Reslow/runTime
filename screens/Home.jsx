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

const Home = ({ navigation }) => {
  const auth = getAuth();
  const { user } = useAuthentication();
  const [error, setError] = useState("");

  const HandleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user).then((w) => console.log(w));
      // navigation.navigate("Welcome");
      // Add a new document in collection "users"
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert(error.message);
    }
  };
  async function handleSignout() {
    await AsyncStorage.setItem("user", "");
    signOut(auth);
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.Heading}>HOME sweet Home</Text>
        {user && (
          <Text style={styles.GreetingUser}>signed in as:{user.email}</Text>
        )}
        <View>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignout}
          >
            <Text style={styles.signoutButtonText}>Signout</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.signOutButton} onPress={HandleDelete}>
            <Text style={styles.signoutButtonText}>delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({});
