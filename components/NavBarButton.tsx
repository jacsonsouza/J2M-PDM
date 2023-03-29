import { View, Button, StyleSheet, TouchableOpacity, Text, Image } from "react-native";

import { Link, useRouter } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';

const NavBarButton = ({ onPress, title, icon } : { onPress:any, title:any, icon:any}) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        
        <Ionicons name={icon} size={32} color="#4b4b4b" />
        
        <Text style={styles.appButtonText}>{title}</Text>
        
    </TouchableOpacity>
);

export default NavBarButton

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 15,
    color: '#4b4b4b',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  appButtonContainer: {
    width: '25%',
    alignItems: 'center',
    borderRightWidth: 0.5
  },
  img: {
    height: 50,
    width: 50,
    margin: 5
  },
});

     