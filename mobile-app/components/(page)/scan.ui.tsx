import theme from '@/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';

const ScanUi = () => {
    const lineAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(lineAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(lineAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const lineTranslateY = lineAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.7 - 4],
    });

    return (
        <View style={styles.scanBoxContainer}>
            <View style={styles.scanBox}>
                <Animated.View
                    style={[
                        styles.scanLine,
                        {
                            transform: [{ translateY: lineTranslateY }],
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export { ScanUi };

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    scanBoxContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    scanBox: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 2,
        borderColor: '#EC4899',
        borderRadius: 12,
        overflow: 'hidden',
    },
    scanLine: {
        width: '100%',
        height: 2,
        backgroundColor: theme.colors.primary,
        position: 'absolute',
        top: 0,
    },
});
