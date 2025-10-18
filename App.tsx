import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
export default function App() {
  useEffect(() => {
    SplashScreen.hide(); // Hide once JS is loaded
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello from React Native 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
