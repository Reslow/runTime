import { View, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
const screen = Dimensions.get("window");

export default function SelectNumber({ setNumbers, numbers, id }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [numbersForArr, setNumbersForArr] = useState([1, 2, 3]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
      items.push(i);
    }
    setNumbersForArr(items);
  }, []);

  const addObject = () => {
    const newState = numbers.map((obj) => {
      if (obj.id === id) {
        return { ...obj, number: selectedNumber };
      }
      return obj;
    });

    setNumbers(newState);
  };

  useEffect(() => {
    addObject();
  }, [selectedNumber]);
  return (
    <View
      style={{
        padding: 0,
        margin: 10,
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Picker
        style={{
          height: 80,
          width: screen.width / 3,
          color: "#000000",
          alignSelf: "center",
        }}
        selectedValue={selectedNumber}
        onValueChange={(itemValue, index) => setSelectedNumber(itemValue)}
      >
        {numbersForArr.length > 0 &&
          numbersForArr.map((num, i) => {
            return (
              <Picker.Item
                key={i}
                label={JSON.stringify(num)}
                value={JSON.stringify(num)}
                style={{
                  width: "100%",
                  color: "black",
                  fontSize: 36,
                  backgroundColor: "white",
                  fontStyle: "bold",
                }}
              />
            );
          })}
      </Picker>
    </View>
  );
}
