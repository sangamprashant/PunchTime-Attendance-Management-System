import { HomeDateCard, HomeFeature, HomeHeader, HomeStats, HomeTakeAttandance } from '@/components/(home)';
import CurveHeaderWrapper from '@/components/CurveHeaderWrapper';
import { useStatusBar } from '@/context/StatusBarContext';
import theme from '@/theme';
import { useFocusEffect } from 'expo-router';
import React, { useCallback } from 'react';

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
      <HomeHeader />
      <HomeTakeAttandance />
      <HomeDateCard />
      <HomeStats />
      <HomeFeature />
    </CurveHeaderWrapper>
  );
}

