import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuthentication() {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      setUser(user);
    } else {
      try {
        AsyncStorage.getItem("user").then((saved) =>
          setUser(JSON.parse(saved))
        );
      } catch (error) {
        setUser(null);
      }
    }
  });

  return {
    user,
    setUser,
  };
}
