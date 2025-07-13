import { useUserData } from '@/context/UserDataContext'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const HomeHeader = () => {
    const router = useRouter()
    const { userData } = useUserData()

    const name = userData?.name || ""

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => router.push('/(pages)/notifications')}>
                    <Ionicons name="notifications-outline" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/(pages)/profile')}>
                    <Ionicons name="person-circle-outline" size={24} color="white" />
                </TouchableOpacity>
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
