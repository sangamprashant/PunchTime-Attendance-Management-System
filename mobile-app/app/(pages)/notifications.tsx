import { useUserData } from '@/context/UserDataContext'
import theme from '@/theme'
import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

const NotificationsScreen: React.FC = () => {
    const { userData } = useUserData()
    const router = useRouter()

    const handleActionPress = () => {
        router.push("/(pages)/scan")
    }

    const notificationData = userData?.notificationData || []

    const renderItem = ({ item }: { item: NotificationItem }) => (
        <View style={styles.card}>
            <View style={styles.cardLeft}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>

            {item.type === 'action' && (
                <TouchableOpacity
                    onPress={handleActionPress}
                    style={[styles.button, { backgroundColor: theme.colors.primary }]}
                >
                    <Text style={styles.buttonText}>{item.buttonText}</Text>
                </TouchableOpacity>
            )}

            {item.type === 'info' && item.icon && (
                <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={28} color={item.iconColor || '#000'} />
            )}

            {item.type === 'reminder' && (
                <View style={[styles.badgeContainer, { backgroundColor: item.badgeColor || '#8B5CF6' }]}>
                    <Text style={styles.badge}>{item.badge}</Text>
                    <Text style={styles.badgeLabel}>{item.badgeText}</Text>
                </View>
            )}
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={notificationData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    list: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 50
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 }
    },
    cardLeft: {
        flex: 1,
        paddingRight: 10
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111827'
    },
    time: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600'
    },
    badgeContainer: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20
    },
    badge: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    badgeLabel: {
        color: '#fff',
        fontSize: 11
    }
})
