import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuthentication() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      // try {
      // const saved = AsyncStorage.getItem("user").then((item) =>
      // JSON.parse(item)
      // );
      // if (saved !== null) {
      //   setUser(saved);
      // } else {
      setUser(null);
      // }
      // } catch (error) {
      //   console.log(error);
      // }
    }
    return user;
  });

  return {
    setUser,
    user,
  };
}
