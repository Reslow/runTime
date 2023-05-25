import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../redux/slice/timeSlice";
import { useAuthentication } from "../hooks/useAuthentication";

export default function HistoryList({ navigation }) {
  const [listofData, setlistOfData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const { user, setUser } = useAuthentication();

  useEffect(() => {
    console.log(showSpinner);
  }, [showSpinner]);

  useEffect(() => {
    async function getDataFromDB(email) {
      const q = query(collection(db, "runs"), where("user", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const res = doc.data();
        setlistOfData((prev) => [...prev, res]);
      });
      setShowSpinner(false);
    }

    if (user !== null) {
      if (typeof user === "") {
        getDataFromDB(JSON.parse(user).email);
      } else {
        getDataFromDB(user.email);
      }
    }
  }, [user]);

  async function handleDeleteItem(id) {
    console.log("<SEL", id);
    console.log(listofData);
    await deleteDoc(doc(db, "runs", selected));
  }

  const Item = ({ item }) => (
    <View style={styles.item} id={JSON.stringify(item.id)}>
      <TouchableOpacity>
        <Text
          onPress={() => [
            dispatch(addList(item.runs)),
            setSelected(JSON.parse(item.id)),
            navigation(),
          ]}
        >
          select
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.runs?.length}</Text>
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
        {listofData.length === 0 && <Text>no data yet</Text>}
      </View>
      {showSpinner === true && (
        <View>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>getting your data</Text>
        </View>
      )}
      <FlatList
        data={listofData}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.title}
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
