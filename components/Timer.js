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

  useEffect(() => {
    setTimeLeft(timeLeftTotal[0] ? timeLeftTotal[0].sec : 0);
  }, [timeLeftTotal]);

  useEffect(() => {
    console.log("TIMECON", timeCon);
  }, [timeCon]);
  useEffect(() => {
    console.log("active", activeTimer);
  }, [activeTimer]);

  function startTimer(data, callback) {
    console.log("DATA", data);
    let timer = data.sec;
    let intervalId = setInterval(() => {
      timer--;
      setActiveTimer({ act: data.act, id: data.id, sec: timer });
      setTimeCon({ act: data.act, id: data.id, sec: timer });
      console.log("TIME", timer);
      if (timer < 0) {
        clearInterval(intervalId);
        setTimeCon([]);

        callback();
      }
    }, 1000);
    setId(intervalId);
  }

  function PauseTimer() {
    console.log("r", activeTimer);
    setTimeCon([activeTimer]);
    clearInterval(id);
  }

  function startAllTimers(data) {
    console.log("START", data);
    const time = data;
    time.forEach((timer) => {
      console.log(timer);
      setDisplayTime(timer?.sec);
      startTimer(timer, () => {
        console.log("2", timer.sec);
        console.log(`${timer.act} has finished!`);
      });
    });
  }

  return (
    <View style={styles.container}>
      <Text>SET TIME</Text>
      <Text style={styles.TimerText}>{`${mins}:${secs}`}</Text>
      <Text style={styles.TimerText}>{`${JSON.stringify(
        timeLeftTotal
      )} `}</Text>
      <Text>time : {displayTime && displayTime.sec}</Text>

      <Control />
      <TouchableOpacity onPress={() => startAllTimers(timeLeftTotal)}>
        <Text>start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => PauseTimer()}>
        <Text>Paus</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => startAllTimers(timeCon)}>
        <Text>Resume</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create(
  { screen },
  {
    container: {
      backgroundColor: "#a9a9a9",
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
