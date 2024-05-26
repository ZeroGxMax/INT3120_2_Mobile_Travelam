import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const Screen = ({ children, customStyles }) => {
    return <SafeAreaView style={[styles.container, customStyles]}>{children}</SafeAreaView>;
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        textAlign: "center"
    },
});