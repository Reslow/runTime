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
          marginBottom: 15,
          backgroundColor: "#00000020",
        }}
        selectedValue={selectedActivity}
        onValueChange={(itemValue, itemIndex) => setSelectedActivity(itemValue)}
      >
        <Picker.Item label="Walk" value="Walk" backgroundColor="yellow" />
        <Picker.Item label="Run" value="Run" />
      </Picker>
    </View>
  );
}
