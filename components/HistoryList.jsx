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
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";

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
      const a = getAuth();
      console.log("check", user, "checka", a);
      if (typeof user === "") {
        console.log("AAAAA");
        const res = getDataFromDB(JSON.parse(user).email);
        console.log(res, "response");
      } else {
        console.log("BBBB");
        let res = getDataFromDB(user.email);
        console.log(res, "response");
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
      <TouchableOpacity onPress={() => handleSelect(item.runs, item.id)}>
        <Text>
          <MaterialIcons name="arrow-right" size={28} color="black" />
        </Text>
      </TouchableOpacity>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text>{item.runs?.length}</Text>
      <TouchableOpacity
        style={styles.title}
        onPress={() => handleDeleteItem(item.id)}
      >
        <MaterialIcons name="delete" size={28} color="black" />
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
        keyExtractor={(item, i) => item.id + i}
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
