import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Timer from "../components/Timer";

const CreateInterval = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> React Native Timer</Text>
      <Timer />
    </View>
  );
};
const styles = StyleSheet.create({});

export default CreateInterval;
