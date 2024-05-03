import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RcmCard = (props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.cardWrapper} className="bg-[#F6F6F6]" onPress={() => navigation.navigate("Home")}>
            <Image source={{ uri: props.src }} style={styles.cardImage} resizeMode='stretch' />
            <View style={styles.footerBlack} ></View>
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
        top: '75%',
        left: 0,
        width: '100%',
        height: 60,
        backgroundColor: 'black',
        opacity: 0.6,
        borderRadius: 7,
        transform: [{ rotate: '180deg' }],
    },
    infoWrapper: {
        position: 'absolute',
        top: '79%',
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