import { View, StyleSheet, Image, Text } from "react-native";
import { Link } from "expo-router";

const AppButton = ({title} : {title:any}) => (
  <View style={styles.header}>
    <Image
        style={styles.logo}
        source={require('../src/img/logo.png')}
      />    
      <Text style={styles.titleHeader}>{title}</Text>
  </View>
);

export default AppButton

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 10,
    color: '#7c7d7c',
    padding: 0,
    margin: 0
  },
  header: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    height: 'auto',
    shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  },
  logo: {
    height: 80,
    width: 80,
    margin: 5
  },
  titleHeader: {
    color: '#4b4b4b',
    fontSize: 15,
    fontWeight: 'bold'
  },
});

     