import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class BannerImg extends React.Component {
    render() {
        return (
            <View style={styles.bannerWrapper}>
                <View style={styles.banner}>
                    <Image
                        source={{ uri: this.props.src }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                    <View style={styles.bannerInfo}>
                        <Text style={styles.bannerHeader}>{this.props.name}</Text>
                        <Text style={styles.bannerDesc}>{this.props.desc}</Text>
                    </View>
                </View>
                <View style={styles.blackComponent}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bannerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    banner: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    bannerImage: {
        width: 100, // Adjust as needed
        height: 100, // Adjust as needed
        borderRadius: 8, // Adjust as needed
    },
    bannerInfo: {
        marginLeft: 10,
    },
    bannerHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bannerDesc: {
        fontSize: 14,
        color: 'gray',
    },
    blackComponent: {
        width: 10, // Adjust as needed
        height: '100%', // Adjust as needed
        backgroundColor: 'black', // Adjust as needed
    },
});
