import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

export default class BannerImg extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.props.src }}
                    style={[styles.bannerImage]}
                    resizeMode="cover"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bannerImage: {
        // aspectRatio: 2,
        flex: 1,
        borderRadius: 8,
    },
});
