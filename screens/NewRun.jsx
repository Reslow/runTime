import List from "../components/List";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Control from "../components/Control";
import { useAuthentication } from "../hooks/useAuthentication";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewRun = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [runIdState, setRunIdState] = useState(null);
  const { user } = useAuthentication();
  const timeLeftTotal = useSelector((state) => state.time);
  useEffect(() => {
    const runId = Math.floor(1000 + Math.random() * 10000);
    setRunIdState(runId);
  }, []);

  const handlePressRun = async () => {
    const dateTitle = new Date();
    const email = user.email;

    const data = {
      title: title.length > 0 ? title : dateTitle.toString(),
      user: email,
      runs: timeLeftTotal,
      totalTime: timeLeftTotal.reduce((accum, item) => accum + item.sec, 0),
      id: runIdState,
    };
    const savedUser = await AsyncStorage.getItem("user");
    if (savedUser.email === user.email) {
      AsyncStorage.setItem(
        "data",
        JSON.stringify({
          runId: {
            title: data.title,
            user: data.user,
            runs: data.runs,
            totalTime: data.totalTime,
            id: JSON.stringify(runIdState),
          },
        })
      );
    }
    // await setDoc(doc(db, "runs", JSON.stringify(runIdState)), {
    //   title: data.title,
    //   user: data.user,
    //   runs: data.runs,
    //   totalTime: data.totalTime,
    //   id: JSON.stringify(runIdState),
    // });

    navigation.navigate("RunList", { selectedId: runIdState });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.navContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={styles.navigationLink}
            >
              <Text style={styles.navigationLinkText}>back</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Create run</Text>
          <View style={styles.mainContainer}>
            <Control />
            <List />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={handlePressRun}
        >
          <Text style={[styles.buttonText, styles.primary]}>next</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  navigationLink: {
    top: 0,
    left: 0,
  },
  navigationLinkText: {
    fontFamily: "rub-mid",
    fontSize: 18,
    color: "#373634", //black
  },
  inputCon: {
    backgroundColor: "blue",
    width: "100%",
  },
  save: {
    backgroundColor: "#00000045",
    width: "100%",
    padding: 10,
  },
  saveControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 4,
    width: "100%",
    minWidth: "80%",
  },
  buttonText: {
    fontFamily: "rub-xbold",
    fontSize: 24,
    textAlign: "center",
  },
  primary: {
    color: "#ffffff", //White
    backgroundColor: "#373634", //black
  },
  title: {
    fontSize: 24,
    fontFamily: "rub-xbold",

    textAlign: "center",
  },
  topContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
  },
  mainContainer: {
    backgroundColor: "#AFF3C0", //green
  },
});

export default NewRun;
