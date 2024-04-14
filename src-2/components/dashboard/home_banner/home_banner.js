import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BannerImg from './banner_img/banner_img';
import Swiper from 'react-native-swiper';

const imageURL_1 = "https://npca.s3.amazonaws.com/images/8706/591ff182-b7f9-4da1-9c16-c29e0ace3dc4-banner.jpg?1445970338";
const imageURL_2 = "https://wallpapers.com/images/hd/animated-disney-castle-has6vy47k75d0bzs.jpg";
const imageURL_3 = "https://images7.alphacoders.com/976/976737.jpg";


// Mock data for testing purposes
const mockBannerData = [
    { demoImage: imageURL_1, title: 'Banner 1', description: 'Description 1' },
    { demoImage: imageURL_2, title: 'Banner 2', description: 'Description 2' },
    { demoImage: imageURL_3, title: 'Banner 3', description: 'Description 3' },
];

const HomeBanner = () => {
    return (
        <View style={styles.container}>
            <Swiper
                autoplay={true}
                autoplayTimeout={500} 
                showsPagination={false}
            >
                {mockBannerData.map((item, index) => (
                    <BannerImg
                        key={index}
                        src={item.demoImage}
                        name={item.title}
                        desc={item.description}
                    />
                ))}
            </Swiper>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Plan your next </Text>
                <Text style={styles.hassleFree}>Hassle-free </Text>
                <Text style={styles.text}>holiday</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: "absolute",
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontWeight: '700',
        color: 'white',
        fontSize: 18,
    },
    hassleFree: {
        fontFamily: 'serif',
        fontStyle: 'normal',
        color: '#98ff53',
        fontSize: 18,
    },
});

export default HomeBanner;
