import React from 'react'
// import { Picker } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet } from 'react-native';

export default function UnitsPicker({ unitSystem, setUnitSystem }) {
    return (
        <View style={styles.unitSystem}>
            <Picker
                selectedValue={unitSystem}
                onValueChange={(value, index) => { setUnitSystem(value) }}
                mode="dropdown"
                itemStyle={{ fontSize: 12 }}>
                <Picker.Item label='C°' value='metric' />
                <Picker.Item label='F°' value='imperial' />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitSystem: {
        height: 50,
        width: 100,
    }
})
