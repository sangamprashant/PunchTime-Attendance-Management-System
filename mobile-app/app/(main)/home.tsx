import React, { useCallback } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import theme from '@/theme';
import { useFocusEffect } from 'expo-router';
import { useStatusBar } from '@/context/StatusBarContext';

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

        <View style={{ height: 300, }}>
          <View style={styles.header}>
            <Text style={styles.title}>Presence</Text>
            <View style={styles.headerIcons}>
              <Ionicons name="paper-plane" size={20} color="white" />
              <Ionicons name="notifications-outline" size={20} color="white" />
              <Ionicons name="person-circle-outline" size={24} color="white" />
            </View>
          </View>

          {/* Take Attendance */}
          <View style={styles.attendanceBox}>
            <Text style={styles.attendanceText}>Take attendance today</Text>
            <Pressable style={styles.submitBtn}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </View>

          {/* Date Card */}
          <View style={styles.dateCard}>
            <View style={styles.dateRow}>
              <Text style={styles.dateNumber}>27</Text>
              <Text style={styles.supText}>th</Text>
              <Text style={styles.dateDay}> Wednesday</Text>
            </View>
            <Text style={styles.dateMonth}>August 2019</Text>

            <View style={styles.weekRow}>
              {['M', 'T', 'W', 'Th', 'Fr'].map((d, i) => {
                const isMarked = d === 'M' || d === 'T';
                const isToday = d === 'W';
                return (
                  <View key={i} style={styles.weekItem}>
                    <Text style={styles.weekText}>{d}</Text>
                    <View
                      style={[
                        styles.weekCircle,
                        isToday && styles.todayCircle,
                        isMarked && { backgroundColor: '#6D28D9' },
                      ]}
                    >
                      {isMarked && <Ionicons name="checkmark" size={14} color="white" />}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: 'Attendance', value: '83%', color: '#6D28D9' },
          { label: 'Leave Taken', value: '03', color: '#4F46E5' },
          { label: 'Ongoing Days', value: '23', color: '#EC4899' },
        ].map((item, i) => (
          <View key={i} style={styles.statBox}>
            <Text style={[styles.statValue, { color: item.color }]}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Feature Grid */}
      <View style={styles.featureGrid}>
        {[
          { icon: 'calendar-today', label: 'Ask Leave' },
          { icon: 'star', label: 'Leaderboard' },
          { icon: 'article', label: 'News' },
          { icon: 'bar-chart', label: 'Predictor' },
          { icon: 'group', label: 'Friends' },
          { icon: 'assignment', label: 'Assignments' },
        ].map((item, i) => (
          <View key={i} style={styles.featureItem}>
            <View style={styles.featureIconBox}>
              <MaterialIcons name={item.icon as any} size={20} color="#6D28D9" />
            </View>
            <Text style={styles.featureLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: "white",
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  attendanceBox: {
    backgroundColor: '#EDE9FE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  attendanceText: {
    fontSize: 16,
    color: '#1F2937',
  },
  submitBtn: {
    backgroundColor: '#EC4899',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
  dateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dateNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  supText: {
    fontSize: 12,
    color: '#6D28D9',
    marginLeft: 2,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6D28D9',
    marginLeft: 4,
  },
  dateMonth: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  weekItem: {
    alignItems: 'center',
  },
  weekText: {
    fontSize: 12,
  },
  weekCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCircle: {
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 300,
  },
  statBox: {
    alignItems: 'center',
    width: '33%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconBox: {
    backgroundColor: '#EDE9FE',
    padding: 10,
    borderRadius: 999,
    marginBottom: 6,
  },
  featureLabel: {
    fontSize: 13,
    color: '#374151',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 16,
  },
});
