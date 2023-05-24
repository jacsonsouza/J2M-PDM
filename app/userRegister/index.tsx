import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import ButtonApp from "../../components/ButtonApp";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";

export default function index() {
  const { login, register } = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfrirmPass] = useState("");

  const handleRegister = async () => {
    try {
      await register(email, password);
      await login(email, password);
      router.push("/home");
    } catch (error) {
      console.log("Erros: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgLogo}
        source={require("../../assets/img/logo.png")}
      />
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
        placeholder="Digite sua Senha"
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirmar senha</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfrirmPass}
        placeholder="Por favor, confirme sua senha"
        value={confirmPass}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <View style={{ flexDirection: "row" }}>
        <Text>Já tem uma conta? </Text>
        <Link href={"../"} style={{ color: "blue" }}>
          Entre
        </Link>
      </View>
      <ButtonApp onPress={handleRegister} title={"Cadastrar"} />
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
    backgroundColor: "#fff",
    borderRadius: 5,
    fontSize: 12,
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
    marginBottom: 5
  },
  imgLogo: {
    height: 128,
    width: 128,
  },
  label: {
    color: "#4b4b4b",
    width: "80%",
    textAlign: "left"
  }
});
