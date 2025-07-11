import { AttendanceGraph, AttendanceStats } from '@/components/(attendance)';
import { useStatusBar } from '@/context/StatusBarContext';
import theme from '@/theme';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { setStyle, setBackgroundColor } = useStatusBar()
  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(theme.colors.primary);
      setStyle(theme.statusBar.light.style);
    }, [])
  );
  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: theme.colors.primary, position: "absolute", top: 0, left: 0, right: 0, height: 200, zIndex: 1, padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <Text className='text-white mb-5 text-xl font-bold'>Your Attandance</Text>
        {/* Stats */}
        <AttendanceStats />
        <AttendanceGraph />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
