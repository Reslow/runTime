import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const userAuth = getAuth();
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [error, setError] = useState("");

  const HandleLogin = async () => {
    try {
      await signInWithEmailAndPassword(userAuth, email, pwd);
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Login</Text>
      <View>
        <Text style={styles.buttonText}>Dont have an Account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.link}
        >
          <Text>Signup</Text>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          title="Sign up"
          type="outline"
          buttonStyle={styles.button}
          onPress={HandleLogin}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
