import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../../components/Header";
import ButtonIcon from "../../../components/ButtonIcon";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function index() {
  const [search, setSearch] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.search}>
        <TextInput
          onChangeText={setSearch}
          style={styles.input}
          placeholder="Buscar..."
          value={search}
        />
        <ButtonIcon
          onPress={() => {}}
          icon="search"
          colorIcon={"white"}
          colorButton={"black"}
          widthButton={50}
          size={30}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    backgroundColor: "#d4d4d4",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
    alignItems: "center",
  },

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
