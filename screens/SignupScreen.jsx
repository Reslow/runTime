import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MaterialIcons } from "@expo/vector-icons";

const auth = getAuth();

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [error, setError] = useState("");

  const HandleSignup = async () => {
    try {
      console.log("auth sign up", auth, email, pwd);
      const user = await createUserWithEmailAndPassword(auth, email, pwd);

      // Add a new document in collection "users"
      await setDoc(doc(db, "users", user.user.uid), {
        email: user.user.email,
      });

      navigation.navigate("Login");
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="">
      <TouchableOpacity
        onPress={() => navigation.navigate("Hello")}
        style={styles.navigationLink}
      >
        <Text style={styles.navigationLinkText}>back</Text>
      </TouchableOpacity>
      <View style={styles.SignUpContainer}>
        <Text style={[styles.h1]}>Sign up</Text>
        <View style={styles.switchToSignUpContainer}>
          <Text style={styles.subHeading}>Already have an Account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={styles.subHeadingLink}
          >
            <Text style={styles.subHeadingLink}>SignIn</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="mail-outline" size={24} color="#373634" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={24} color="#373634" />
          <TextInput
            placeholder="Password"
            value={pwd}
            onChangeText={(text) => setPWD(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={HandleSignup}
        >
          <Text style={[styles.buttonText, styles.primary]}>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", //white
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
  },
  navigationLink: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  navigationLinkText: {
    fontFamily: "rub-mid",
    fontSize: 18,
    color: "#373634", //black
  },

  SignUpContainer: {
    width: "80%",
    backgroundColor: "#f6f6f6", //grey
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },

  h1: {
    fontFamily: "rub-xbold",
    fontSize: 36,
    color: "#373634", //black
  },
  switchToSignUpContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
  },

  subHeading: {
    color: "#373634", //black
    fontFamily: "rub-mid",
  },

  subHeadingLink: {
    color: "#373634", //black
    fontFamily: "rub-bold",
  },

  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    width: "90%",
    marginHorizontal: 5,
    fontFamily: "rub-mid",
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

  resetlink: {
    alignSelf: "flex-end",
    margin: 5,
  },
  resetlinkText: {
    fontFamily: "rub-mid",
  },
});
