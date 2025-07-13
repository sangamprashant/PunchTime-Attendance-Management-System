import theme from '@/theme'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const CurveHeaderWrapper = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerBackground} />
            <View style={styles.content}>
                {children}
            </View>
        </ScrollView>
    )
}

export default CurveHeaderWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    headerBackground: {
        backgroundColor: theme.colors.primary,
        height: 200,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    content: {
        padding: 20,
        paddingTop: 20,
        zIndex: 2,
    },
})