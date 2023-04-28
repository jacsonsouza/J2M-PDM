import { View, TextInput, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header";
import ButtonApp from "../../components/ButtonApp";

export default function index() {
  const { login, user } = useAuth();

  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const logged = true;

  const handleLogin = async () => {
    try {
      await login(email, senha);
      console.log(user?.email);
    } catch (e) {
      console.log("Erros! ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      {logged && (
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="E-mail"
          value={email}
        />
      )}
      <TextInput
        style={styles.input}
        onChangeText={setSenha}
        placeholder="Senha"
        value={senha}
      />
      <ButtonApp onPress={handleLogin} title={"Entrar"} />

      <Text>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4d4d4",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
