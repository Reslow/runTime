import React, { useEffect, useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import UserStack from "./userStack";
import AuthStack from "./authStack";

export default function RootNavigation() {
  let { user, setUser } = useAuthentication();
  const [checkedUser, setCheckedUser] = useState(null);
  useEffect(() => {
    console.log("checked", checkedUser);
    setCheckedUser(user);
  }, [setUser]);

  return checkedUser === undefined || checkedUser === null ? (
    <AuthStack />
  ) : (
    <UserStack />
  );
}
