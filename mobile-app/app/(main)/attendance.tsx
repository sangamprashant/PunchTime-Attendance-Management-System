import { AttendanceGraph, AttendanceStats } from '@/components/(attendance)';
import CurveHeaderWrapper from '@/components/CurveHeaderWrapper';
import { useStatusBar } from '@/context/StatusBarContext';
import theme from '@/theme';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { Text } from 'react-native';

export default function HomeScreen() {
  const { setStyle, setBackgroundColor } = useStatusBar()
  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(theme.colors.primary);
      setStyle(theme.statusBar.light.style);
    }, [])
  );
  return (
    <CurveHeaderWrapper>
      <Text className='text-white mb-5 text-xl font-bold'>Your Attandance</Text>
      {/* Stats */}
      <AttendanceStats />
      <AttendanceGraph />
    </CurveHeaderWrapper>
  );
}