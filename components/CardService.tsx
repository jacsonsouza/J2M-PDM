import { View, StyleSheet, Text } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import ButtonIcon from "./ButtonIcon";

const AppButton = ({
  serviceNumber,
  client,
  description,
  date,
  onPress,
  borderColor
}: {
  serviceNumber: any;
  client: any;
  description: any;
  date: any;
  onPress: any;
  borderColor: any;
}) => {

  type StatusProps = {
    [key: string]: {
      color: string;
    };
  };

  const StatusColors : StatusProps = {
    'finish' : { color: "green"},
    'progress' : { color: "#448bfc"},
    'canceled' : { color: "red"},
  }

  const colorStyles = {
    borderColor: StatusColors[borderColor]?.color as any
  };

  const colorTitle = {
    color: StatusColors[borderColor]?.color as any
  }

  return (
    <View style={[styles.cardServico , colorStyles]}>
      <Text style={[styles.title , colorTitle]}>#{serviceNumber}</Text>
      <View style={styles.info}>
        <Text style={styles.date}>
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            color="#448bfc"
            size={18}
          />
          {date}
        </Text>

        <Text style={styles.status}>
          <Ionicons name="checkmark" color="#fff" size={18} />
        </Text>
      </View>
      <Text>
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
          onPress={onPress}
          icon="open-outline"
          colorIcon="#4b4b4b"
          colorButton="#f0f0f0"
          widthButton={40}
          size={20}
        />
      </View>
    </View>
  );
};


AppButton.defaultProps = {
  borderColor: "#969696",
};

export default AppButton;

const styles = StyleSheet.create({
  cardServico: {
    backgroundColor: "#f0f0f0",
    width: "100%",
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
    width: "100%",
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
  description: {
    padding: 2,
    marginTop: 5,
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
});
