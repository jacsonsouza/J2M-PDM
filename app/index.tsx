import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import ButtonApp from "../components/ButtonApp";
import { Link, useRouter } from "expo-router";

export default function index() {
  const { login, user } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/home");
    } catch (e) {
      console.log("Erros! ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgLogo}
        source={require("../assets/img/logo.png")}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="E-mail"
        value={email}
        autoCapitalize="none"
        inputMode="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Senha"
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <View style={{ flexDirection: "row" }}>
        <Text>Não tem uma conta? </Text>
        <Link href={"/userRegister"} style={{ color: "blue" }}>
          Cadastre-se
        </Link>
      </View>
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
    justifyContent: "center",
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
  imgLogo: {
    height: 128,
    width: 128,
  },
});
