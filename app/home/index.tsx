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

  const selectOptions = ["Em progresso", "Finalizado", "Cancelado", "Pausado"];

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
          <View style={styles.modal}>
            <View style={{ alignSelf: "flex-end", marginBottom: 15 }}>
              <ButtonIcon
                onPress={() => modal.hide()}
                icon={"close"}
                colorButton="red"
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
                        onRefresh();
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
                      buttonTextStyle={{ fontSize: 12, padding: 0 }}
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
            brand={item.brand}
            client={item.client}
            description={item.description}
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
    width: "100%",
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
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
    alignSelf: "center",
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
    marginLeft: 8,
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
    height: "100%",
  },
  title: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  label: {
    color: "#4b4b4b",
    width: "93%",
    textAlign: "left",
    paddingLeft: 8,
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
    alignContent: "center",
    marginLeft: 50,
  },
});
