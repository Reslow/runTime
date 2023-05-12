import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Timer from "../components/Timer";

const Run = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.navigationLink}
      >
        <Text style={styles.navigationLinkText}>back</Text>
      </TouchableOpacity>
      <Timer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
  },

  navContainer: {},
  navigationLink: {
    left: 0,
  },
  navigationLinkText: {
    fontFamily: "rub-mid",
    fontSize: 18,
    color: "#373634", //black
  },
});

export default Run;
