import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeBanner from './home_banner/home_banner';

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <View style={styles.bufferBlock} />
            <View style={styles.banner}>
                <HomeBanner
                    src="https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg"
                    name="Paris"
                    desc="Paris is unarguably one of the most beautiful cities in the world, the capital of France, of art and of fashion. Climb to the top of the Eiffel Tower, stroll down the Champs Elysées, visit the Louvre, see many shows and exhibitions, or simply wander along the banks of the Seine...read in French in the Tuileries garden, and quite simply take the time to experience the Parisian way of life!"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    banner: {
        width: '100%',
        aspectRatio: 16 / 9, 
        backgroundColor: 'grey', 
    },
    bufferBlock: {
        height: 20
    }
});
