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

  const handleRegister = async () => {
    await create({
      serviceNumber: data.length + 1,
      client: client,
      description: description,
      price: currencyBrl,
      dateStart: datePicker.toISOString(),
      daysWarranty: days,
      status: "inProgress",
    });
    refreshData();

    Alert.alert("Serviço cadastrado! ", "", [
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
          <Text style={styles.label}>Cliente</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setClient}
            placeholder="Nome do Cliente"
            value={client}
          />
          <Text style={styles.label}>Serviço</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={setDescription}
            placeholder="Descrição do serviço prestado"
            value={description}
            multiline={true}
          />
          <Text style={styles.label}>Valor do serviço</Text>
          <MaskInput
            value={currencyBrl}
            onChangeText={setCurrencyBrl}
            mask={Masks.BRL_CURRENCY}
            style={styles.inputText}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Dias de Garantia</Text>
          <View style={styles.warranty}>
            <NumericInput
              onChange={setDays}
              minValue={0}
              inputStyle={styles.inputNumeric}
              totalHeight={30} 
              totalWidth={200}
              iconStyle={styles.iconStyle}
              leftButtonBackgroundColor="#4B4B4B"
              rightButtonBackgroundColor="#4B4B4B"
            />
          </View>
          <Text style={styles.label}>Data</Text>
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
    marginBottom: 5
  },
  warranty: {
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
    textAlign: "center",
    width: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 5
  },
  label: {
    color: "#4b4b4b",
    width: "93%",
    textAlign: "left"
  },
  iconStyle:{
    backgroundColor: "#4b4b4b",
    color: "white",
    borderRadius: 5
  }
});
