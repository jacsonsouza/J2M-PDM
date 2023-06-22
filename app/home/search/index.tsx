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
import Services from "../../../src/types/Services";
import CardService from "../../../components/CardService";
import { useModal } from "../../../components/ModalProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import Input from "../../../components/Input";
import MaskInput, { Masks } from "react-native-mask-input";
import NumericInput from "react-native-numeric-input";
import SelectDropdown from "react-native-select-dropdown";
import ButtonApp from "../../../components/ButtonApp";
import ModalEdit from "../../../components/ModalEdit";

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
    refreshData();
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
        <ModalEdit
          modal={modal}
          selectOptions={selectOptions}
          service={service}
        />
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
          style={styles.inputSearch}
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
            client={item?.client}
            description={item?.description}
            price={item.price}
            brand={item.brand}
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
    marginTop: 25,
  },
  flatlist: {
    width: "100%",
    marginTop: 12,
  },
  inputSearch: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
    textAlign: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginLeft: 8,
  },
  input: {
    height: 30,
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
    flexDirection: "row",
    textAlign: "center",
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
