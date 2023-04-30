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
    {
      id: "c",
      number: 0,
    },
    {
      id: "d",
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
    const resObj = {
      sec: totalSec,
      act: activity,
    };
    dispatch(addNumbers(resObj));
  }

  function getMinAndSec(numbers = [0, 1, 0, 0]) {
    const min = parseInt(numbers[0].number) * 10 + parseInt(numbers[1].number);
    const sec = parseInt(numbers[2].number) * 10 + parseInt(numbers[3].number);
    const totalSec = min * 60 + sec;
    setTotalSec(totalSec);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.presentNumbers}>
        {numbers[0].number}
        {numbers[1].number} : {numbers[2].number}
        {numbers[3].number}
      </Text>
      <Text style={styles.presentText}>{activity}</Text>
      <View style={styles.controlNumber}>
        <SelectNumber setNumbers={setNumbers} numbers={numbers} id="a" />
        <SelectNumber setNumbers={setNumbers} numbers={numbers} id="b" />
        <Text style={{ fontSize: 36 }}>:</Text>
        <SelectNumber setNumbers={setNumbers} numbers={numbers} id="c" />
        <SelectNumber setNumbers={setNumbers} numbers={numbers} id="d" />
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
    width: screen.width / 5,
    height: screen.width / 5,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  addBtnText: {
    color: "#ffffff",
    padding: 4,
    fontWeight: "bold",
    fontSize: 45,
  },
  container: {
    backgroundColor: "#AFF3C0",
  },
  controlAct: {
    backgroundColor: "#ffc0cb",
    color: "#000000",
    paddingBottom: 50,
    width: screen.width,
  },
  controlNumber: {
    backgroundColor: "#ffc0cb",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "auto",
    width: "100%",
    alignSelf: "center",
  },

  presentNumbers: {
    display: "flex",
    fontSize: 36,
    padding: 10,
    textAlign: "center",
  },
  presentText: {
    display: "flex",
    fontSize: 36,
    padding: 10,
    textAlign: "center",
  },
});
