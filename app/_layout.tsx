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
    label: "Home",
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
            fontSize: 12,
            color: '#7c7d7c',
            fontWeight: 'bold'
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            borderRightWidth: 0.5
          },
          tabBarLabel: Screens[route.name]?.label,
        };
      }}
    ></Tabs>
  );
}
