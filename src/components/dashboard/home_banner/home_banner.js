import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BannerImg from './banner_img/banner_img';

const imageURL = "https://npca.s3.amazonaws.com/images/8706/591ff182-b7f9-4da1-9c16-c29e0ace3dc4-banner.jpg?1445970338";

// Mock data for testing purposes
const mockBannerData = [
    { demoImage: imageURL, title: 'Banner 1', description: 'Description 1' },
    { demoImage: imageURL, title: 'Banner 2', description: 'Description 2' },
    { demoImage: imageURL, title: 'Banner 3', description: 'Description 3' },
];

const HomeBanner = () => {
    return (
        <View style={styles.container}>
            {/* <Carousel
                data={mockBannerData}
                renderItem={({ item, index }) => (
                    <BannerImg
                        src={item.demoImage}
                        name={item.title}
                        desc={item.description}
                        key={index}
                    />
                )}
                autoplay
                autoplayInterval={500}
                windowSize={1} // Set windowSize prop to 1 or greater
            /> */}
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
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    textContainer: {
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
