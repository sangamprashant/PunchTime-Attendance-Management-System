import { TimetableData, TimetableTopbar } from '@/components/(timetable)';
import { useStatusBar } from '@/context/StatusBarContext';
import { daysOfWeek, getDateOfWeekday } from '@/strings/strings';
import theme from '@/theme';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Timetable = () => {
  const { setStyle, setBackgroundColor } = useStatusBar();

  const todayIndex = new Date().getDay();
  const baseDay = daysOfWeek[todayIndex === 0 ? 6 : todayIndex - 1];

  const [selectedDay, setSelectedDay] = useState<string>(baseDay);
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getDateOfWeekday(selectedDay, baseDay)
  );

  useEffect(() => {
    setSelectedDate(getDateOfWeekday(selectedDay, baseDay));
  }, [selectedDay]);

  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(theme.colors.primary);
      setStyle(theme.statusBar.light.style);
    }, [])
  );

  return (
    <View style={styles.container}>
      <TimetableTopbar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <TimetableData selectedDate={selectedDate} selectedDay={selectedDay} />
    </View>
  );
};

export default Timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
