import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface AppButtonProps {
  onPress: any;
  title: string;
}

const ButtonApp = ({ onPress, title }: AppButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default ButtonApp;

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  appButtonContainer: {
    elevation: 2,
    backgroundColor: "#4b4b4b",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    marginBottom: 15,
    marginTop: 15,
    width: "100%",
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});
