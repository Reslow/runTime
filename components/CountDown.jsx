import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";

export default function Countdown({
  setShowCountdown,
  startAllTimers,
  timeLeftTotal,
}) {
  const [activeTimer, setActiveTimer] = useState(4);
  const [sound, setSound] = useState();

  useEffect(() => {
    startTimer();
  }, []);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound/554056__gronkjaer__clockbeep.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function startTimer() {
    let timer = 4;
    let intervalId = setInterval(() => {
      timer--;
      playSound();
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
