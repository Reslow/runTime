import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { useState } from "react";
export default function HistoryList({ user }) {
  const [listofData, setlistOfData] = useState([]);
  useEffect(() => {
    async function getDataFromDB() {
      const q = query(
        collection(db, "runs"),
        where("user", "==", "reslowf@gmail.com")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const res = doc.data();
        setlistOfData(res.runs);
      });
    }

    if (user) {
      console.log("user", user);
      getDataFromDB();
    }
    console.log(listofData);
  }, []);

  async function handleDeleteItem() {
    console.log("delete");
  }

  const Item = ({ item }) => (
    <View style={styles.item} id={JSON.stringify(item.id)}>
      <Text style={styles.title}>{item.activity} </Text>
      <Text style={styles.title}>{item.time}</Text>
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
        <Text>History</Text>
      </View>
      <FlatList
        data={listofData}
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
