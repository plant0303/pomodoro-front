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

  mainTimeText: {
    fontSize: 24,
    paddingLeft: 5,
    paddingRight: 5
  },

  settings: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  settingCont: {
    paddingRight: 10,
    alignItems: "center",
  },

  settingText: {
    color: "#666"
  },

  inputCont: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingsInput: {
    fontSize: 18,
    width: 25,
    alignItems: "flex-end",
    textAlign: "right",
    marginRight: 5,
    paddingRight: 3
  },

  btnCount: {
    width: "100%",
    alignItems: "center"
  }
});

export default PomodoroTimer;