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
import React, { useEffect, useState } from "react";

import useCollection from "../../../hooks/useCollection";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "expo-router";
import axios from "axios";
import Brand from "../../../types/Brand";
import SelectDropdown from "react-native-select-dropdown";
import api from "../../../src/services/api";

export default function App() {
  const { user } = useAuth();
  const { data, create, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  const [objectBrands, setObjectBrands] = useState<Brand[]>([]);

  const stringBrands: string[] = [];

  objectBrands.forEach((value) => {
    stringBrands.push(value.nome);
  });

  useEffect(() => {
    api
      .get("/fipe/api/v1/carros/marcas")
      .then((response) => {
        setObjectBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [currencyBrl, setCurrencyBrl] = useState("");
  const [brand, setBrand] = useState("");
  const [days, setDays] = useState(0);
  const [datePicker, setDate] = useState(new Date());
  const router = useRouter();

  const handleRegister = async () => {
    refreshData();
    await create({
      serviceNumber: data.length + 1,
      client: client,
      description: description,
      price: currencyBrl,
      dateStart: datePicker.toISOString(),
      daysWarranty: days,
      status: "inProgress",
    });
    console.log(brand);
    Alert.alert("Serviço cadastrado!", "", [
      {
        text: "Ok",
        onPress: () => router.push("/"),
      },
    ]);
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
          <SelectDropdown
            search={true}
            data={stringBrands}
            onSelect={() => setBrand}
            defaultButtonText={"Marcas"}
            buttonStyle={{
              borderStyle: "solid",
              borderRadius: 10,
              borderWidth: 2,
              alignSelf: "center",
            }}
          />
          <Text>Garantia (em dias): </Text>
          <NumericInput
            type="up-down"
            onChange={setDays}
            minValue={0}
            inputStyle={styles.inputNumeric}
            containerStyle={{ marginBottom: 15 }}
          />

          <DatePickerApp date={datePicker} setDate={setDate} />
          <ButtonApp onPress={handleRegister} title="Cadastrar" />
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
