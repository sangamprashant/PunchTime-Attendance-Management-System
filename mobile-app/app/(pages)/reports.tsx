import theme from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const myAttendanceReports = [
    {
        id: 'july',
        month: 'July 2025',
        totalDays: 31,
        present: 26,
        absent: 3,
        leave: 2,
    },
    {
        id: 'june',
        month: 'June 2025',
        totalDays: 30,
        present: 25,
        absent: 3,
        leave: 2,
    },
    {
        id: 'may',
        month: 'May 2025',
        totalDays: 31,
        present: 27,
        absent: 2,
        leave: 2,
    },
];

const ReportsScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={myAttendanceReports}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const percentage = Math.round((item.present / item.totalDays) * 100);
                    return (
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <Ionicons name="calendar-outline" size={22} color={theme.colors.primary} />
                                <Text style={styles.month}>{item.month}</Text>
                            </View>

                            <View style={styles.statRow}>
                                <Text style={styles.stat}>Present: {item.present}</Text>
                                <Text style={styles.stat}>Absent: {item.absent}</Text>
                                <Text style={styles.stat}>Leave: {item.leave}</Text>
                            </View>

                            <View style={styles.percentBarWrapper}>
                                <View style={[styles.percentBar, { width: `${percentage}%` }]} />
                            </View>
                            <Text style={styles.percentLabel}>{percentage}% Attendance</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default ReportsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 20,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    month: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 8,
    },
    stat: {
        fontSize: 14,
        color: '#374151',
    },
    percentBarWrapper: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    percentBar: {
        height: 8,
        backgroundColor: theme.colors.primary,
    },
    percentLabel: {
        marginTop: 6,
        fontSize: 13,
        color: '#4B5563',
        fontWeight: '500',
    },
});
