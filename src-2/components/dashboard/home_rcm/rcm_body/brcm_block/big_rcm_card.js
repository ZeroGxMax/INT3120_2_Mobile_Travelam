import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Mock data
const mockCountry = {
    id: '1',
    name: 'USA',
    desc: 'The United States of America, often referred to as the USA, is a vast and dynamic nation encompassing 50 states, each with its own distinct character. From the towering skyscrapers of Manhattan to the sun-drenched beaches of California, the USA is a land of contrasts and opportunities. Immerse yourself in the cultural diversity of cities like Los Angeles, experience the historical significance of Washington, D.C., and explore the natural wonders of Yellowstone National Park. Whether you are drawn to the glamour of Hollywood, the tech innovation of Silicon Valley, or the jazz-filled streets of New Orleans, the USA has something to offer every traveler.',
    src: 'https://www.goworldtravel.com/wp-content/uploads/2020/03/travel-landscapes-usa.jpg',
};

export default class BigRcmCard extends Component {

    render() {
        const { id, name, desc, src } = mockCountry;

        return (
            <View style={styles.brcmCardWrapper}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.imgWrapper} onPress={this.onclick}>
                            <Image
                                source={{ uri: src }}
                                style={styles.img}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>

                        <View style={styles.infoWrapper}>
                            <Text style={styles.header}>{name}</Text>
                            <Text style={styles.desc}>{desc}</Text>

                            <View style={styles.interContainer}>
                                <TouchableOpacity style={styles.choice} onPress={this.onclick}>
                                    <View>
                                        <Text style={styles.know}>Know more</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});
