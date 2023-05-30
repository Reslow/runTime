import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();
export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        // ...
      } else {
        // User is signed out.
        AsyncStorage.getItem("user").then((i) => setUser(JSON.parse(i)));
      }
      // ...
    });
  }, []);

  return {
    user,
    setUser,
  };
}
