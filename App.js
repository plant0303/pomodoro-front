import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Pomodoro from './timer/Pomodoro';

export default function App() {
  return (
    <View style={styles.container}>
      <Pomodoro></Pomodoro>
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
});
