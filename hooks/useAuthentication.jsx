import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth();
export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("checking user in auth");
        // User is signed in.
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

  useEffect(() => {
    console.log("USER");
    console.log(user);
    console.log("USER");
  }, [user]);

  return {
    user,
    setUser,
  };
}
