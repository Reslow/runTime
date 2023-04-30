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
  const timeLeftTotal = useSelector((state) => state.addNumbers);
  const [timeLeft, setTimeLeft] = useState(timeLeftTotal);
  const { mins, secs } = getTimeLeft(timeLeft);

  useEffect(() => {
    setTimeLeft(timeLeftTotal[0] ? timeLeftTotal[0].sec : 0);
  }, [timeLeftTotal]);

  function startTimer(duration, callback) {
    let timer = duration;
    let intervalId = setInterval(() => {
      console.log(timer);
      timer--;
      if (timer < 0) {
        clearInterval(intervalId);
        callback();
      }
    }, 1000);
  }

  function startAllTimers() {
    console.log("hellu");
    const time = timeLeftTotal;

    time.forEach((timer) => {
      console.log(`Starting ${timer.sec}...`);
      startTimer(timer.sec, () => {
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

      <Control />
      <TouchableOpacity onPress={() => startAllTimers()}>
        <Text>Klick</Text>
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
