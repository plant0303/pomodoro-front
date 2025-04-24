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

  settingCont: {
    paddingRight: 10,
    alignItems: "center",
  },

  inputCont: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingsInput: {
    fontSize: 18,
    width: 30,
    alignItems: "flex-end"
  },

  btnCount: {
    width: "100%",
    alignItems: "center"
  }
});

export default PomodoroTimer;