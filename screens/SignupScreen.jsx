import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [pwdControl, setPWDControl] = useState("");

  const HandleSignup = () => {
    createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Sign up</Text>
      <View>
        <Text style={styles.buttonText}>Already Have An account? </Text>
        <TouchableOpacity onPress={() => console.log("")} style={styles.link}>
          <Text>Sign in </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={pwd}
          onChangeText={(text) => setPWD(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Password again"
          value={pwdControl}
          onChangeText={(text) => setPWDControl(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={HandleSignup}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
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
  },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#373634",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: "#ffffff",
    marginTop: 5,
    borderColor: "#373634",
    borderWidth: "2",
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    textAlign: "center",
    color: "#373634",
    fontWeight: "700",
    fontSize: 16,
  },
});
