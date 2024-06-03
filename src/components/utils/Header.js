import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate('Discover'); // Navigate to the "Discover" screen
    };

    return (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        marginLeft: 16,
    },
    backText: {
        fontSize: 16,
        color: '#007bff',
    },
});

export default CustomHeader;
