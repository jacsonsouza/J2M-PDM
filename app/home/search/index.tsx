import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "../../../components/Header";
import ButtonIcon from "../../../components/ButtonIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import useCollection from "../../../hooks/useCollection";
import useAuth from "../../../hooks/useAuth";
import Services from "../../../types/Services";
import CardService from "../../../components/CardService";

export default function index() {
  const { user, loading: loadingUser } = useAuth();
  const {
    data,
    loading: loadingData,
    refreshData,
  } = useCollection<Services>("users/" + user?.uid + "/services");

  useEffect(() => {
    refreshData();
  }, [user]);

  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<Array<Services>>([]);

  const onSearch = () => {
    const result = data.filter((service) => {
      console.log(service.client, search);
      return service.client
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase().trim());
    });
    setSearchResult(result);
  };

  if (loadingUser || loadingData) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.search}>
        <TextInput
          onChangeText={setSearch}
          style={styles.input}
          placeholder="Buscar..."
          value={search}
        />
        <ButtonIcon
          onPress={onSearch}
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
            onPress={() => {}}
            serviceNumber={item.serviceNumber}
            client={item?.client}
            description={item?.description}
            price={item.price}
            date={item?.dateStart}
          />
        )}
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
  },

  input: {
    height: 45,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
  },
});
