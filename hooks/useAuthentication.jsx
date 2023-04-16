import { useState, useEffect } from "react";
import { auth } from "../firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuthentication() {
  const [user, setUser] = useState();
  const auth = getAuth();

  console.log("hook", auth);
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
