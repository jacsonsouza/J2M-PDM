import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
  Alert,
} from "react-native";
import CardService from "../../components/CardService";
import Header from "../../components/Header";
import Services from "../../src/types/Services";
import { useEffect, useState } from "react";

import useCollection from "../../hooks/useCollection";
import useAuth from "../../hooks/useAuth";
import ButtonIcon from "../../components/ButtonIcon";
import { useModal } from "../../components/ModalProvider";
import ModalFilter from "../../components/ModalFilter";
import ModalEdit from "../../components/ModalEdit";

export default function App() {
  const { user } = useAuth();
  const { loading, data, refreshData, remove } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  useEffect(() => {
    refreshData();
  }, [user]);

  const modal = useModal();
  const modalFilter = useModal();
  const [refreshing, setRefreshing] = useState(false);
  const [dataFilter, setDataFilter] = useState<Services[]>(data);

  const selectOptions = ["Em progresso", "Finalizado", "Cancelado", "Pausado"];

  useEffect(() => {
    setDataFilter(data);
  }, [data]);

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

  const handleFilterData = (filterStatus: string) => {
    console.log(filterStatus);
    const result = data.filter((service) => {
      if(filterStatus == "Todos"){
        return service;
      } 
      return service.status === filterStatus;
    });
    setDataFilter(result);

    modalFilter.hide();
  };

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
          onRefresh();
        },
      },
    ]);
  };

  const handleFilter = () => {
    modalFilter.show(
      <ModalFilter
        modal={modalFilter}
        selectOptions={selectOptions}
        handleFilterData={handleFilterData}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header />

      <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
        <ButtonIcon
          onPress={() => handleFilter()}
          icon={"options"}
          size={30}
          widthButton={50}
          colorButton="black"
          colorIcon="white"
        />
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={dataFilter}
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
    marginTop: 25,
  },
  loadScreen: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%"
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
});
