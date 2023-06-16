import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment, { Moment } from "moment";

interface CardWarrantyProps {
  client: string;
  description: string;
  brand: string;
  dateEndWarranty: Moment;
}

const CardWarranty = ({
  client,
  description,
  brand,
  dateEndWarranty,
}: CardWarrantyProps) => {
  const daysRemaining = dateEndWarranty.diff(moment(new Date()), "days");

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {" "}
          <Ionicons
            style={styles.icon}
            name="person"
            color="#e0bd0d"
            size={20}
          />
          {client}
        </Text>

        <Text style={styles.Warranty}>
          <Ionicons
            style={styles.icon}
            name="ribbon-outline"
            color="#e0bd0d"
            size={20}
          />
          {dateEndWarranty.format("L")}
        </Text>
      </View>

      <Text style={styles.daysRemaining}>
        <Ionicons
          style={styles.icon}
          name="alarm-outline"
          color="#4b4b4b"
          size={18}
        />
        {daysRemaining} dias restantes
      </Text>
      <Text>
        <Ionicons style={styles.icon} name="car" color="#4b4b4b" size={18} />
        {brand}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default CardWarranty;

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: "#f0f0f0",
    padding: 5,
    width: "97%",
    borderRadius: 2,
    borderLeftWidth: 10,
    borderColor: "#969696",
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  header: {
    flexDirection: "row",
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    alignItems: "center",
    width: "50%",
    fontWeight: "bold",
    color: "#4b4b4b",
  },
  daysRemaining: {
    color: "#4b4b4b",
    textAlign: "right",
    width: "100%",
  },
  Warranty: {
    color: "#4b4b4b",
    fontSize: 20,
    textAlign: "right",
    width: "50%",
  },
  icon: {
    marginRight: 5,
  },
  info: {
    fontSize: 18,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  status: {
    backgroundColor: "#51b06a",
    color: "#fff",
    padding: 4,
    marginEnd: 2,
    borderRadius: 10,
    borderColor: "#43b060",
  },
  description: {
    padding: 2,
    marginTop: 5,
    textAlign: "justify",
    color: "#7a7a7a",
  },
});
