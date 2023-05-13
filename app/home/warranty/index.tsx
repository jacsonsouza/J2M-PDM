import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import DatePickerApp from "../../../components/DatePickerApp";
import CardWarranty from "../../../components/CardWarranty";
import Header from "../../../components/Header";
import Services from "../../../types/Services";
import moment from "moment";
import { useEffect, useState } from "react";

import useCollection from "../../../hooks/useCollection";
import useAuth from "../../../hooks/useAuth";

export default function Warranty() {
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();
  const { loading, data, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  useEffect(() => {
    refreshData();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <Image source={require("../../../assets/img/loading.gif")} />
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
        style={styles.flatlist}
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
  flatlist: {
    width: "100%",
    marginTop: 12,
  },
});
