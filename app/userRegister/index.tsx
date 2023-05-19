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
      <TextInput
        style={styles.input}
        onChangeText={setConfrirmPass}
        placeholder="Confirme sua senha"
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
