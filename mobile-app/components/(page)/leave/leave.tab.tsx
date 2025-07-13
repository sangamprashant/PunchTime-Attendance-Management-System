import theme from '@/theme'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const LeaveTab = ({ tab, setTab }: { tab: 'apply' | 'history', setTab: (tab: 'apply' | 'history') => void }) => {
    return (
        <View style={styles.tabs}>
            <TouchableOpacity style={[styles.tab, tab === 'apply' && styles.activeTab]} onPress={() => setTab('apply')}>
                <Text style={[styles.tabText, tab === 'apply' && styles.activeTabText]}>Apply Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, tab === 'history' && styles.activeTab]} onPress={() => setTab('history')}>
                <Text style={[styles.tabText, tab === 'history' && styles.activeTabText]}>Leave History</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LeaveTab

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#E5E7EB',
    },
    tab: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
    },
    tabText: {
        fontSize: 16,
        color: '#6B7280',
        fontWeight: '500',
    },
    activeTabText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
})