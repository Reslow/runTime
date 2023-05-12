import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const formatNumbers = (number) => `0${number}`.slice(-2);
const getTimeLeft = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;

  return { mins: formatNumbers(mins), secs: formatNumbers(secs) };
};
const screen = Dimensions.get("window");

export default function Timer() {
  const [activeTimer, setActiveTimer] = useState({});
  const timeLeftTotal = useSelector((state) => state.time);
  const [timeCon, setTimeCon] = useState([]);
  const [id, setId] = useState([{}]);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

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
    setActive[false];
    setPaused(false);
    setTimeCon(timeLeftTotal);
    clearInterval(id);
  }

  function startAllTimers(data, val = 0) {
    const time = data;
    setTimeout(() => {
      startTimer(time[val], () => {
        val++;
        if (val < data.length) {
          startAllTimers(time, val);
        }
        if (val === data.length) {
          console.log("DOne");
        }
      });
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Text>total: {totalTime}</Text>
      <Text style={styles.TimerText}>{activeTimer.act}</Text>
      <Text>time : {activeTimer.sec}</Text>

      {!active ? (
        <TouchableOpacity onPress={() => startAllTimers(timeLeftTotal)}>
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
          <TouchableOpacity onPress={() => reset(timeCon)}>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create(
  { screen },
  {
    container: {
      backgroundColor: "blue",
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
      width: screen.width / 2,
      height: screen.width / 2,
      borderRadius: screen.width / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    resetButton: {
      borderColor: "#0000ff",
      borderWidth: 10,
      width: screen.width / 2,
      height: screen.width / 4,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#0000ff",
      padding: 4,
      fontSize: 45,
    },
  }
);
