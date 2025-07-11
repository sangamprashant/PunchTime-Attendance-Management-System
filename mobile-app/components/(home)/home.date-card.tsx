import { useUserData } from '@/context/UserDataContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeDateCard = () => {

    const { userData } = useUserData()

    const weekData = userData?.weekData || [
        { label: 'M', isMarked: false, isToday: false },
        { label: 'T', isMarked: false, isToday: false },
        { label: 'W', isMarked: false, isToday: true },
        { label: 'Th', isMarked: false, isToday: false },
        { label: 'Fr', isMarked: false, isToday: false },
    ];
    return (
        <View style={styles.dateCard}>
            <View style={styles.dateRow}>
                <Text style={styles.dateNumber}>27</Text>
                <Text style={styles.supText}>th</Text>
                <Text style={styles.dateDay}> Wednesday</Text>
            </View>
            <Text style={styles.dateMonth}>August 2019</Text>

            <View style={styles.weekRow}>
                {weekData.map((d, i) => {
                    return (
                        <View key={i} style={styles.weekItem}>
                            <Text style={styles.weekText}>{d.label}</Text>
                            <View
                                style={[
                                    styles.weekCircle,
                                    d.isToday && styles.todayCircle,
                                    d.isMarked && { backgroundColor: '#6D28D9' },
                                ]}
                            >
                                {d.isMarked && <Ionicons name="checkmark" size={14} color="white" />}
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    )
}

export default HomeDateCard

const styles = StyleSheet.create({
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
})