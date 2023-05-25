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
          height: 200,
          width: "100%",
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
            backgroundColor: "#00000045",
          }}
        />
      </Picker>
    </View>
  );
}
