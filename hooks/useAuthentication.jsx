import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();
export function useAuthentication() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      console.log("check", user, "check");
      if (user) {
        // User is signed in.
        console.log("YEP");

        setUser(user);
        // ...
      } else {
        console.log("NO");

        // User is signed out.

        AsyncStorage.getItem("user").then((i) => setUser(i));
      }
      // ...
    });
  }, []);

  return {
    user,
  };
}
