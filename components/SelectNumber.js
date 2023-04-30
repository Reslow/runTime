import { View, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
const screen = Dimensions.get("window");

export default function SelectNumber({ setNumbers, numbers, id }) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [numbersForArr, setNumbersForArr] = useState([]);

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
    <View style={{ padding: 0, margin: 0 }}>
      {/* pick Number of Time */}
      <Picker
        style={{
          height: 80,
          width: screen.width / 4,
          color: "#000000",
        }}
        selectedValue={selectedNumber}
        onValueChange={(itemValue, index) => setSelectedNumber(itemValue)}
      >
        {numbersForArr.length > 0 &&
          numbersForArr.map((num, i) => {
            return (
              <Picker.Item
                key={i}
                label={num}
                value={num}
                style={{
                  color: "black",
                  fontSize: 36,
                  backgroundColor: "red",
                  fontStyle: "bold",
                }}
              />
            );
          })}
      </Picker>
    </View>
  );
}
