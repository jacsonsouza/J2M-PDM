import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ButtonApp from '../components/ButtonApp';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NavBarButton from '../components/NavBarButton';
import CardService from '../components/CardService';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header title="ORDENS DE SERVIÇO" />
      <ScrollView style={styles.viewMain}>
        <CardService serviceNumber={"001"} client={'Primeiro Cliente'} description={'Serviço de Manutenção'} date={"27/03/2023"} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7c7d7c',
    alignItems: 'center',
    height: '100%'
  },
  viewBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  navBarLink: {
    color: 'row'
  },
  viewMain: {
    width: '100%',
    padding: 5,
    marginBottom: 90
  },
  Button: {
    margin: '20px',
  },
});
