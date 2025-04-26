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

const TickMarks: React.FC<TickMarksProps> = ({
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
    { type: "work", duration: 25 * 60, remaining: 25 * 60 }, // 공부시간(25분)
    { type: "break", duration: 5 * 60, remaining: 5 * 60 } // 휴식시간(5분)
  ]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0); //현재 타이머
  const [isRunning, setIsRunning] = useState(false); //실행여부
  const [isDragging, setIsDragging] = useState(false);

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

        if (newTimers[currentTimerIndex].remaining > 0) {
          newTimers[currentTimerIndex].remaining -= 1;
        } else {
          clearInterval(interval);
          setIsRunning(false);
        }
        return newTimers;
      });
    }, 1000);

    // ✅ clean-up 함수 반환
    return () => clearInterval(interval);
  }, [isRunning, currentTimerIndex]);

  // 공부시간 입력받기
  const updateTimerSettings = (index: number, newDuration: number) => {
    if (isRunning) return;

    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];

      if (newDuration > 60) {
        newDuration = 60;
      }
      newTimers[index] = {
        ...newTimers[index],
        duration: newDuration * 60,
        remaining: newDuration * 60,
      };
      return newTimers;
    });
  };

  // 타이머 터치 이벤트 핸들러
  const handleMouseDown = (e) => {
    if (isRunning) return;
    setIsDragging(true);

    const { minutes } = calculateAngleAndTime(e);
    const newDuration = minutes * 60;
    setTimers((prevTime) => {
      const newTimers = [...prevTime];
      newTimers[currentTimerIndex] = {
        ...newTimers[currentTimerIndex],
        duration: newDuration,
        remaining: newDuration
      };
      return newTimers;
    });
  };

  // 타이머 드래그
  const handleMouseMove = (e) => {
    if (!isDragging || isRunning) return;

    const { minutes } = calculateAngleAndTime(e);
    const newDuration = minutes * 60;

    setTimers((prevTimers) => {
      const newTimers = [...prevTimers];
      newTimers[currentTimerIndex] = {
        ...newTimers[currentTimerIndex],
        duration: newDuration,
        remaining: newDuration, // 남은 시간도 새 duration으로 초기화
      };
      return newTimers;
    });
  }
  // 클릭 위치값 가져오기
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleLayout = (e) => {
    const { x, y, width, height } = e.nativeEvent.layout;
    setLayout({ x, y, width, height });
  };

  // 각도 계산 함수
  const calculateAngleAndTime = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    //svg 내부좌표로 변환
    const svgX = ((pageX - layout.x) / layout.width) * 120;
    const svgY = ((pageY - layout.y) / layout.height) * 120;

    let angle = Math.atan2(svgY - 60, svgX - 60) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;

    const minutes = angle >= 355 ? 60 : Math.round(angle / 6);

    return { angle, minutes };
  }

  return (
    <View style={PomodoroTimer.timerCont}
      onLayout={handleLayout}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleMouseDown}
      onResponderMove={handleMouseMove}
    >
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
        <TickMarks />
      </Svg>

      <View style={PomodoroTimer.time}>

        <View style={PomodoroTimer.mainTime}>
          <Text style={PomodoroTimer.mainTimeText}>{Math.floor(currentTimer.remaining / 60)}</Text>
          <Text>:</Text>
          <Text style={PomodoroTimer.mainTimeText}>{(currentTimer.remaining % 60).toString().padStart(2, "0")}</Text>
        </View>

        <View>
          <Text>공부시간</Text>
        </View>

        <View style={PomodoroTimer.settings}>
          <View style={PomodoroTimer.settingCont}>
            <Text style={PomodoroTimer.settingText}>work</Text>
            <View style={PomodoroTimer.inputCont}>
              <TextInput
                keyboardType='numeric'
                inputMode="numeric"
                value={String(timers[0].duration / 60)}
                style={PomodoroTimer.settingsInput}
                underlineColorAndroid="transparent"
                placeholder="00"
                onChangeText={(newDuration) => updateTimerSettings(0, Number(newDuration))}
              >
              </TextInput>
              <Text>min</Text>
            </View>
          </View>

          <View style={PomodoroTimer.settingCont}>
            <Text style={PomodoroTimer.settingText}>break</Text>
            <View style={PomodoroTimer.inputCont}>
              <TextInput
                keyboardType='numeric'
                inputMode="numeric"
                value={String(timers[1].duration / 60)}
                placeholder="00"
                style={PomodoroTimer.settingsInput}
                onChangeText={(newDuration) => updateTimerSettings(1, Number(newDuration))}
              ></TextInput>
              <Text>min</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={PomodoroTimer.btnCount}>
        {!isRunning && currentTimer.remaining === currentTimer.duration ? (
          <TouchableOpacity style={[Global.button, Global.activeBtn]} onPress={() => setIsRunning(true)} activeOpacity={0.6}>
            <Text style={Global.buttonText}>시작하기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[Global.button]} activeOpacity={0.6}>
            {isRunning ?
              <Text onPress={() => setIsRunning(!isRunning)} style={Global.buttonText}>일시정지</Text> :
              <Text onPress={() => setIsRunning(!isRunning)} style={Global.buttonText}>계속하기</Text>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Pomodoro;