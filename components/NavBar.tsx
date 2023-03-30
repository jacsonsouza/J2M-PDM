import { View, StyleSheet, Image, Text } from "react-native";
import { Link, useRouter } from "expo-router";

import NavBarButton from '../components/NavBarButton';

const NavBar = () => (

  <View style={styles.navBar}>
    <View style={styles.navBar}>
    </View>
  </View>
);

export default NavBar

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    position: 'absolute', 
    left: 0, 
    right: 0,
    bottom: 0
  },
  navBarLink: {
    color: 'row'
  }
});

     