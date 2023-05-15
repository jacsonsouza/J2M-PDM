import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
  Alert,
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

  const [modalService, setModalService] = useState<Services | null>(null);

  const selectData = ["trabalhando", "finalizado", "cancelado"];

  if (loading) {
    return (
      <View style={styles.loading}>
        <Header />
        <Image
          style={styles.gif}
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

  const handleShowModal = () => {
    modal.show(
      <>
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
                client: modalService?.client,
                description: modalService?.description,
                price: modalService?.price,
                warranty: modalService?.daysWarranty,
                status: modalService?.status,
              }}
              onSubmit={() => {}}
            >
              {({ handleChange, values }) => (
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
                    style={styles.inputText}
                    keyboardType="numeric"
                  />
                  <NumericInput
                    type="up-down"
                    onChange={() => handleChange("warranty")}
                    minValue={0}
                    containerStyle={{ marginBottom: 15, alignSelf: "center" }}
                    value={values.warranty}
                  />
                  <SelectDropdown
                    data={selectData}
                    onSelect={handleChange("status")}
                    defaultButtonText={values.status}
                    buttonStyle={{
                      borderStyle: "solid",
                      borderRadius: 10,
                      borderWidth: 2,
                      alignSelf: "center",
                    }}
                  />
                  <ButtonApp
                    onPress={async () => {
                      const editService: Services = {
                        client: values.client,
                        description: values.description,
                        serviceNumber: modalService?.serviceNumber,
                        price: values.price,
                        dateStart: modalService?.dateStart,
                        daysWarranty: values.warranty,
                        status: values.status,
                      };
                      await update(modalService?.id + "", editService);
                      Alert.alert("Serviço Editado!");
                      modal.hide();
                      onRefresh();
                    }}
                    title="Editar"
                  />
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </View>
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

      <DatePickerApp date={date} setDate={setDate} />

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={({ item }) => (
          <CardService
            borderColor={item.status}
            onPress={() => {
              handleShowModal();
              setModalService(item);
            }}
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
  loading: {
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    height: 200,
    width: 200,
    margin: 5,
  },
  flatlist: {
    width: "100%",
    marginTop: 12,
  },
  modal: {
    backgroundColor: "#d4d4d4",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  edit: {
    margin: 20,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});
