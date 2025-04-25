import { StyleSheet, TextInput } from 'react-native';

export const Global = StyleSheet.create({
  // 폰트 스타일
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
  },

  // 버튼 스타일
  button: {
    width: "80%",
    backgroundColor: "#ddd",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 0,
  },

  buttonText: {
    textAlign: "center"
  },

  activeBtn: {
    backgroundColor: "#ffcd35",
  },

  TextInput: {
    borderWidth: 0
  }
});