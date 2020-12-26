import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/index';

const { primaryColor, secondaryColor, borderColor } = colors;

export default function ReloadIcon({ load }) {

    const refreshIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh';
    console.log(refreshIconName);
    return (
        <View >
            <Ionicons onPress={load} name={refreshIconName} size={24} color={primaryColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    reloadIcon: {
        position: "absolute",
        top: 30,
        right: 20,
    }
})
