import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import DatePickerApp from "../../components/DatePickerApp";
import CardService from "../../components/CardService";
import { Formik } from "formik";
import ButtonApp from "../../components/ButtonApp";
import Header from "../../components/Header";
import Services from "../../types/Services";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import NumericInput from "react-native-numeric-input";
import MaskInput, { Masks } from "react-native-mask-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useCollection from "../../hooks/useCollection";
import useAuth from "../../hooks/useAuth";
import ButtonIcon from "../../components/ButtonIcon";
import { useModal } from "../../components/ModalProvider";

export default function App() {
  const { user } = useAuth();
  const { loading, data, refreshData, update, remove } =
    useCollection<Services>("users/" + user?.uid + "/services");

  useEffect(() => {
    refreshData();
  }, [user]);

  const modal = useModal();

  const [refreshing, setRefreshing] = useState(false);

  const [date, setDate] = useState(new Date());

  const selectOptions = ["inProgress", "finished", "canceled", "paused"];

  if (loading) {
    return (
      <View style={styles.loadScreen}>
        <Header />
        <Image
          style={styles.gifLoad}
          source={require("../../assets/img/load.gif")}
        />
      </View>
    );
  }

  const onRefresh = () => {
    setRefreshing(true);
    refreshData();
    setRefreshing(false);
  };

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
                        onRefresh();
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
          onRefresh();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
        <ButtonIcon
          onPress={() => {}}
          icon={"options"}
          size={30}
          widthButton={50}
          colorButton="black"
          colorIcon="white"
        />
      </View>

      {/* <DatePickerApp date={date} setDate={setDate} /> */}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={({ item }) => (
          <CardService
            borderColor={item.status}
            onPress={() => handleShowModal(item)}
            onPressDelete={() => handleAlert(item)}
            serviceNumber={item.serviceNumber}
            client={item?.client}
            description={item?.description}
            price={item.price}
            date={item?.dateStart}
          />
        )}
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d4d4d4",
    alignItems: "center",
    height: "100%",
  },
  loadScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
  gifLoad: {
    height: 200,
    width: 200,
    margin: 5,
  },
  flatlist: {
    width: "100%",
    marginTop: 12,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  inputNumber: {
    marginTop: 5,
    marginBottom: 15,
    alignSelf: "center",
    borderWidth: 2,
  },
});
