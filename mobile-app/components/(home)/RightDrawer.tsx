import { useUserData } from '@/context/UserDataContext';
import theme from '@/theme';
import { AntDesign } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    Image,
} from 'react-native';

interface RightDrawerProps {
    visible: boolean;
    onClose: () => void;
}

const RightDrawer: React.FC<RightDrawerProps> = ({ visible, onClose }) => {
    const { clearStorage } = useUserData()
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.out(Easing.poly(4)),
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: Dimensions.get('window').width,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.in(Easing.poly(4)),
            }).start();
        }
    }, [visible]);

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.drawer,
                        { transform: [{ translateX: slideAnim }] },
                    ]}
                >
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center" }}>
                        <View style={styles.header}>
                            <Image
                                source={require('@/assets/images/favicon.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>Punch Time</Text>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <AntDesign name="close" size={24} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.options}>
                        <Text style={styles.optionText}>Punch In</Text>
                        <Text style={styles.optionText}>Attendance Log</Text>
                        <Text style={styles.optionText}>Settings</Text>
                        {/* Add more options here */}
                    </View>

                    <TouchableOpacity onPress={clearStorage} style={styles.closeButton}>
                        <Text style={styles.closeText}>Logout</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    drawer: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: width * 0.75,
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: -2, height: 0 },
        shadowRadius: 5,
        elevation: 10,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.primary,
    },
    options: {
        flex: 1,
    },
    optionText: {
        fontSize: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        color: '#444',
    },
    closeButton: {
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginTop: 20,
    },
    closeText: {
        color: "red",
        fontWeight: '500',
    },
});

export default RightDrawer;
