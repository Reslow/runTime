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

export default function HistoryList({ navigationToRun, navigationToHome }) {
  const [listofData, setlistOfData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const dispatch = useDispatch();
  const { user, setUser } = useAuthentication();

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
    await deleteDoc(doc(db, "runs", id));
    navigationToHome();
  }
  async function handleSelect(runs, id) {
    dispatch(addList(runs));
    navigationToRun(id);
  }

  const Item = ({ item }) => (
    <View style={styles.item} id={JSON.stringify(item.id)}>
      <TouchableOpacity>
        <Text onPress={() => handleSelect(item.runs, item.id)}>select</Text>
      </TouchableOpacity>
      <Text style={styles.itemTitle}>{item.title}</Text>
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
      <Text style={styles.heading}>History</Text>
      <View style={styles.headingsContainer}>
        <Text style={styles.title}>select</Text>
        <Text style={styles.title}>title</Text>
        <Text style={styles.title}>runs</Text>
        <Text style={styles.title}>Delete</Text>
      </View>

      {listofData.length === 0 && <Text>no data yet</Text>}

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
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  container: {
    backgroundColor: "#AFF3C0", //green
    margin: 20,
    padding: 5,
    height: "60%",
  },
  heading: {
    textAlign: "flexStart",
    fontFamily: "rub-bold",
    fontSize: 24,
  },
  headingsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },

  title: {
    fontFamily: "rub-bold",
  },
});
