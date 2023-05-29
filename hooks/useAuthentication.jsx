import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();
export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("checking user in auth");
        console.log("checking user in auth");
        // User is signed in.
        setUser(user);
        // ...
      } else {
        console.log("NO");
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
