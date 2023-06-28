import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import ButtonApp from "../components/ButtonApp";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

export default function index() {
  const { login, user } = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push("/home");
    } catch (e) {
      console.log("Erros! ", e);
      setError("E-mail ou senha inválido!");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/img/logo.png")} />
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        value={email}
        autoCapitalize="none"
        inputMode="email"
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      {error && <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>}
      <View style={{ flexDirection: "row" }}>
        <Text>Não tem uma conta? </Text>
        <Link href={"/userRegister"} style={{ color: "blue" }}>
          Cadastre-se
        </Link>
      </View>
      <View style={{ width: "80%" }}>
        <ButtonApp onPress={handleLogin} title={"Entrar"} />
      </View>

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
    marginTop: 25,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 20,
    padding: 2,
    textAlign: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginBottom: 5,
  },
  logo: {
    height: 128,
    width: 128,
  },
  label: {
    color: "#4b4b4b",
    width: "80%",
    textAlign: "left",
    fontSize: 20,
  },
});
