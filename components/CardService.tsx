import { View, StyleSheet, Text, PressableProps } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonIcon from "./ButtonIcon";
import moment from "moment";

interface CardServiceProps {
  serviceNumber: number | undefined;
  client: string | undefined;
  description: string | undefined;
  price: string | undefined;
  date: string | undefined;
  onPress: Function;
  onPressDelete: Function;
  borderColor: string;
}

const CardService = ({
  serviceNumber,
  client,
  description,
  price,
  date,
  onPress,
  onPressDelete,
  borderColor,
}: CardServiceProps) => {
  type StatusProps = {
    [key: string]: {
      color: string;
    };
  };

  const StatusColors: StatusProps = {
    finished: { color: "green" },
    inProgress: { color: "#448bfc" },
    canceled: { color: "red" },
    paused: { color: "yellow" },
  };

  const colorStyles = {
    borderColor: StatusColors[borderColor]?.color as string,
  };

  const colorTitle = {
    color: StatusColors[borderColor]?.color as string,
  };

  return (
    <View style={[styles.cardServico, colorStyles]}>
      <Text style={[styles.title, colorTitle]}>#{serviceNumber}</Text>
      <View style={styles.info}>
        <Text style={styles.date}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            color="#448bfc"
            size={18}
          />

          {moment(date).format("L")}
        </Text>

        <Text style={styles.price}>
        <Ionicons style={styles.icon} name="cash" color="#4b4b4b" size={18} />
        {price}
      </Text>
      </View>
      <Text style={styles.infoService}>
        <Ionicons
          style={styles.icon}
          name="people-circle-outline"
          color="#4b4b4b"
          size={18}
        />
        {client}
      </Text>
      
      <Text style={styles.description}>{description}</Text>
      <View style={styles.rowButton}>
        <ButtonIcon
          onPress={onPress}
          icon="create"
          colorIcon="#4b4b4b"
          colorButton="#f0f0f0"
          widthButton={40}
          size={20}
        />

        <ButtonIcon
          onPress={onPressDelete}
          icon="trash"
          colorIcon="red"
          colorButton="#f0f0f0"
          widthButton={40}
          size={20}
        />
      </View>
    </View>
  );
};

CardService.defaultProps = {
  borderColor: "#969696",
};

export default CardService;

const styles = StyleSheet.create({
  cardServico: {
    margin: 5,
    backgroundColor: "#f0f0f0",
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
  },
  title: {
    fontSize: 20,
    alignItems: "center",
    width: "50%",
    fontWeight: "bold",
    color: "#448bfc",
  },
  date: {
    color: "#4b4b4b",
    width: "50%",
    paddingLeft: 5
  },
  price: {
    color: "#4b4b4b",
    width: "50%",
    textAlign: "right",
    paddingRight: 5
  },
  icon: {
    marginRight: 5,
  },
  info: {
    fontSize: 18,
    flexDirection: "row",
  },
  status: {
    backgroundColor: "#51b06a",
    color: "#fff",
    padding: 4,
    marginEnd: 2,
    borderRadius: 10,
    borderColor: "#43b060",
  },
  infoService: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    textAlign: "justify",
    color: "#7a7a7a",
  },
  rowButton: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 3,
  },
  description: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    textAlign: "center",
  }
});
