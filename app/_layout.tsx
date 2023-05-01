import { View, Text } from "react-native";
import { Slot, SplashScreen } from "expo-router";
import React from "react";
import useFirebase from "../hooks/useFirebase";
import firebaseConfig from "../config/firebaseConfig";

export default function _layout() {
  const firebase = useFirebase(firebaseConfig);

  if (!firebase) {
    return <SplashScreen />;
  }

  return <Slot />;
}
