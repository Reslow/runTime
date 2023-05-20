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
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../redux/slice/timeSlice";
import { useAuthentication } from "../hooks/useAuthentication";

export default function HistoryList() {
  const [listofData, setlistOfData] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const { user, setUser } = useAuthentication();
  useEffect(() => {
    console.log(user, "användare");
    console.log(listofData);
    console.log("check hhhhb");

    console.log(listofData[0]);
    if (listofData?.length > 0) {
      setShowSpinner(false);
    } else {
      console.log("ab");
      console.log(user);
      setShowSpinner(true);
    }
  }, [listofData]);

  useEffect(() => {
    console.log(showSpinner);
  }, [showSpinner]);

  useEffect(() => {
    async function getDataFromDB(email) {
      console.log(email);
      const q = query(collection(db, "runs"), where("user", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const res = doc.data();
        setlistOfData((prev) => [...prev, res]);
      });
    }

    console.log("abc");
    if (user !== null) {
      console.log("jiju", user);
      if (typeof user == Object) {
        getDataFromDB(data.email);
      } else {
        console.log(typeof user);
        getDataFromDB(JSON.parse(user).email);
      }
    }
    console.log("absc");
  }, [user]);

  async function handleDeleteItem() {
    console.log("delete");
  }

  const Item = ({ item }) => (
    <View
      style={styles.item}
      id={JSON.stringify(item.id)}
      onPress={() => dispatch(addList(item.runs))}
    >
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
