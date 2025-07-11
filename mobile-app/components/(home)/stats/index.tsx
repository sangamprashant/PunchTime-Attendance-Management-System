import theme from '@/theme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressProps {
    percentage: number;
    radius?: number;
    value: number | string;
    unit?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    radius = 30,
    value,
    unit = ""
}) => {
    const size = radius * 2;
    let strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', overflow: "hidden", borderRadius: 999 }}>
            <Svg width={size} height={size}>
                <Circle
                    stroke="#E5E7EB"
                    fill="none"
                    cx={radius}
                    cy={radius}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={theme.colors.primary}
                    fill="none"
                    cx={radius}
                    cy={radius}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${radius},${radius}`}
                />
            </Svg>
            <View style={styles.valueRow}>
                <Text style={[styles.mainValue, { color: theme.colors.primary }, radius > 30 && { fontSize: radius - 10 }]}>{value}</Text>
                {!!unit && <Text style={[styles.unitText, { color: theme.colors.primary }]}>{unit}</Text>}
            </View>
        </View>
    );
};

const StatsUi = ({ item, percent, i }: { item: StatItem, percent: number, i: number }) => {
    return (
        <View key={i} style={styles.statBox}>
            <CircularProgress percentage={percent} value={item.value}
                unit={item.unit} />
            <Text style={styles.statLabel}>{item.label}</Text>
        </View>
    )
}

export default StatsUi

const styles = StyleSheet.create({
    statBox: {
        alignItems: 'center',
        width: '30%',
    },
    valueRow: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    unitText: {
        fontSize: 10,
        fontWeight: '500',
        marginTop: 2,
        marginLeft: 1,
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 8,
        textAlign: 'center',
    },
});