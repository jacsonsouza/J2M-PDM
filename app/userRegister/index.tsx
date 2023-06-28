import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import ButtonApp from "../../components/ButtonApp";
import { Link, useRouter } from "expo-router";
import * as yup from "yup";

import useAuth from "../../hooks/useAuth";
import { Formik } from "formik";

export default function index() {
  const { login, register } = useAuth();

  const router = useRouter();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Entre com um e-mail válido!")
      .required("E-mail é necessário!"),
    password: yup
      .string()
      .min(8, ({ min }) => `Senha deve conter mais de ${min} caracteres!`)
      .required("Senha é necessária!"),
    confirmPass: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não correspondem!")
      .required("Confirme sua senha!"),
  });

  const handleRegister = async (email: string, password: string) => {
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
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "", confirmPass: "" }}
        onSubmit={(values) => {
          handleRegister(values.email, values.password);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              placeholder="Digite seu e-mail"
              value={values.email}
              autoCapitalize="none"
              inputMode="email"
            />
            {errors.email && (
              <Text style={{ fontSize: 15, color: "red" }}>{errors.email}</Text>
            )}
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              placeholder="Digite sua Senha"
              value={values.password}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {errors.password && (
              <Text style={{ fontSize: 15, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("confirmPass")}
              placeholder="Por favor, confirme sua senha"
              value={values.confirmPass}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {errors.confirmPass && (
              <Text style={{ fontSize: 15, color: "red" }}>
                {errors.confirmPass}
              </Text>
            )}
            <View style={{ flexDirection: "row" }}>
              <Text>Já tem uma conta? </Text>
              <Link href={"../"} style={{ color: "blue" }}>
                Entre
              </Link>
            </View>
            <View style={{ width: "80%" }}>
              <ButtonApp onPress={handleSubmit} title={"Cadastrar"} />
            </View>
          </>
        )}
      </Formik>
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
  imgLogo: {
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
