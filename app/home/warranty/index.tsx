import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  RefreshControl,
  Keyboard,
  TextInput,
} from "react-native";
import DatePickerApp from "../../../components/DatePickerApp";
import CardWarranty from "../../../components/CardWarranty";
import Header from "../../../components/Header";
import Services from "../../../src/types/Services";
import moment from "moment";
import { useEffect, useState } from "react";

import useCollection from "../../../hooks/useCollection";
import useAuth from "../../../hooks/useAuth";
import ButtonIcon from "../../../components/ButtonIcon";

export default function Warranty() {
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();
  const { loading, data, refreshData } = useCollection<Services>(
    "users/" + user?.uid + "/services"
  );

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<Array<Services>>([]);

  const handleSearch = () => {
    Keyboard.dismiss();
    const result = data.filter((service) => {
      return service.client
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase().trim());
    });
    setSearchResult(result);
  };

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
      <View style={styles.search}>
        <TextInput
          onChangeText={setSearch}
          style={styles.inputSearch}
          placeholder="Busque pelo nome do Cliente..."
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={searchResult}
        renderItem={({ item }) => (
          <CardWarranty
            client={item.client}
            description={item.description}
            brand={item.brand}
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
  search: {
    flexDirection: "row",
    backgroundColor: "#d4d4d4",
    alignItems: "center",
  },
});
