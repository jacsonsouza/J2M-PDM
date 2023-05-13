import {
  StyleSheet,
  TextInput,
  Alert,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePickerApp from "../../../components/DatePickerApp";
import MaskInput, { Masks } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";
import ButtonApp from "../../../components/ButtonApp";
import Header from "../../../components/Header";
import Services from "../../../types/Services";
import React, { useState } from "react";

import useCollection from "../../../hooks/useCollection";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "expo-router";

export default function App() {
  const { user } = useAuth();
  const { data, create, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [currencyBrl, setCurrencyBrl] = useState("");
  const [days, setDays] = useState(0);
  const [datePicker, setDate] = useState(new Date());
  const router = useRouter();

  const confirmation = async () => {
    refreshData();
    await create({
      serviceNumber: data.length + 1,
      client: client,
      description: description,
      price: currencyBrl,
      dateStart: datePicker.toISOString(),
      daysWarranty: days,
      status: "trabalhando",
    });

    Alert.alert("Serviço cadastrado!");
    router.push("/");
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#d4d4d4" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header />
          <TextInput
            style={styles.inputText}
            onChangeText={setClient}
            placeholder="Cliente"
            value={client}
          />
          <TextInput
            style={styles.inputText}
            onChangeText={setDescription}
            placeholder="Serviço"
            value={description}
            multiline={true}
          />
          <MaskInput
            value={currencyBrl}
            onChangeText={setCurrencyBrl}
            mask={Masks.BRL_CURRENCY}
            style={styles.inputText}
            keyboardType="numeric"
          />
          <View style={styles.warranty}>
            <Text>Garantia de </Text>
            <NumericInput
              type="up-down"
              onChange={setDays}
              minValue={0}
              inputStyle={styles.inputNumeric}
              containerStyle={{ marginBottom: 15 }}
            />
            <Text> dias</Text>
          </View>
          <DatePickerApp date={datePicker} setDate={setDate} />
          <ButtonApp onPress={confirmation} title="Cadastrar" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  avoidView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
    alignItems: "center",
  },
  inputText: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  warranty: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inputWarranty: {
    height: 40,
    width: 130,
    marginBottom: 12,
    marginRight: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
  },
  inputNumeric: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
