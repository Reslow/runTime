import React, { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigation() {
  const [user, setUser] = useState(null);

  let userAuth = useAuthentication();
  let auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user !== null) {
        // User is signed in.
        setUser(userAuth);
      } else {
        // No user is signed in.
        AsyncStorage.getItem("user").then((usr) => setUser(usr));
      }
    });
  }, []);

  return user ? <UserStack /> : <AuthStack />;
}
