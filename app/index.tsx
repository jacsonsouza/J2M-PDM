import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import Header from "../components/Header";
import CardService from "../components/CardService";
import DatePickerApp from "../components/DatePickerApp";
import Services from "../types/Services";
import useCollection from "../hooks/useCollection";
import React from "react";

export default function App() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const { loading, data, refreshData } = useCollection<Services>("services");

  if (loading)
    return (
      <View style={styles.container}>
        <Header />
        <Image
          style={styles.loading}
          source={require("../assets/img/loading.gif")}
        />
      </View>
    );

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
        style={{ width: "100%", marginTop: 12 }}
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
    marginBottom: 30,
  },
  loading: {
    alignSelf: "center",
    height: 160,
    margin: 5,
  },
});
