import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import RcmCard from './rcm_card';
import {Heading, NativeBaseProvider} from "native-base"

// Mock data for testing purposes
const mockTourData = [
    { id: 1, title: 'Paris & Louvre Exploration', demoImage: 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg' },
    { id: 2, title: 'Magical Japan Adventure', demoImage: 'https://c4.wallpaperflare.com/wallpaper/611/69/87/japan-mountains-mount-fuji-asian-architecture-wallpaper-preview.jpg' },
    { id: 3, title: 'Australian Wonders Expedition', demoImage: 'https://images4.alphacoders.com/743/743533.jpg' },
    { id: 4, title: 'Australian Wonders Expedition', demoImage: 'https://images4.alphacoders.com/743/743533.jpg' },
];

export default function RcmBlock(props) {
    const countryName = 'France';

    return (
        <View style={styles.rcmBlock}>
            <NativeBaseProvider>
                <Heading size="xl">{countryName}</Heading>
            </NativeBaseProvider>
            <ScrollView horizontal={true}>
                <View style={styles.cardContainer}>
                    {mockTourData.map((tour) => (
                        <View key={tour.id} style={styles.cardWrapper}>
                            <RcmCard id={tour.id} name={tour.title} src={tour.demoImage} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    rcmBlock: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        height: 235,
    },
    rcmTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardWrapper: {
        marginRight: 20,
    }
});
