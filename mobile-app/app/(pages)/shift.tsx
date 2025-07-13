import { useUserData } from '@/context/UserDataContext';
import { baseShiftData } from '@/strings/strings';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const ShiftScreen = () => {
    const { userData } = useUserData()

    const isActive = (s: string): boolean => {
        return s === userData?.shift;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={baseShiftData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 16 }}
                renderItem={({ item }) => (
                    <View style={[styles.card, isActive(item.title) && styles.activeCard]}>
                        <View style={styles.row}>
                            <Ionicons
                                name="time-outline"
                                size={24}
                                color={isActive(item.title) ? '#2563EB' : '#6B7280'}
                            />
                            <Text style={[styles.title, isActive(item.title) && styles.activeTitle]}>
                                {item.title}
                            </Text>
                        </View>
                        <Text
                            style={[styles.time, isActive(item.title) && styles.activeTime]}
                        >
                            {item.time}
                        </Text>
                        {isActive(item.title) && (
                            <Text style={styles.currentLabel}>Ongoing</Text>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

export default ShiftScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 12,
        elevation: 2,
        overflow: "hidden",
        margin: 1,
    },
    activeCard: {
        borderLeftWidth: 5,
        borderLeftColor: '#2563EB',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginLeft: 8,
    },
    activeTitle: {
        color: '#2563EB',
    },
    time: {
        fontSize: 14,
        color: '#6B7280',
    },
    activeTime: {
        color: '#2563EB',
    },
    currentLabel: {
        marginTop: 8,
        alignSelf: 'flex-start',
        backgroundColor: '#DBEAFE',
        color: '#1D4ED8',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        fontSize: 12,
        fontWeight: '500',
    },
});
