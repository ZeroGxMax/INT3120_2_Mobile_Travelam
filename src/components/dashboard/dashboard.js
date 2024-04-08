import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HomeBanner from './home_banner/home_banner';

import RcmBody from './home_rcm/rcm_body/rcm_body';

export default function Dashboard() {
    return (
        <View style={styles.container}>
            
            <View style={styles.bufferBlock} />

            <View style={styles.banner}>
                <HomeBanner />
            </View>

            {/* <Text style={styles.text}>Hello World</Text> */}
            
            <View style={styles.rcmBody}>
                <RcmBody/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    bufferBlock: {
        height: 20,
    },
    banner: {
        height: 200,
        width: '100%',
        backgroundColor: 'grey',
    },
    text: {
        height: 100,
        fontSize: 20,
        color: 'black', 
        backgroundColor: "blue",
        textAlign: "left"
    },
    rcmBody: {
        height: 100
    }
});
