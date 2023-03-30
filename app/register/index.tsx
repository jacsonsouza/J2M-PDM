import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

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
    return (
        <SafeAreaView>
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
            <Button onPress={cadastra} title="Cadastrar"></Button>
        </SafeAreaView>
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});
