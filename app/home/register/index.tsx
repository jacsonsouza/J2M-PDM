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
import Services from "../../../src/types/Services";
import React, { useEffect, useState } from "react";
import Brand from "../../../src/types/Brand";
import SelectDropdown from "react-native-select-dropdown";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as yup from "yup";

import api from "../../../src/services/api";

import useCollection from "../../../hooks/useCollection";
import useAuth from "../../../hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  const { data, create, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    api
      .get("/fipe/api/v1/carros/marcas")
      .then((response) => {
        setBrands(response.data);
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
  const [error, setError] = useState("");

  const isValid = () => {
    if (client === "") return false;
    if (description === "") return false;
    if (currencyBrl === "") return false;
    if (brand === "") return false;
    if (days === 0) return false;
    if (datePicker === null) return false;

    return true;
  };

  const onClean = () => {
    setClient("");
    setDescription("");
    setCurrencyBrl("");
    setDays(0);
    setBrand("");
    setDate(new Date());
  };

  const handleRegister = async () => {
    if (!isValid()) {
      setError("Campo(s) não preenchido(s)!");
      return;
    }
    await create({
      client: client,
      description: description,
      price: currencyBrl,
      dateStart: datePicker.toISOString(),
      daysWarranty: days,
      brand: brand,
      status: "Em progresso",
    });
    refreshData();

    Alert.alert("Serviço cadastrado! ", "", [
      {
        text: "Ok",
        onPress: () => {
          onClean();
        },
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
          <Text style={styles.label}>Marcas</Text>
          <SelectDropdown
            search={true}
            data={brands.map((values) => {
              return values.nome;
            })}
            onSelect={(value) => {
              setBrand(value);
              console.log(value);
            }}
            defaultButtonText={"Marcas"}
            buttonStyle={styles.inputText}
            buttonTextStyle={{ fontSize: 14, padding: 0 }}
            dropdownIconPosition="right"
            renderDropdownIcon={() => (
              <Ionicons name="caret-down" size={16} color={"#4b4b4b"} />
            )}
            dropdownStyle={styles.dropdown}
            rowStyle={{ height: 35 }}
          />
          <Text style={styles.label}>Data</Text>
          <DatePickerApp date={datePicker} setDate={setDate} />
          {error && <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>}
          <View style={{ width: "93%" }}>
            <ButtonApp onPress={handleRegister} title="Cadastrar" />
          </View>
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
    marginTop: 25,
  },
  inputText: {
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 14,
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
    marginBottom: 5,
  },
  label: {
    color: "#4b4b4b",
    width: "93%",
    textAlign: "left",
    fontSize: 14,
  },
  iconStyle: {
    backgroundColor: "#4b4b4b",
    color: "white",
    borderRadius: 5,
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
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 16,
    padding: 2,
    textAlign: "center",
    alignSelf: "center",
  },
});
