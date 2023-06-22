import { View, StyleSheet, Image } from "react-native";
import ButtonIcon from "./ButtonIcon";
import { useRouter } from "expo-router";
import useAuth from "../hooks/useAuth";

const AppButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("../");
    } catch (e) {
      console.log("Erros: " + e);
    }
  };
  return (
    <View style={styles.header}>
      <View style={{ width: 50 }}></View>
      <Image style={styles.logo} source={require("../assets/img/logo.png")} />
      <View style={{}}>
        <ButtonIcon
          onPress={handleLogout}
          icon={"log-out"}
          colorIcon="white"
          colorButton="black"
          widthButton={50}
          size={30}
        />
      </View>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  logo: {
    height: 80,
    width: 80,
  },
});
