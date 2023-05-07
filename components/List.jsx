import {
  View,
  TouchableOpacity,
  StyleSheet,
  screen,
  FlatList,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeNumbers } from "../redux/slice/timeSlice";
export default function List() {
  //data array of object representing runs
  const timeLeftTotal = useSelector((state) => state.time);
  const dispatch = useDispatch();
  console.log(timeLeftTotal);
  function handleDeleteItem(id) {
    dispatch(removeNumbers(id));
    console.log("total", timeLeftTotal);
  }
  const Item = ({ item }) => (
    <View style={styles.item} id={JSON.stringify(item.id)}>
      {console.log(item)}
      <Text style={styles.title}>{item.sec} </Text>
      <Text style={styles.title}>{item.act}</Text>
      <TouchableOpacity
        style={styles.title}
        onPress={() => handleDeleteItem(item.id)}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View>
        <Text>LISTA</Text>
      </View>
      <FlatList
        data={timeLeftTotal && timeLeftTotal}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
