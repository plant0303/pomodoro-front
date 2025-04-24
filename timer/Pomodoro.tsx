import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Dimensions, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Typography } from '../styles/Typography';
import { Svg, Defs, LinearGradient, Stop, Circle, Line } from 'react-native-svg';

import { Global } from '../styles/Global';
import { default as PomodoroTimer } from '../styles/timer/PomodoroTimer';

const { width } = Dimensions.get('window');
const SVG_SIZE = width * 0.8; // 화면 너비의 80% 크기

// 눈금 생성
interface TickMarksProps {
  total?: number;
  cx?: number;
  cy?: number;
  radius?: number;
}

const TickMarks : React.FC<TickMarksProps> = ({
  total = 60,
  cx = 60,
  cy = 60,
  radius = 50,
}) => {
  const marks = Array.from({ length: total }, (_, i) => {

    const angle = (i / total) * 360;
    const x1 = cx;
    const y1 = 20;
    const x2 = cy;
    const y2 = 17;

    return (
      <Line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#ccc"
        strokeWidth={i % 15 === 0 ? 0.7 : 0.2}
        transform={`rotate(${angle} ${cx} ${cy})`}
      />
    );
  });

  return <>{marks}</>
}

interface Timer {
  type: 'work' | 'break';
  duration: number;
  remaining: number;
}

const Pomodoro = () => {

  const [timers, setTimers] = useState<Timer[]>([
    // 타입, 전체시간, 소모된 현재시간
    { type: "work", duration: 25 * 60, remaining: 25 * 60}, // 공부시간(25분)
    { type: "break", duration: 5 * 60, remaining: 5 * 60} // 휴식시간(5분)
  ]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0); //현재 타이머
  const [isRunning, setIsRunning] = useState(false); //실행여부

  const currentTimer = timers[currentTimerIndex]; // 현재 활성화된 타이머

// 타이머 시각화 관련
  const radius = 50; //반지름
  const circumference = 2 * Math.PI * radius; //원의 둘레
  const strokeDashoffset = circumference - (currentTimer.remaining / 3600) * circumference; // 남은 스트로크

// 타이머 실행
useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];

      if(newTimers[currentTimerIndex].remaining > 0){
        newTimers[currentTimerIndex].remaining -= 1;
      }else{
        clearInterval(interval);
        setIsRunning(false);
      }
      return newTimers;
    });
  }, 1000);

  // ✅ clean-up 함수 반환
  return () => clearInterval(interval);
}, [isRunning, currentTimerIndex]);

  return (
    <View style={PomodoroTimer.timerCont}>
      <Svg
        viewBox="0 0 120 120"
        width={SVG_SIZE}
        height={SVG_SIZE}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="100%" x2="80%" y2="100%">
            <Stop offset="0%" stopColor="#ffd455" />
            <Stop offset="100%" stopColor="#ff4500" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#ddd"
          strokeWidth="10"
        />
        <Circle
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="10"
          transform="rotate(-90 60 60)"
          strokeDasharray={circumference} // 원의 둘레
          strokeDashoffset={strokeDashoffset} // 스트로크 오프셋
        />
        <TickMarks/>
      </Svg>

      <View style={PomodoroTimer.time}>

        <View style={PomodoroTimer.mainTime}>
          <Text>00</Text>
          <Text>:</Text>
          <Text>00</Text>
        </View>

        <View>
          <Text>공부시간</Text>
        </View>

        <View style={PomodoroTimer.settings}>
          <View style={PomodoroTimer.settingCont}>
            <Text>work</Text>
            <View style={PomodoroTimer.inputCont}>
              <TextInput keyboardType='number-pad' value='25' style={PomodoroTimer.settingsInput}></TextInput>
              <Text>min</Text>
            </View>
          </View>

          <View style={PomodoroTimer.settingCont}>
            <Text>break</Text>
            <View style={PomodoroTimer.inputCont}>
              <TextInput keyboardType='number-pad' value='5' style={PomodoroTimer.settingsInput}></TextInput>
              <Text>min</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={PomodoroTimer.btnCount}>
        <TouchableOpacity style={[Global.button, Global.activeBtn]} onPress={() => setIsRunning(true)}>
          <Text style={Global.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pomodoro;