import {
  View,
  TouchableOpacity,
  StyleSheet,
  screen,
  FlatList,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeNumbers } from "../redux/slice/timeSlice";
import {
  doc,
  updateDoc,
  deleteField,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function List({ selected }) {
  //data array of object representing runs
  const timeLeftTotal = useSelector((state) => state.time);
  const dispatch = useDispatch();

  async function handleDeleteItem(id) {
    dispatch(removeNumbers(id));
    const runRef = doc(db, "runs", selected);
    const docSnap = await getDoc(runRef);
    const list = docSnap.data();
    const runs = list.runs;
    const filtered = runs.filter((run) => run.id !== id);
    await updateDoc(runRef, {
      runs: filtered,
    });
  }

  const Item = ({ item }) => (
    <View style={styles.item} id={JSON.stringify(item.id)}>
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
      <Text style={styles.title}>Lista ( sec, activity, delete) </Text>
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
    marginBottom: 15,
  },
  title: {
    padding: 5,
  },
});
