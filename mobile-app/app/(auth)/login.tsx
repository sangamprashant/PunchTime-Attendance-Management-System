import { useStatusBar } from '@/context/StatusBarContext';
import { useUserData } from '@/context/UserDataContext';
import theme from '@/theme';
import errorMessage from '@/utility/errorMessage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

export default function ModernLogin() {
    const { login } = useUserData()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { width } = useWindowDimensions();
    const [loading, setLoading] = useState<boolean>(false)

    const { setStyle, setBackgroundColor } = useStatusBar();
    useFocusEffect(
        useCallback(() => {
            setBackgroundColor(theme.colors.primary);
            setStyle(theme.statusBar.light.style);
        }, [])
    );

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const t: boolean = await login(username, password)
            console.log(t)
        } catch (error) {
            Alert.alert("", errorMessage(error))
        } finally {
            setLoading(false)
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.headerWrapper}>
                    <Image
                        source={require('@/assets/images/auth/bg-auth.png')}
                        style={[styles.bg, { width }]}
                        resizeMode="cover"
                    />
                    <View style={styles.logoContainer}>
                        <View style={styles.logoBox}>
                            <Image
                                source={require('@/assets/images/favicon.png')}
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Image
                        source={require('@/assets/images/auth/welcome.png')}
                        resizeMode="contain"
                        style={styles.illustration}
                    />
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Login to continue</Text>
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
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? "Loaging" : "Login"}</Text>
                        <FontAwesome name="long-arrow-right" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerWrapper: {
        height: 220,
        position: 'relative',
    },
    bg: {
        position: 'absolute',
        height: '100%',
        bottom: 0,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    logoBox: {
        backgroundColor: "#ffffff",
        padding: 8,
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    icon: {
        height: 60,
        width: 60,
    },
    card: {
        marginTop: -30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    illustration: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#F9FAFB',
        padding: 14,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginTop: 10,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
