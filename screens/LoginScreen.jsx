import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const userAuth = getAuth();
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [user, setUser] = useState(undefined);

  const HandleLogin = async () => {
    try {
      const currentUser = await signInWithEmailAndPassword(
        userAuth,
        email,
        pwd
      ).then((usr) => {
        setUser(usr);
        console.log(usr, "CHECK USR");
        if (usr !== undefined || usr !== null) {
          AsyncStorage.setItem("user", JSON.stringify(usr));
        }
      });
    } catch (error) {
      console.log(error);
      alert(error.messrage);
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
      <View style={styles.SignInContainer}>
        <Text style={[styles.h1]}>Login</Text>
        <View style={styles.switchToSignUpContainer}>
          <Text style={styles.subHeading}>Dont have an Account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.subHeadingLink}
          >
            <Text style={styles.subHeadingLink}>Signup</Text>
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

        <TouchableOpacity
          onPress={() => navigation.navigate("Reset")}
          style={styles.resetlink}
        >
          <Text style={styles.resetlinkText}>reset password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={HandleLogin}
        >
          <Text style={[styles.buttonText, styles.primary]}>Login</Text>
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
