import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import ButtonApp from "../ButtonApp";

interface ModalFilterProps {
  selectOptions: string[];
  handleFilterData: (filterStatus: string) => void;
}

export default function ModalFilter({
  selectOptions,
  handleFilterData,
}: ModalFilterProps) {
  const [filterStatus, setFilterStatus] = useState("");

  return (
    <View>
      <SelectDropdown
        data={selectOptions}
        defaultButtonText="Progresso"
        onSelect={(value) => {
          setFilterStatus(value);
        }}
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
  buttonFilter: {
    alignSelf: "center",
  },
});
