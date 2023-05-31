import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Timer from "../components/Timer";
import Countdown from "../components/CountDown";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

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

      if (timer < 3) {
        playSound();
        r;
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

  function reset() {
    setActive(false);
    setPaused(false);
    setTimeCon(timeLeftTotal);
    setActiveTimer(timeLeftTotal);
    clearInterval(id);
  }

  function startAllTimers(data, val = 0) {
    setPaused(false);
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
    <SafeAreaView>
      {showCountdown ? (
        <View style={styles.CountDownContainer}>
          <Countdown
            setShowCountdown={setShowCountdown}
            startAllTimers={startAllTimers}
            timeLeftTotal={timeLeftTotal}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RunList", { selectedId })}
              style={styles.navigationLink}
            >
              <Text style={styles.navigationLinkText}>back</Text>
            </TouchableOpacity>

            <Timer activeTimer={activeTimer} totalTime={totalTime} />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.timerControl}>
              {!paused ? (
                <View>
                  {!active ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => [setActive(true), setShowCountdown(true)]}
                    >
                      <Text>
                        <MaterialIcons
                          name="play-circle-outline"
                          size={70}
                          color="black"
                        />{" "}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => PauseTimer()}
                    >
                      <Text>
                        <MaterialIcons name="pause" size={70} color="black" />{" "}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View style={styles.panel}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => startAllTimers(timeCon)}
                  >
                    <Text>
                      <MaterialIcons
                        name="play-circle-outline"
                        size={70}
                        color="black"
                      />{" "}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => reset()}
                  >
                    <MaterialIcons name="replay" size={70} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.upNextCon}>
              <Text style={styles.upNextTitle}>up next</Text>
              {upComing ? (
                <View style={styles.upNextTimeCon}>
                  <Text style={styles.upNextTitle}> {upComing.sec} </Text>
                  <Text style={styles.upNextTitle}> {upComing.act} </Text>
                </View>
              ) : (
                <Text style={styles.upNextTitle}>Last set</Text>
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#AFF3C0", //green
    zIndex: 0,
  },
  topContainer: {
    backgroundColor: "#AFF3C0", //green
    height: "50%",
  },
  bottomContainer: {
    backgroundColor: "#ffffff", //green
    height: "50%",
  },

  navigationLink: {
    padding: 10,
  },
  navigationLinkText: {
    fontFamily: "rub-mid",
    fontSize: 18,
    color: "#373634", //black
  },
  timerControl: {
    backgroundColor: "#f6f6f6",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 70,
    width: "90%",
    marginHorizontal: "auto",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  panel: {
    backgroundColor: "#f6f6f6",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  upNextCon: { padding: 20 },
  upNextTitle: {
    fontSize: 24,
    fontFamily: "rub-mid",
  },

  upNextTimeCon: { display: "flex", flexDirection: "row" },
  CountDownContainer: {
    zIndex: 2,
    backgroundColor: "#000000",
    flex: 1,
    height: "100%",
  },
});

export default Run;
