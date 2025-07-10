import SafeAreaWrapper from '@/components/SafeAreaWrapper';
import { useStatusBar } from '@/context/StatusBarContext';
import theme from '@/theme';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image,
} from 'react-native';

const LoginScreen = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const { setStyle, setBackgroundColor } = useStatusBar()

    useFocusEffect(
        useCallback(() => {
            setBackgroundColor(theme.statusBar.dark.backgroundColor);
            setStyle(theme.statusBar.dark.style);
        }, [])
    );

    const handleLogin = () => {
        if (!employeeId || !password) {
            Alert.alert('Login Failed', 'Please enter both Employee ID and Password.');
            return;
        }

        // TODO: Replace with API logic
        console.log('Login:', { employeeId, password });

        // on success
        router.replace("/(main)/home")
    };

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.card}>
                    {/* Logo */}
                    <Image
                        source={require('../../assets/images/auth/login.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    {/* Title */}
                    <Text style={styles.title}>PunchTime Login</Text>

                    {/* Inputs */}
                    <TextInput
                        style={styles.input}
                        placeholder="Employee ID"
                        placeholderTextColor={theme.colors.textLight}
                        value={employeeId}
                        onChangeText={setEmployeeId}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={theme.colors.textLight}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Login Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(6),
    },
    card: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing(0),
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: theme.spacing(4),
    },
    title: {
        ...theme.font.h1,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: theme.spacing(6),
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: theme.colors.muted,
        borderRadius: theme.radius.sm,
        padding: theme.spacing(3),
        fontSize: 16,
        color: theme.colors.textDark,
        marginBottom: theme.spacing(4),
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing(3),
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: theme.colors.background,
        ...theme.font.h2,
    },
});
