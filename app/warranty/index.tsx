import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import DatePickerApp from "../../components/DatePickerApp";
import CardWarranty from "../../components/CardWarranty";
import Header from "../../components/Header";
import Services from "../../types/Services";
import moment from "moment";
import { useState } from "react";

import useCollection from "../../hooks/useCollection";

export default function Guarantee() {
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { loading, data, refreshData } = useCollection<Services>("services");

  if (loading)
    return (
      <View style={styles.container}>
        <Header />
        <Image source={require("../../assets/img/loading.gif")} />
      </View>
    );

  const onRefresh = async () => {
    setRefreshing(true);
    refreshData();
    setRefreshing(false);
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
          <CardWarranty
            serviceNumber={item.serviceNumber}
            client={item.client}
            description={item.description}
            dateEndWarranty={moment(item.dateStart).add(
              item.daysWarranty,
              "days"
            )}
          />
        )}
        style={{ width: "100%", marginTop: 12 }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d4d4d4",
    alignItems: "center",
    height: "100%",
  },
  viewBody: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  navBarLink: {
    color: "row",
  },
  viewMain: {
    width: "100%",
    padding: 5,
  },
  cardServico: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    borderRadius: 5,
    borderLeftWidth: 10,
    borderLeftColor: "#4b4b4b",
  },
});
