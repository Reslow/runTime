import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import src from "../assets/logoWText.png";
const Hello = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={src} style={{ width: 150, height: 30 }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.h1, styles.heading]}>Hello friend</Text>
        <Text style={[styles.body, styles.information]}>
          I will assist you with setting intervals when running and give you the
          signal between interval training.
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          title="Sign up"
          style={[styles.button, styles.primary]}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={[styles.buttonText, styles.primary]}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="Sign in"
          style={[styles.button, styles.secondary]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.buttonText, styles.secondary]}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    position: "absolute",
    bottom: 40,
    width: "80%",
  },

  button: {
    flex: 1,
    margin: "auto",
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 4,
  },

  buttonText: {
    textAlign: "center",
    fontFamily: "rub-xbold",
    fontSize: 24,
  },

  primary: {
    backgroundColor: "#373634", //black
    color: "#ffffff", //White
  },

  secondary: {
    backgroundColor: "#AFF3C0", //green
    color: "#373634", //black
  },

  h1: {
    fontFamily: "rub-xbold",
    fontSize: 36,
    color: "#373634", //black
  },
  body: {
    fontFamily: "rub-mid",
    fontSize: 16,
    color: "#373634", //black
  },
  heading: {
    textAlign: "center",
  },
  information: {
    marginTop: 15,
    textAlign: "center",
  },
  imageContainer: {
    padding: 4,
    position: "absolute",
    top: 50,
  },
  textContainer: {
    padding: 20,
    justifyContent: "space-between",
    position: "absolute",
    top: 200,
  },
});

export default Hello;
