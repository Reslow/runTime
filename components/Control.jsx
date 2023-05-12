import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SelectNumber from "./SelectNumber";
import SelectActivity from "./SelectActivity";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNumbers } from "../redux/slice/timeSlice";

const screen = Dimensions.get("window");

export default function Control() {
  const dispatch = useDispatch();

  const initialState = [
    {
      id: "a",
      number: 0,
    },
    {
      id: "b",
      number: 0,
    },
  ];

  const [numbers, setNumbers] = useState(initialState);
  const [activity, setActivity] = useState(null);
  const [totalSec, setTotalSec] = useState(60);

  useEffect(() => {
    setNumbers(initialState);
  }, []);

  useEffect(() => {
    getMinAndSec(numbers);
  }, [numbers, getMinAndSec]);

  function handleAdd() {
    const id = Math.floor(Math.random() * 10000);
    const resObj = {
      sec: totalSec,
      act: activity,
      id: id,
    };
    dispatch(addNumbers(resObj));
  }

  function getMinAndSec(numbers = [0, 1, 0, 0]) {
    const min = parseInt(numbers[0].number);
    const sec = parseInt(numbers[1].number);
    const totalSec = min * 60 + sec;
    setTotalSec(totalSec);
  }

  return (
    <View style={styles.container}>
      <View style={styles.controlNumber}>
        <SelectNumber setNumbers={setNumbers} numbers={numbers} id="a" />
        <Text style={{ fontSize: 36 }}>:</Text>
        <SelectNumber setNumbers={setNumbers} numbers={numbers} id="b" />
      </View>
      <View style={styles.controlAct}>
        <SelectActivity setActivity={setActivity} activity={activity} />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: "#000000",
    alignItems: "center",
    width: screen.width / 6,
    height: screen.width / 6,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
  },
  addBtnText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 45,
  },
  controlAct: {
    backgroundColor: "#00000045",
    color: "#000000",
    alignSelf: "center",
    width: "100%",
  },
  controlNumber: {
    backgroundColor: "#00000045",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "auto",
    width: "100%",
    alignSelf: "center",
  },

  container: { margin: 5 },
});
