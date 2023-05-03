import { Slot, SplashScreen } from "expo-router";
import React from "react";

import firebaseConfig from "../config/firebaseConfig";
import useFirebase from "../hooks/useFirebase";

export default function _layout() {
  const firebase = useFirebase(firebaseConfig);

  if (!firebase) {
    return <SplashScreen />;
  }

  return <Slot />;
}
