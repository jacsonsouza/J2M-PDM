import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import DatePickerApp from '../../components/DatePickerApp';
import ButtonApp from "../../components/ButtonApp";
import Header from '../../components/Header';
import React, { useState } from 'react';
import MaskInput, { Masks } from 'react-native-mask-input';
import { StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';


export default function App() {
    const [client, setClient] = React.useState('');
    const [service, setService] = React.useState('');
    const [currencyBrl, setCurrencyBrl] = React.useState('');

    const confirmation = () => {
        Alert.alert('Cadastrado');

    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <TextInput
                style={styles.input}
                onChangeText={setClient}
                placeholder="Cliente"
                value={client} />
            <TextInput
                style={styles.input}
                onChangeText={setService}
                placeholder="Serviço"
                value={service} />
            <MaskInput
                value={currencyBrl}
                onChangeText={setCurrencyBrl}
                mask={Masks.BRL_CURRENCY}
                style={styles.input}
                keyboardType='numeric'
            />
            <DatePickerApp />
            <ButtonApp onPress={confirmation} title="Cadastrar" />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d4d4d4',
        alignItems: 'center',
    },

    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
});
