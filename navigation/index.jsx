import React, { useState } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function RootNavigation() {
  let { user } = useAuthentication();
  console.log("index", user);

  return user === undefined || user === null ? <AuthStack /> : <UserStack />;
}
