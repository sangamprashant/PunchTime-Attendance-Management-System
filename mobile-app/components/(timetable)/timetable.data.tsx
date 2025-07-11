import theme from '@/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const officeScheduleMock: { [date: string]: { title: string; time: string; description: string }[] } = {
    '2025-07-11': [
        {
            title: 'Check-In',
            time: '09:00 AM',
            description: 'Employee clocked in at the front desk using RFID or biometric.',
        },
        {
            title: 'Team Stand-up Meeting',
            time: '09:30 AM - 10:00 AM',
            description: 'Daily meeting with project team to discuss progress and blockers.',
        },
        {
            title: 'Task: UI Dashboard',
            time: '10:15 AM - 01:00 PM',
            description: 'Work on designing and implementing admin dashboard components.',
        },
        {
            title: 'Lunch Break',
            time: '01:00 PM - 02:00 PM',
            description: 'Scheduled break for lunch.',
        },
        {
            title: 'Client Call',
            time: '02:30 PM - 03:30 PM',
            description: 'Discussion with client about new requirements.',
        },
        {
            title: 'Check-Out',
            time: '06:00 PM',
            description: 'End of the day – employee clocked out.',
        },
    ],
    '2025-07-12': [
        {
            title: 'Check-In',
            time: '09:00 AM',
            description: 'Employee clocked in at the front desk using RFID or biometric.',
        },
        {
            title: 'Team Stand-up Meeting',
            time: '09:30 AM - 10:00 AM',
            description: 'Daily meeting with project team to discuss progress and blockers.',
        },
        {
            title: 'Task: UI Dashboard',
            time: '10:15 AM - 01:00 PM',
            description: 'Work on designing and implementing admin dashboard components.',
        },
        {
            title: 'Lunch Break',
            time: '01:00 PM - 02:00 PM',
            description: 'Scheduled break for lunch.',
        },
        {
            title: 'Client Call',
            time: '02:30 PM - 03:30 PM',
            description: 'Discussion with client about new requirements.',
        },
        {
            title: 'Check-Out',
            time: '06:00 PM',
            description: 'End of the day – employee clocked out.',
        },
    ],
};

const TimetableData = ({
    selectedDate,
    selectedDay,
}: {
    selectedDate: Date;
    selectedDay: string;
}) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const schedule = officeScheduleMock[dateKey];

    return (
        <ScrollView contentContainerStyle={styles.contentBox} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            {schedule ? (
                schedule.map((item, i) => (
                    <View key={i} style={styles.scheduleItem}>
                        <Text style={styles.scheduleTitle}>{item.title}</Text>
                        <Text style={styles.scheduleTime}>{item.time}</Text>
                        <Text style={styles.scheduleDesc}>{item.description}</Text>
                    </View>
                ))
            ) : (
                <Text style={{ color: theme.colors.textLight }}>No schedule available for this date.</Text>
            )}
        </ScrollView>
    );
};

export default TimetableData;

const styles = StyleSheet.create({
    contentBox: {
        padding: 16,
    },
    scheduleItem: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
    },
    scheduleTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    scheduleTime: {
        fontSize: 13,
        color: '#6B7280',
        marginVertical: 2,
    },
    scheduleDesc: {
        fontSize: 13,
        color: '#374151',
    },
});
