import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Image, Alert } from 'react-native';

export default function App() {
    const router = useRouter();
    const [text1, onChangeText1] = React.useState('');
    const [text2, onChangeText2] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const cadastra = () => {
        router.push({
            pathname: "/list"
        });
    }

    const confirmation = () => {
        Alert.alert('Cadastrado');

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img} source={require('../../assets/logo.png')} />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText1}
                placeholder="Cliente"
                value={text1} />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                placeholder="Serviço"
                value={text2} />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                placeholder="Preço"
                value={number}
                keyboardType="numeric" />
            <Button onPress={confirmation} title="Cadastrar" color='#000000'></Button>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    img: {
        width: 100,
        height: 100,
    },

    bt: {
        backgroundColor: '#fff',
    },
});
