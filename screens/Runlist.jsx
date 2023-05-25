import List from "../components/List";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Runlist = ({ route, navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const { user } = useAuthentication();
  const timeLeftTotal = useSelector((state) => state.time);

  const { selectedId } = route.params;

  const toggleSwitch = () => setIsActive((previousState) => !previousState);

  const handlePressRun = async () => {
    if (isActive) {
      const dateTitle = new Date();
      const runId = Math.floor(1000 + Math.random() * 10000);
      const email = user.email;

      const data = {
        title: title.length > 0 ? title : dateTitle.toString(),
        user: email,
        runs: timeLeftTotal,
        totalTime: timeLeftTotal.reduce((accum, item) => accum + item.sec, 0),
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
            },
          })
        );
      }
      await setDoc(doc(db, "runs", JSON.stringify(runId)), {
        title: data.title,
        user: data.user,
        runs: data.runs,
        totalTime: data.totalTime,
      });
    }
    navigation.navigate("Run");
  };

  useEffect(() => {
    console.log(timeLeftTotal);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.navigationLink}
        >
          <Text style={styles.navigationLinkText}>back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Run</Text>
        <List selected={selectedId} />
        <View style={styles.save}>
          <View style={styles.saveControl}>
            <Text>save to profile?</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isActive}
            />
          </View>

          {isActive && (
            <View style={styles.inputCon}>
              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
                required
              />
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.primary]}
        onPress={handlePressRun}
      >
        <Text style={[styles.buttonText, styles.primary]}>Run</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  navContainer: {},
  navigationLink: {
    top: 50,
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
    textAlign: "center",
    fontFamily: "rub-xbold",
    fontSize: 24,
  },
  primary: {
    color: "#ffffff", //White
    backgroundColor: "#373634", //black
  },
  title: { textAlign: "center", fontSize: 36, fontFamily: "rub-xbold" },
});

export default Runlist;
