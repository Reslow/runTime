import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "../redux/store";
import Home from "../screens/Home";
import Run from "../screens/Run";
import NewRun from "../screens/NewRun";
import Runlist from "../screens/Runlist";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();

export default function UserStack({ user }) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* //startsida// */}
          <Stack.Screen name="Home" component={Home} user={user} />
          {/* //skapa intervaler/löprundor// */}
          <Stack.Screen name="New" component={NewRun} />
          {/* //köra intervaler/löprundor// */}
          <Stack.Screen name="Run" component={Run} />
          <Stack.Screen name="RunList" component={Runlist} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
