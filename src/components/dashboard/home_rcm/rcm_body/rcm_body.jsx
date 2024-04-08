import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import RcmBlock from './rcm_block/rcm_block';
// import MdRcmBlock from './md_rcm_block/md_rcm_block';
// import BigRcmBlock from './brcm_block/big_rcm_block';


export default class RcmBody extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RcmBlock/>

                <View style={styles.rcmBody}>
                    
                </View>
            </View>
        );
    }
}

const styles = {

};
