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
    <View>
      <Picker
        style={{
          height: 70,
          width: screen.width / 4,
          display: "flex",
          marginHorizontal: 20,
          color: "#000000",
          backgroundColor: "#00000045",
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
                  width: "50%",
                  color: "white",
                  fontSize: 18,
                  backgroundColor: "#00000045",
                  margin: 5,
                }}
              />
            );
          })}
      </Picker>
    </View>
  );
}
