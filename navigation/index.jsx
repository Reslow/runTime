import React, { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import UserStack from "./userStack";
import AuthStack from "./authStack";

export default function RootNavigation() {
  let { user } = useAuthentication();
  console.log("user index");
  console.log(user);
  console.log("user index");

  return user === undefined || user === null ? (
    <AuthStack />
  ) : (
    <UserStack user={user} />
  );
}
