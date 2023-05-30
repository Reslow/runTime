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
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound/554056__gronkjaer__clockbeep.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
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
    backgroundColor: "#000000",
    flex: 1,
    height: "100%",
  },
  countText: {
    fontSize: 155,
    color: "#373634",
    textAlign: "center",
    alignSelf: "center",
    margin: 10,
    position: "absolute",
    top: 0,
    left: 10,
  },
  textContainer: {
    borderColor: "#AFF3C0", //green
    borderWidth: 20,
    borderRadius: 700,
    alignItems: "center",
    width: 250,
    height: 250,
    position: "relative",
    alignSelf: "center",
  },
});
