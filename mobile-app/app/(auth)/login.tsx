import { useStatusBar } from '@/context/StatusBarContext';
import theme from '@/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

export default function ModernLogin() {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { width } = useWindowDimensions();

    const { setStyle, setBackgroundColor } = useStatusBar()
    useFocusEffect(
        useCallback(() => {
            setBackgroundColor(theme.colors.primary);
            setStyle(theme.statusBar.light.style);
        }, [])
    );

    const handleSubmit = () => {
        router.replace("/(main)/home")
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Header with background and logo */}
            <View style={styles.headerWrapper}>
                <Image
                    source={require('@/assets/images/auth/bg-auth.png')}
                    style={[styles.bg, { width }]}
                    resizeMode="cover"
                />
                <View style={styles.logoContainer}>
                    <View style={{
                        backgroundColor: "#ffffff", padding: 5, borderRadius: 10,
                        overflow: "hidden",
                        elevation: 2
                    }}>
                        <Image
                            source={require('@/assets/images/favicon.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            {/* Login Form */}
            <View style={styles.card}>
                <Text style={styles.title}>Welcome back!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#9CA3AF"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                    <FontAwesome name="long-arrow-right" size={15} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        height: 250,
        position: 'relative',
        overflow: 'hidden',
    },
    bg: {
        position: 'absolute',
        height: '100%',
        bottom: 0
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 60,
        width: 60,
        zIndex: 2,
    },
    card: {
        paddingHorizontal: 24,
        paddingTop: 90,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.primary,
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 12,
        borderRadius: 10,
        marginBottom: 14,
        fontSize: 16,
        color: '#111827',
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    optionText: {
        fontSize: 13,
        color: '#6B7280',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
        elevation: 2,
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: 6
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
    },
});
