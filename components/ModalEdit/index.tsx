import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StyleSheet,
} from "react-native";
import React from "react";
import useCollection from "../../hooks/useCollection";
import Services from "../../src/types/Services";
import useAuth from "../../hooks/useAuth";
import ButtonIcon from "../ButtonIcon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import Input from "../Input";
import MaskInput, { Masks } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";
import SelectDropdown from "react-native-select-dropdown";
import ButtonApp from "../ButtonApp";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ModalEditProps {
  service: Services;
  modal: any;
  selectOptions: string[];
}

export default function ModalEdit({
  service,
  modal,
  selectOptions,
}: ModalEditProps) {
  const { user } = useAuth();
  const { update, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <Text style={styles.title}>Editar informações do Serviço</Text>

        <KeyboardAwareScrollView>
          <Formik
            initialValues={{
              client: service.client,
              description: service.description,
              price: service.price,
              warranty: service.daysWarranty,
              status: service.status,
            }}
            onSubmit={async (values) => {
              const editService: Services = {
                client: values.client,
                description: values.description,
                price: values.price,
                dateStart: service.dateStart,
                daysWarranty: values.warranty,
                brand: service.brand,
                status: values.status,
              };
              await update(service.id + "", editService);
              Alert.alert("Serviço Editado!", "", [
                {
                  text: "Ok",
                  onPress: () => {
                    modal.hide();
                    refreshData();
                  },
                },
              ]);
            }}
          >
            {({ handleChange, values, handleSubmit, setFieldValue }) => (
              <>
                <Text style={styles.label}>Cliente</Text>
                <Input
                  onChange={handleChange("client")}
                  nameInput="Cliente"
                  value={values.client}
                />
                <Text style={styles.label}>Serviço</Text>
                <Input
                  onChange={handleChange("description")}
                  nameInput="Descrição"
                  value={values.description}
                />
                <Text style={styles.label}>Valor do serviço</Text>
                <MaskInput
                  value={values.price}
                  onChangeText={handleChange("price")}
                  mask={Masks.BRL_CURRENCY}
                  style={styles.input}
                  keyboardType="numeric"
                />
                <Text style={styles.label}>Dias de Garantia</Text>
                <View style={styles.warranty}>
                  <NumericInput
                    valueType="integer"
                    onChange={(value) => {
                      setFieldValue("warranty", value);
                    }}
                    minValue={0}
                    inputStyle={styles.inputNumeric}
                    totalHeight={30}
                    totalWidth={200}
                    iconStyle={styles.iconStyle}
                    leftButtonBackgroundColor="#4B4B4B"
                    rightButtonBackgroundColor="#4B4B4B"
                    value={values.warranty}
                  />
                </View>
                <Text style={styles.label}>Status do serviço</Text>
                <SelectDropdown
                  data={selectOptions}
                  onSelect={handleChange("status")}
                  defaultButtonText={values.status}
                  buttonStyle={styles.input}
                  buttonTextStyle={{ fontSize: 16, padding: 0 }}
                  renderDropdownIcon={() => (
                    <Ionicons name="caret-down" size={16} color={"#4b4b4b"} />
                  )}
                  dropdownStyle={styles.dropdown}
                  rowStyle={{ height: 35 }}
                />
                <View style={styles.containerButton}>
                  <ButtonApp onPress={handleSubmit} title="Editar" />
                </View>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  inputNumber: {
    marginTop: 5,
    marginBottom: 15,
    alignSelf: "center",
    borderWidth: 2,
  },
  modal: {
    backgroundColor: "#d4d4d4",
    width: "100%",
  },
  title: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  label: {
    color: "#4b4b4b",
    textAlign: "left",
    fontSize: 16,
  },
  warranty: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 5,
    width: "100%",
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
  iconStyle: {
    backgroundColor: "#4b4b4b",
    color: "white",
    borderRadius: 5,
  },
  containerButton: {
    width: "100%",
    alignSelf: "center",
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
