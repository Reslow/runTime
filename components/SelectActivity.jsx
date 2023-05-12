import { View, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
export default function selectedActivity({ setActivity }) {
  const [selectedActivity, setSelectedActivity] = useState("Walk");

  useEffect(() => {
    setActivity(selectedActivity);
  }, [selectedActivity]);

  return (
    <View>
      {/* pickActivity */}
      <Picker
        style={{
          height: 50,
          width: "90%",
          display: "flex",
          alignSelf: "center",
          padding: 6,
          marginTop: 0,
          marginHorizontal: "auto",
          color: "#000000",
          backgroundColor: "#00000045",
        }}
        selectedValue={selectedActivity}
        onValueChange={(itemValue, itemIndex) => setSelectedActivity(itemValue)}
      >
        <Picker.Item
          label="Walk"
          value="Walk"
          style={{
            color: "black",
            fontSize: 18,
            fontStyle: "bold",
            backgroundColor: "#00000045",
          }}
        />
        <Picker.Item
          label="Run"
          value="Run"
          style={{
            color: "black",
            fontSize: 18,
            fontStyle: "bold",
            backgroundColor: "#00000045",
          }}
        />
      </Picker>
    </View>
  );
}