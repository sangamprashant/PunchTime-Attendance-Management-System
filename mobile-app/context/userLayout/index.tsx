import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import theme from '@/theme';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            {/* App Icon */}
            <Image
                source={require('@/assets/images/favicon.png')} 
                style={styles.icon}
                resizeMode="contain"
            />

            {/* App Name */}
            <Text style={styles.appName}>Punchtime</Text>
            <Text style={styles.tagline}>Your time, well managed</Text>

            {/* Loading UI */}
            <View style={styles.loadingBox}>
                <Text style={styles.loadingText}>Loading...</Text>
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 4,
    },
    tagline: {
        fontSize: 14,
        color: theme.colors.textLight,
        marginBottom: 40,
    },
    loadingBox: {
        backgroundColor: theme.colors.primary,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        elevation: 4,
    },
    loadingText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12,
    },
    spinnerContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 6,
    },
});
