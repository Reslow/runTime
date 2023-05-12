import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

export default function Countdown({
  setShowCountdown,
  startAllTimers,
  timeLeftTotal,
}) {
  const [activeTimer, setActiveTimer] = useState(4);

  useEffect(() => {
    startTimer();
  }, []);

  function startTimer() {
    let timer = 4;
    let intervalId = setInterval(() => {
      timer--;
      console.log(timer);
      setActiveTimer(timer);
      if (timer === 0) {
        clearInterval(intervalId);
        setShowCountdown(false);
        startAllTimers(timeLeftTotal);
      }
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.countText}> {activeTimer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000045",
    flex: 1,
  },
  countText: {
    fontSize: 155,
    color: "#ffc0cb",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    letterSpacing: -20,
  },
  textContainer: {
    borderColor: "black",
    borderWidth: 20,
    borderRadius: 1000,
    alignItems: "center",
    width: 250,
    height: 250,
    marginHorizontal: "auto",
    alignSelf: "center",
  },
});
