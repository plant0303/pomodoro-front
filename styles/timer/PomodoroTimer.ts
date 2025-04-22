// styles/timer/pomodoro.ts
import { StyleSheet } from 'react-native';

const PomodoroTimer = StyleSheet.create({
  timerCont: {
    position: "absolute",
    flex: 1,
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },


  time: {
    position: "absolute",
    alignItems: "center",
  },

  mainTime: {
    flexDirection: "row",
    alignItems: "center",
  },

  settings: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputCont: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingsInput: {
    width: 20,
  }
});

export default PomodoroTimer;