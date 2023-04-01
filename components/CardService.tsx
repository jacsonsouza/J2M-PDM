import { View, StyleSheet, Text } from "react-native";

const AppButton = ({ serviceNumber, client, description, date }: { serviceNumber: any, client: any, description: any, date: any }) => (
  <View style={styles.cardServico}>
    <Text>
      {serviceNumber}
    </Text>
    <Text>
      {client}
    </Text>
    <Text>
      {description}
    </Text>
    <Text>
      {date}
    </Text>
  </View>
);

export default AppButton

const styles = StyleSheet.create({
  cardServico: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    borderRadius: 2,
    borderLeftWidth: 10,
    borderLeftColor: '#4b4b4b',
    marginBottom: 10
  }
});