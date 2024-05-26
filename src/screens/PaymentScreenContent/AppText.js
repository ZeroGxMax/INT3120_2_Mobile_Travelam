import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AppText = ({ text, customStyles }) => {
    return (
        <Text style={[styles.defaultText, customStyles]}>
            {text}
        </Text>
    );
};

export default AppText;

const styles = StyleSheet.create({
    defaultText: {
        fontSize: 16,
        color: 'black',
    },
});