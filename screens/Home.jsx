import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuthentication } from "../hooks/useAuthentication";
import { signOut, deleteUser, getAuth } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

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

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>HOME sweet Home</Text>
      {user && (
        <Text style={styles.GreetingUser}>signed in as:{user.email}</Text>
      )}
      <View>
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => signOut(auth)}
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
  );
};

export default Home;
const styles = StyleSheet.create({});
