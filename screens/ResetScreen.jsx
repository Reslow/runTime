import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

const userAuth = getAuth();
const ResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const HandleReset = async () => {
    try {
      await sendPasswordResetEmail(userAuth, email);
      setSuccess("email has been sent");
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
        onPress={() => navigation.navigate("Login")}
        style={styles.navigationLink}
      >
        <Text style={styles.navigationLinkText}>back</Text>
      </TouchableOpacity>
      <View style={styles.SignInContainer}>
        <Text style={[styles.h1]}>Reset Password</Text>
        <Text style={[styles.instructions]}>
          We will send futher instructions to your email
        </Text>
        <View style={styles.inputContainer}>
          <MaterialIcons name="mail-outline" size={24} color="#373634" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={HandleReset}
        >
          <Text style={[styles.buttonText, styles.primary]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetScreen;

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

  SignInContainer: {
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
