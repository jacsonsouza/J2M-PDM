import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import ButtonApp from '../components/ButtonApp';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NavBarButton from '../components/NavBarButton';
import CardService from '../components/CardService';
import DatePickerApp from '../components/DatePickerApp';

export default function App() {
  const router = useRouter();

  const linkList = () => {
    router.push({
      pathname: "/list"
    });
  }

  const linkRegister = () => {
    router.push({
      pathname: "/register"
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <Header title="ORDENS DE SERVIÇO"/>
        
        <DatePickerApp/>
        
        <ScrollView style={styles.viewMain}>
          <CardService borderColor={"finish"} onPress={linkList} serviceNumber={"001"} client={'Primeiro Cliente'} description={'Serviço de Manutenção realizado na máquina 02345, de acordo com a autorização do cliente.'} date={"27/03/2023"} />
          <CardService borderColor={"progress"} onPress={linkList} serviceNumber={"002"} client={'Segundo Cliente'} description={'Serviço de Manutenção realizado na máquina 02345, de acordo com a autorização do cliente.'} date={"30/03/2023"} />
          <CardService borderColor={"canceled"} onPress={linkList} serviceNumber={"002"} client={'Segundo Cliente'} description={'Serviço de Manutenção realizado na máquina 02345, de acordo com a autorização do cliente.'} date={"30/03/2023"} />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4d4d4',
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
  viewMain:{
    width: '100%',
    padding: 5, 
    marginBottom: 30
  },
  Button: {
    margin: '20px',
  },
});
