import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const HomeTakeAttendance = () => {
  const router = useRouter();
  return (
    <View style={styles.attendanceBox}>
      <View>
        <Text style={styles.title}>Mark Your Attendance</Text>
        <Text style={styles.subtitle}>Scan the QR code to confirm</Text>
      </View>
      <Pressable
        style={styles.submitBtn}
        onPress={() => router.push('/(pages)/scan')}
      >
        <MaterialIcons name="qr-code-scanner" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.submitText}>SCAN</Text>
      </Pressable>
    </View>
  );
};

export default HomeTakeAttendance;

const styles = StyleSheet.create({
  attendanceBox: {
    backgroundColor: '#EDE9FE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EC4899',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 6,
  },
  icon: {
    marginRight: 2,
  },
});
