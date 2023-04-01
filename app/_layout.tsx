import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

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
  "register/index": {
    label: "Adicionar",
    icon: "add-circle",
  },
  "list/index": {
    label: "Listar",
    icon: "list",
  },
  "guarantee/index": {
    label: "Garantias",
    icon: "ribbon",
  },
};

export default function DefaultLayout() {
  return (
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
            fontSize: 15,
            color: '#4b4b4b',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 60,
          },
          tabBarLabel: Screens[route.name]?.label,
        };
      }}
    ></Tabs>
  );
}
