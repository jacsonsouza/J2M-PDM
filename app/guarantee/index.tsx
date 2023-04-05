import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Platform, TextInput, ScrollView } from 'react-native';
import Header from '../../components/Header';
import CardGuarantee from '../../components/CardGuarantee';
import DatePickerApp from '../../components/DatePickerApp';

export default function Guarantee() {
    return (
        <View style={styles.container}>
            <Header title='GARANTIAS EM VIGOR'/>
            
            <DatePickerApp/>

            <ScrollView style={styles.viewMain}>
              <CardGuarantee serviceNumber={"001"} client={'Primeiro Cliente'} description={'Serviço de Manutenção realizado na máquina 02345, de acordo com a autorização do cliente.'} dateService={"27/03/2023"} dateEndGuarantee={"27/04/2023"} daysRemaining={"28"} />
              <CardGuarantee serviceNumber={"002"} client={'Segundo Cliente'} description={'Serviço de Manutenção realizado na máquina 02345, de acordo com a autorização do cliente.'} dateService={"31/03/2023"} dateEndGuarantee={"10/04/2023"} daysRemaining={"10"}/>
            </ScrollView>
            <StatusBar style="auto" />
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
      padding: 5
    },
    cardServico: {
      backgroundColor: '#f0f0f0',
      width: '100%',
      borderRadius: 5,
      borderLeftWidth: 10,
      borderLeftColor: '#4b4b4b'
    },
  });
  
