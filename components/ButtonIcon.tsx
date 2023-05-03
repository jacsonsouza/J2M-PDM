import { StyleSheet, TouchableOpacity, Text } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

interface ButtonIconProps {
  onPress: any;
  icon: any;
  colorIcon: string;
  colorButton: string;
  widthButton: number;
  size: number;
}

const ButtonIcon = ({
  onPress,
  icon,
  colorIcon,
  colorButton,
  widthButton,
  size,
}: ButtonIconProps) => {
  const colorStyles = {
    backgroundColor: colorButton,
    width: widthButton,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, colorStyles]}
    >
      <Text style={styles.appButtonText}>
        <Ionicons name={icon} color={colorIcon} size={size} />
      </Text>
    </TouchableOpacity>
  );
};

ButtonIcon.defaultProps = {
  widthButton: 50,
  size: 20,
};

export default ButtonIcon;

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "monospace",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#4b4b4b",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
  },
});
