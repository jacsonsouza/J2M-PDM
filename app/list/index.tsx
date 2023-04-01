import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import Header from '../../components/Header';
import NavBarButton from '../../components/NavBarButton';

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
      <Header title='LISTAR SERVIÇOS' />
      <Text>Serviços</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7c7d7c',
    alignItems: 'center',
    height: '100%'
  },
  viewBody: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
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
  },
  viewMain: {
    width: '100%',
    padding: 5
  },
  cardServico: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    borderRadius: 5,
    borderLeftWidth: 10,
    borderLeftColor: '#4b4b4b'
  }
});

