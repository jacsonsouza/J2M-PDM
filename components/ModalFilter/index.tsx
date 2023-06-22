import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import ButtonApp from "../ButtonApp";
import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonIcon from "../ButtonIcon";

interface ModalFilterProps {
  modal: any;
  selectOptions: string[];
  handleFilterData: (filterStatus: string) => void;
}

export default function ModalFilter({
  modal,
  selectOptions,
  handleFilterData,
}: ModalFilterProps) {
  const [filterStatus, setFilterStatus] = useState("");
  selectOptions.unshift("Todos");
  return (
    <View style={styles.modal}>
      <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
        <ButtonIcon
          onPress={() => modal.hide()}
          icon={"close"}
          colorButton="#4b4b4b"
          colorIcon="white"
          widthButton={40}
        />
      </View>
      <Text style={styles.title}>
        Selecione o status que deseja para filtrar os serviços listados.
      </Text>
      <SelectDropdown
        data={selectOptions}
        defaultButtonText="Selecionar status"
        onSelect={(value) => {
          setFilterStatus(value);
        }}
        buttonStyle={styles.input}
        buttonTextStyle={{ fontSize: 16, padding: 0 }}
        dropdownIconPosition="right"
        renderDropdownIcon={() => (
          <Ionicons name="caret-down" size={16} color={"#4b4b4b"} />
        )}
      />
      <View style={styles.buttonFilter}>
        <ButtonApp
          title="Filtrar"
          onPress={() => handleFilterData(filterStatus)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    width: "100%",
    textAlign: "justify",
    marginBottom: 10,
  },
  buttonFilter: {
    alignSelf: "center",
    width: "100%",
  },
  input: {
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 16,
    padding: 2,
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 5,
  },
  modal: {
    backgroundColor: "#d4d4d4",
    width: "100%",
  },
});
