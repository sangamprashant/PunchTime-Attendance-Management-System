import { useUserData } from '@/context/UserDataContext';
import theme from '@/theme';
import React, { JSX } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function AnnouncementsScreen(): JSX.Element {
    const { userData } = useUserData()
    const announcements = userData?.announcementsData || []

    return (
        <ScrollView style={styles.container}>
            <View style={styles.announcementContainer}>
                {announcements.map((item: Announcement, index: number) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.dateText}>
                            {new Date(item.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.tag}>{item.type}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    announcementContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 4,
        color: "#111827",
    },
    description: {
        fontSize: 14,
        color: "#4B5563",
        marginTop: 6,
    },
    dateText: {
        fontSize: 12,
        color: "#6B7280",
    },
    tag: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: "600",
        color: theme.colors.primary,
        alignSelf: 'flex-end',
    },
});
