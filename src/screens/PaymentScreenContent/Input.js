import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({ placeholder, customStyles }) => {
    return <TextInput placeholder={placeholder} style={[styles.input, customStyles]} />;
};

export default Input;

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});