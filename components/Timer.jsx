import { View, Text, StyleSheet } from "react-native";
export default function Timer({ activeTimer, totalTime }) {
  return (
    <View style={styles.container}>
      <View style={styles.totalTimeCon}>
        <Text style={styles.title}>{totalTime ? totalTime : "n"} sec</Text>
      </View>
      <View style={styles.timeCon}>
        <Text style={styles.timerText}>
          {activeTimer.sec ? activeTimer.sec : "0"}
        </Text>
      </View>
      <View style={styles.actCon}>
        <Text style={styles.actText}>
          {activeTimer.act ? activeTimer.act : "--"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 20,
    borderRadius: "700",
    padding: 30,
    width: "80%",
  },
  timeCon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  totalTimeCon: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: "auto",
    width: "100%",
    alignSelf: "flex-start",
  },
  actCon: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  title: {
    color: "#373634",
    fontSize: 18,
    fontFamily: "rub-mid",
    marginHorizontal: 15,
  },

  timerText: {
    fontSize: 75,
    color: "#373634", //black
    textAlign: "center",
    fontFamily: "rub-bold",
    margin: 10,
  },

  actText: {
    fontSize: 45,
    color: "#373634", //black
    textAlign: "center",
    fontFamily: "rub-bold",
    margin: 10,
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
