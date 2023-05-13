import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import "moment/locale/pt-br";
import ModalProvider from "../../components/ModalProvider";

type ScreenProps = {
  [key: string]: {
    icon: string;
    label: string;
  };
};

const Screens: ScreenProps = {
  index: {
    label: "Início",
    icon: "home",
  },
  "list/index": {
    label: "Pesquisar",
    icon: "search",
  },
  "register/index": {
    label: "Adicionar",
    icon: "add-circle",
  },
  "search/index": {
    label: "Pesquisar",
    icon: "search",
  },
  "warranty/index": {
    label: "Garantias",
    icon: "ribbon",
  },
  "login/index": {
    label: "Login",
    icon: "person",
  },
};

export default function DefaultLayout() {
  return (
    <ModalProvider>
      <Tabs
        screenOptions={({ route }) => {
          return {
            tabBarIcon: ({ focused, size }) => {
              return (
                <Ionicons
                  name={Screens[route.name]?.icon as any}
                  size={size}
                  color={focused ? "#4b4b4b" : "#7c7d7c"}
                />
              );
            },
            tabBarLabelStyle: {
              fontSize: 12,
              color: "#7c7d7c",
              fontWeight: "bold",
            },
            tabBarStyle: {
              backgroundColor: "#fff",
              height: 60,
            },
            tabBarLabel: Screens[route.name]?.label,
          };
        }}
      ></Tabs>
    </ModalProvider>
  );
}
