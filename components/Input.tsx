import { TextInput, StyleSheet } from "react-native";
import React from "react";

interface InputProps {
  onChange: (text: string) => void;
  nameInput: string;
  value: string;
}

export default function Input({ onChange, nameInput, value }: InputProps) {
  return (
    <TextInput
      onChangeText={onChange}
      style={styles.input}
      placeholder={nameInput}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
  },
});
