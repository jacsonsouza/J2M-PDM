import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Header from "../../../components/Header";
import ButtonIcon from "../../../components/ButtonIcon";
import useAuth from "../../../hooks/useAuth";
import useCollection from "../../../hooks/useCollection";
import Services from "../../../types/Services";
import CardService from "../../../components/CardService";
import { useModal } from "../../../components/ModalProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import Input from "../../../components/Input";
import MaskInput, { Masks } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";
import SelectDropdown from "react-native-select-dropdown";
import ButtonApp from "../../../components/ButtonApp";

export default function index() {
  const { user } = useAuth();
  const { data, refreshData, update, remove } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  useEffect(() => {
    refreshData();
  }, [user]);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Array<Services>>([]);

  const modal = useModal();

  const handleSearch = () => {
    Keyboard.dismiss();
    const result = data.filter((service) => {
      return service.client
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase().trim());
    });
    setSearchResult(result);
  };

  const selectOptions = ["inProgress", "finished", "canceled", "paused"];

  const handleShowModal = (service: Services) => {
    modal.show(
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
              <ButtonIcon
                onPress={() => modal.hide()}
                icon={"close"}
                colorButton="red"
                colorIcon="white"
                widthButton={40}
              />
            </View>
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
                    serviceNumber: service.serviceNumber,
                    price: values.price,
                    dateStart: service.dateStart,
                    daysWarranty: values.warranty,
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
                {({ handleChange, values, handleSubmit }) => (
                  <>
                    <Input
                      onChange={handleChange("client")}
                      nameInput="Cliente"
                      value={values.client}
                    />
                    <Input
                      onChange={handleChange("description")}
                      nameInput="Descrição"
                      value={values.description}
                    />
                    <MaskInput
                      value={values.price}
                      onChangeText={handleChange("price")}
                      mask={Masks.BRL_CURRENCY}
                      style={styles.input}
                      keyboardType="numeric"
                    />
                    <Text style={{ alignSelf: "center" }}>
                      Garantia (em dias):
                    </Text>
                    <NumericInput
                      type="up-down"
                      onChange={() => handleChange("warranty")}
                      minValue={0}
                      containerStyle={styles.inputNumber}
                      value={values.warranty}
                    />
                    <SelectDropdown
                      data={selectOptions}
                      onSelect={handleChange("status")}
                      defaultButtonText={values.status}
                      buttonStyle={{
                        borderStyle: "solid",
                        borderRadius: 10,
                        borderWidth: 2,
                        alignSelf: "center",
                      }}
                    />
                    <ButtonApp onPress={handleSubmit} title="Editar" />
                  </>
                )}
              </Formik>
            </KeyboardAwareScrollView>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  };

  const handleAlert = (service: Services) => {
    Alert.alert("Atenção!", "Tem certeza que deseja apagar este serviço? ", [
      {
        text: "Cancelar",
      },
      {
        text: "Sim",
        onPress: async () => {
          await remove(service.id + "");
          Alert.alert("Serviço deletado!");
          refreshData();
        },
      },
    ]);
  };

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
          onPress={() => handleSearch()}
          icon="search"
          colorIcon={"white"}
          colorButton={"black"}
          widthButton={50}
          size={30}
        />
      </View>
      <FlatList
        data={searchResult}
        renderItem={({ item }) => (
          <CardService
            borderColor={item.status}
            onPress={() => handleShowModal(item)}
            serviceNumber={item.serviceNumber}
            client={item?.client}
            description={item?.description}
            price={item.price}
            date={item?.dateStart}
            onPressDelete={() => handleAlert(item)}
          />
        )}
        style={styles.flatlist}
      />
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
  flatlist: {
    width: "100%",
    marginTop: 12,
  },
  inputNumber: {
    marginTop: 5,
    marginBottom: 15,
    alignSelf: "center",
    borderWidth: 2,
  },
});
