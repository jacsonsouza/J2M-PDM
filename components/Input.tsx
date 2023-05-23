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
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
    textAlign: "center",
    width: "93%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 5,
    marginLeft: 8
  },
});
