import { useStatusBar } from '@/context/StatusBarContext'
import theme from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

const Profile = () => {
    const { setStyle, setBackgroundColor } = useStatusBar()

    useFocusEffect(
        useCallback(() => {
            setBackgroundColor(theme.colors.primary)
            setStyle(theme.statusBar.light.style)
        }, [])
    )

    const [activeTab, setActiveTab] = useState<'Info' | 'Attendance'>('Info')

    const employeeInfo = [
        { icon: 'id-card-outline', label: 'Employee ID: EMP1024' },
        { icon: 'briefcase-outline', label: 'Position: Software Developer' },
        { icon: 'business-outline', label: 'Department: IT' },
        { icon: 'call-outline', label: '+91 9876543210' },
        { icon: 'mail-outline', label: 'srivastavp891@gmail.com' },
        { icon: 'calendar-outline', label: 'Joining Date: Jan 10, 2021' },
        { icon: 'location-outline', label: 'Bangalore, India' },
        { icon: 'home-outline', label: 'Office Center: Tech Park Tower 3' },
    ];

    return (
        <>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://avatars.githubusercontent.com/u/93257774?v=4' }}
                    style={styles.avatar}
                />
                <View>
                    <Text style={styles.name}>Prashant Srivastav</Text>
                    <Text style={styles.year}>Senior Software Developer</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Info' && styles.activeTab]}
                    onPress={() => setActiveTab('Info')}
                >
                    <Text style={[styles.tabText, activeTab === 'Info' && styles.activeTabText]}>
                        Info
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Attendance' && styles.activeTab]}
                    onPress={() => setActiveTab('Attendance')}
                >
                    <Text style={[styles.tabText, activeTab === 'Attendance' && styles.activeTabText]}>
                        Attendance
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            {activeTab === 'Info' ? (
                <ScrollView contentContainerStyle={styles.infoContainer}>
                    {employeeInfo.map((item, index) => (
                        <View key={index} style={styles.infoItem}>
                            <Ionicons name={item.icon as any} size={20} color="#6B7280" style={styles.infoIcon} />
                            <Text style={styles.infoLabel}>{item.label}</Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.attendance}>
                    <Text style={styles.attendanceText}>Attendance record will be shown here.</Text>
                </View>
            )}
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    year: {
        fontSize: 14,
        color: '#e0e0e0',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        paddingVertical: 12,
        width: '50%',
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: theme.colors.primary,
    },
    tabText: {
        fontSize: 16,
        color: '#6B7280',
    },
    activeTabText: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    infoContainer: {
        padding: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 8,
    },
    infoIcon: {
        marginRight: 12,
    },
    infoLabel: {
        fontSize: 16,
        color: '#1F2937',
    },
    attendance: {
        padding: 20,
        alignItems: 'center',
    },
    attendanceText: {
        fontSize: 16,
        color: '#6B7280',
    },
})
