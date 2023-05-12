import { View, Text, StyleSheet } from "react-native";
export default function Timer({ activeTimer, totalTime }) {
  return (
    <View style={styles.container}>
      <Text>total: {totalTime}</Text>
      <Text style={styles.TimerText}>{activeTimer.act}</Text>
      <Text>time : {activeTimer.sec}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 40,
  },
  TimerText: {
    fontSize: 45,
    color: "#ffc0cb",
    textAlign: "center",
  },
  button: {
    borderColor: "#0000ff",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    borderColor: "#0000ff",
    borderWidth: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#0000ff",
    padding: 4,
    fontSize: 45,
  },
});
