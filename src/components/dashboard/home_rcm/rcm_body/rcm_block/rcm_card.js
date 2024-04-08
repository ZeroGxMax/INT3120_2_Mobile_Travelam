import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const RcmCard = (props) => {
    return (
        <TouchableOpacity style={styles.cardWrapper}>
            <Image source={{ uri: props.src }} style={styles.cardImage} resizeMode='stretch' />
            <View style={styles.footerBlack}></View>
            <View style={styles.infoWrapper}>
                <Text style={styles.info}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        position: "relative",
        width: 180,
        overflow: 'hidden',
        borderRadius: 5,
        shadowColor: '#888888',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    footerBlack: {
        position: 'absolute',
        top: '70%',
        left: 0,
        width: '100%',
        height: 70,
        backgroundColor: 'black',
        opacity: 0.5,
        borderRadius: 7,
        transform: [{ rotate: '180deg' }],
    },
    infoWrapper: {
        position: 'absolute',
        top: '75%',
        width: '100%',
        textAlign: "center",
        paddingVertical: 0,
        paddingHorizontal: 20,
    },
    info: {
        fontSize: 14,
        color: 'white',
        textAlign: 'left',
        fontWeight: '600',
    },
});

export default RcmCard;
