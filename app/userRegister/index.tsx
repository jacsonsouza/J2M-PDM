import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import ButtonApp from "../../components/ButtonApp";
import { Link, useRouter } from "expo-router";

export default function index() {
  const { login, newUser } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfrirmPass] = useState("");

  const handleLogin = async () => {
    try {
      await newUser(email, password);
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
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Senha"
        value={password}
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfrirmPass}
        placeholder="Confirme sua senha"
        value={confirmPass}
      />
      <View style={{ flexDirection: "row" }}>
        <Text>Já tem uma conta? </Text>
        <Link href={"../"} style={{ color: "blue" }}>
          Entre
        </Link>
      </View>
      <ButtonApp onPress={handleLogin} title={"Cadastrar"} />
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
