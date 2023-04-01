import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ButtonIcon({ onPress, icon }: { onPress: any, icon: any }) {

    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name={icon} size={32} color="#4b4b4b" />
            </TouchableOpacity>
        </View>
    );
}