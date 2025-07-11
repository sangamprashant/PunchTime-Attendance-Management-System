import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const HomeHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Presence</Text>
            <View style={styles.headerIcons}>
                <Ionicons name="paper-plane" size={20} color="white" />
                <Ionicons name="notifications-outline" size={20} color="white" />
                <Ionicons name="person-circle-outline" size={24} color="white" />
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
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
})