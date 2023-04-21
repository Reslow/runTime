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

const userAuth = getAuth();
const ResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const HandleReset = async () => {
    try {
      await sendPasswordResetEmail(userAuth, email);
      setSuccess("email has been sent");
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text>Reset Password</Text>
      <View>
        <Text style={styles.buttonText}>back to </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.link}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          type="outline"
          buttonStyle={styles.button}
          onPress={HandleReset}
        >
          <Text>send link</Text>
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
