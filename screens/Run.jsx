import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Timer from "../components/Timer";
import Countdown from "../components/CountDown";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";

const Run = ({ route, navigation }) => {
  const [sound, setSound] = useState();
  const [showCountdown, setShowCountdown] = useState(false);
  const [activeTimer, setActiveTimer] = useState({});
  const timeLeftTotal = useSelector((state) => state.time);
  const [timeCon, setTimeCon] = useState([]);
  const [id, setId] = useState([{}]);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [upComing, setUpComing] = useState([]);
  const { selectedId } = route.params;

  useEffect(() => {
    var total = timeLeftTotal.reduce((accum, item) => accum + item.sec, 0);
    setTotalTime(total);
  }, [timeLeftTotal]);

  function startTimer(data, callback) {
    let timer = data.sec;
    let intervalId = setInterval(() => {
      setActiveTimer({ act: data.act, id: data.id, sec: timer });
      setTimeCon({ act: data.act, id: data.id, sec: timer });
      timer--;

      if (timer < 4) {
        playSound();
      }
      if (timer < 0) {
        clearInterval(intervalId);
        setTimeCon([]);
        callback();
      }
    }, 1000);
    setId(intervalId);
  }

  function PauseTimer() {
    setPaused(true);
    setTimeCon([activeTimer]);
    clearInterval(id);
  }
  useEffect(() => {
    console.log("up", upComing);
  }, [upComing]);

  function reset() {
    setActive(false);
    setPaused(false);
    setTimeCon(timeLeftTotal);
    setActiveTimer(timeLeftTotal);
    clearInterval(id);
  }

  function startAllTimers(data, val = 0) {
    const time = data;
    setTimeout(() => {
      setUpComing(time[val + 1]);
      startTimer(time[val], () => {
        val++;
        if (val < data.length) {
          startAllTimers(time, val);
        }
        if (val === data.length) {
          setActive(false);
          setUpComing([]);
        }
      });
    }, 1000);
  }

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
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("RunList", { selectedId })}
        style={styles.navigationLink}
      >
        <Text style={styles.navigationLinkText}>back</Text>
      </TouchableOpacity>

      {showCountdown && (
        <View style={styles.CountDownContainer}>
          <Text>CountDown</Text>
          <Countdown
            setShowCountdown={setShowCountdown}
            startAllTimers={startAllTimers}
            timeLeftTotal={timeLeftTotal}
          />
        </View>
      )}

      <View>
        <Timer activeTimer={activeTimer} totalTime={totalTime} />
        {!active ? (
          <TouchableOpacity
            onPress={() => [setActive(true), setShowCountdown(true)]}
          >
            <Text>start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => PauseTimer()}>
            <Text>Paus</Text>
          </TouchableOpacity>
        )}

        {active && paused && (
          <View>
            <TouchableOpacity onPress={() => startAllTimers(timeCon)}>
              <Text>Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => reset()}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View>
        <Text>UPCOMING</Text>
        {upComing ? (
          <View>
            <Text> {upComing.sec} </Text>
            <Text> {upComing.act} </Text>
          </View>
        ) : (
          <Text>Last set</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 25,
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
