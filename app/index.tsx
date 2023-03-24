import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const router = useRouter();

  const linkList = () => {
    router.push({
      pathname: "/list"
    });
  }

  const linkRegister = () => {
    router.push({
      pathname: "/register"
    });
  }

  return (
    <View style={styles.container}>
      <Button onPress={linkList} title="Listar Serviços" ></Button>
      <Button onPress={linkRegister} title="Cadastrar"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    margin: '20px',
  },
});
