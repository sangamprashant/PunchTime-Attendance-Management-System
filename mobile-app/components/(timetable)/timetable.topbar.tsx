import { getRotatedDays } from '@/strings/strings';
import theme from '@/theme';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TimetableTopbar = ({ selectedDay, setSelectedDay }: {
    selectedDay: string;
    setSelectedDay: (day: string) => void;
}) => {
    const rotatedDays = useMemo(() => getRotatedDays(), []);
    return (
        <View style={styles.topBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScroll}>
                {rotatedDays.map((day) => (
                    <TouchableOpacity
                        key={day}
                        onPress={() => setSelectedDay(day)}
                        style={[styles.dayItem, selectedDay === day && styles.dayItemSelected]}
                    >
                        <Text style={[styles.dayText, selectedDay === day && styles.dayTextSelected]}>{day}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default TimetableTopbar

const styles = StyleSheet.create({
    dayScroll: {
        height: 70,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    dayItem: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginHorizontal: 4,
        borderRadius: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "#ffffff"
    },
    dayItemSelected: {
        backgroundColor: '#ffffff',
    },
    dayText: {
        color: "#ffffff",
        fontWeight: '600',
    },
    dayTextSelected: {
        color: theme.colors.primary,
    },
    topBar: {
        height: 70,
        backgroundColor: theme.colors.primary,
    },
})