import { TextInput, StyleSheet } from "react-native";
import React from "react";

interface InputProps {
  onChange: (text: string) => void;
  nameInput: string;
  value: string | undefined;
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
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
