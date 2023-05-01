import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import Header from "../../components/Header";
import CardService from "../../components/CardService";
import DatePickerApp from "../../components/DatePickerApp";
import Services from "../../types/Services";
import { useState } from "react";

import useCollection from "../../hooks/useCollection";
import useAuth from "../../hooks/useAuth";

export default function App() {
  const { user } = useAuth();
  const { loading, data, refreshData } = useCollection<Services>(
    "services-" + user?.uid
  );

  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());

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

  const linkList = () => {};

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
            onPress={linkList}
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
});
