import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

const AppButton = ({ onPress, title } : {onPress:any, title:any}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
  <Text style={styles.appButtonText}>{title}</Text>
</TouchableOpacity>
);

export default AppButton

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'monospace'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#4b4b4b',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '50%',
    alignItems: 'center',
    margin: 5
  }
});

     