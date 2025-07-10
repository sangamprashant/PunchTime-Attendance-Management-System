// src/screens/Landing.tsx
import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { useStatusBar } from '@/context/StatusBarContext';
import theme from '@/theme';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Slide {
  key: string;
  title: string;
  text: string;
  image: number;
}

const slides: Slide[] = [
  {
    key: 's1',
    title: 'Clock‑in in a Tap',
    text: 'PunchTime lets employees mark attendance in seconds.',
    image: require('../assets/images/landing/onboarding1.png'),
  },
  {
    key: 's2',
    title: 'Track Progress',
    text: 'View weekly stats and keep your team motivated.',
    image: require('../assets/images/landing/onboarding2.png'),
  },
  {
    key: 's3',
    title: 'Smart Notifications',
    text: 'Get reminders for late check‑ins and upcoming shifts.',
    image: require('../assets/images/landing/onboarding3.png'),
  },
];

export default function Landing() {
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  const router = useRouter();

  const { setStyle, setBackgroundColor } = useStatusBar()

  useFocusEffect(
    useCallback(() => {
      setBackgroundColor(theme.statusBar.dark.backgroundColor);
      setStyle(theme.statusBar.dark.style);
      router.replace("/(main)/home")
    }, [])
  );

  /** Auto‑advance every 4 s */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = prev === slides.length - 1 ? prev : prev + 1;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /** Update index on manual swipe */
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  /** Action handlers */
  const handleNext = () => {
    if (index === slides.length - 1) return;
    listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    setIndex(index + 1);
  };

  const handleSkip = () => {
    router.replace("/(auth)/login")
  };



  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {/* Slides */}
        <FlatList
          ref={listRef}
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />

        {/* Dots */}
        <View style={styles.dotsRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { opacity: i === index ? 1 : 0.3, width: i === index ? 20 : 8 },
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextBtn} onPress={index === slides.length - 1 ? handleSkip : handleNext}>
            <Text style={styles.nextTxt}>{index === slides.length - 1 ? 'Continue' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaWrapper>
  );
}

/* --------------------------- STYLES --------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingVertical: 20
  },
  slide: {
    width,
    alignItems: 'center',
    padding: theme.spacing(6),
  },
  image: {
    width: '80%',
    height: '45%',
  },
  title: {
    ...theme.font.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing(8),
  },
  text: {
    ...theme.font.body,
    color: theme.colors.textLight,
    textAlign: 'center',
    marginTop: theme.spacing(4),
    lineHeight: 20,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.secondary,
    marginHorizontal: 4,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(6),
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(6),
  },
  skip: {
    ...theme.font.h2,
    color: theme.colors.textLight,
  },
  nextBtn: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing(6),
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radius.md,
  },
  nextTxt: {
    color: '#fff',
    ...theme.font.h2,
  },
});
