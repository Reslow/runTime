import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuthentication } from "../hooks/useAuthentication";
import {
  signOut,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";

const Home = ({ navigation }) => {
  const auth = getAuth();
  const { user } = useAuthentication();
  const [error, setError] = useState("");

  const HandleDelete = async () => {
    try {
      console.log(user);
      deleteUser(auth.currentUser);
      // navigation.navigate("Welcome");
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
