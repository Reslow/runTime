import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Hello = ({ navigation }) => {
  return (
    <View>
      <Text>Hello</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          title="Sign in"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Sign up"
          type="outline"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Hello;
