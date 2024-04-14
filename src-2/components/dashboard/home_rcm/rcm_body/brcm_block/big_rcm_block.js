import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import BigRcmCard from "./big_rcm_card";

export default class BigRcmBlock extends Component {
    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.rcmBlock}>
                    <Box>
                        Hello
                    </Box>
                </View>
            </NativeBaseProvider>
        );
    }
}

const styles = StyleSheet.create({
    rcmBlock: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
