import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import Control from "./Control";
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
  const timeLeftTotal = useSelector((state) => state.addNumbers);
  const [timeLeft, setTimeLeft] = useState(timeLeftTotal);
  const [displayTime, setDisplayTime] = useState(timeLeftTotal);
  const [timeCon, setTimeCon] = useState([]);
  const { mins, secs } = getTimeLeft(timeLeft);
  const [id, setId] = useState([{}]);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(timeLeftTotal[0] ? timeLeftTotal[0].sec : 0);
  }, [timeLeftTotal]);

  useEffect(() => {
    setDisplayTime(timeCon);
  }, [timeCon]);
  useEffect(() => {
    console.log("active", activeTimer);
  }, [activeTimer]);

  function startTimer(data, callback) {
    let timer = data.sec;
    let intervalId = setInterval(() => {
      timer--;
      setDisplayTime(timer);
      setActiveTimer({ act: data.act, id: data.id, sec: timer });
      setTimeCon({ act: data.act, id: data.id, sec: timer });

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

  function startAllTimers(data) {
    setActive(true);
    setPaused(false);
    const time = data;
    time.forEach((timer) => {
      setDisplayTime(timer);
      startTimer(timer, () => {
        setActive(false);
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TimerText}>{`${mins}:${secs}`}</Text>
      <Text style={styles.TimerText}>{displayTime.sec}</Text>
      <Text>time : {displayTime && displayTime.sec}</Text>

      <Control />
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
