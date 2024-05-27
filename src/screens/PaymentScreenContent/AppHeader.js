import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../assets/colors/colors';

const AppHeader = ({ title, customTitleStyles }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Octicons name="chevron-left" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={[styles.title, customTitleStyles]}>{title}</Text>
        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white,
        flex: 1,
        textAlign: 'center',
    },
    backButton: {
        marginRight: 'auto',
    },
});
