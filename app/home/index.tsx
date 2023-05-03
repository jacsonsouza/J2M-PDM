import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
  Modal,
} from "react-native";
import DatePickerApp from "../../components/DatePickerApp";
import CardService from "../../components/CardService";
import ButtonApp from "../../components/ButtonApp";
import Header from "../../components/Header";
import Services from "../../types/Services";
import Input from "../../components/Input";
import { useState } from "react";

import useCollection from "../../hooks/useCollection";
import useAuth from "../../hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  const { loading, data, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [progess, setProgress] = useState("");

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <Image
          style={styles.loading}
          source={require("../../assets/img/loading.gif")}
        />
      </View>
    );
  }

  const onRefresh = async () => {
    setRefreshing(true);
    refreshData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Header />

      <DatePickerApp date={date} setDate={setDate} />

      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(false);
        }}
      >
        <View style={styles.edit}>
          <Input onChange={setProgress} nameInput="Progresso" value={progess} />
          <ButtonApp
            onPress={() => {
              console.log("Editado");
              setIsVisible(false);
            }}
            title="Editar"
          />
        </View>
      </Modal>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={({ item }) => (
          <CardService
            borderColor={item.status}
            onPress={() => {
              setIsVisible(true);
              setProgress("");
            }}
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
    alignSelf: "center",
    height: 160,
    margin: 5,
  },
  flatlist: {
    width: "100%",
    marginTop: 12,
  },
  modal: {
    backgroundColor: "#d4d4d4",
    alignItems: "center",
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
});
