import { featuresItems } from '@/strings/links';
import theme from '@/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, RelativePathString } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const HomeFeature = () => {
    const numColumns = 3;

    return (
        <View style={styles.featureGrid}>
            {featuresItems.map((item, i) => {
                const isLastColumn = (i + 1) % numColumns === 0;
                const isLastRow = i >= featuresItems.length - numColumns;
                return (
                    <React.Fragment key={i}>
                        <Link href={item.href as RelativePathString} asChild style={isLastRow && { borderTopWidth: 1, borderTopColor: theme.colors.muted }}>
                            <Pressable style={styles.featureItem}>
                                <View style={styles.featureIconBox}>
                                    <MaterialIcons name={item.icon as any} size={24} color={theme.colors.primary} />
                                </View>
                                <Text style={styles.featureLabel}>{item.label}</Text>
                            </Pressable>
                        </Link>
                        {!isLastColumn && <View style={{ width: 1, backgroundColor: theme.colors.muted }} key={i} />}
                    </React.Fragment>
                )
            })}
        </View>
    );
};

export default HomeFeature;

const styles = StyleSheet.create({
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 16,
        elevation: 2,
    },
    featureItem: {
        width: "33%",
        alignItems: 'center',
        paddingVertical: 20,
    },
    featureIconBox: {
        backgroundColor: '#EDE9FE',
        padding: 10,
        borderRadius: 999,
        marginBottom: 6,
    },
    featureLabel: {
        fontSize: 11,
        color: '#374151',
    },
});
