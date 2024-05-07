import { View, Text, FlatList, ImageBackground, Animated, Dimensions, Image, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from './PackageScreenContent/style';
import { getTourByCountryId } from '../services/firebase/tours';
import PackageCard from './PackageScreenContent/PackageCard';

const PackageScreen = ({ route }) => {
    const navigation = useNavigation();

    const { width, height } = Dimensions.get("screen");
    const { country } = route.params
    const [tours, setTours] = useState([]);

    useEffect(() => {
        // Fetch tours data by country id
        const fetchToursData = async () => {
            try {
                const toursData = await getTourByCountryId(country.id);
                setTours(toursData);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };

        fetchToursData();
    }, [country.id]);

    handlePress = (id) => {
        navigation.navigate("Details")
    };

    return (
        <View>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={tours}
                renderItem={({ item, index }) => {
                    if (index === 0) { // Render the image background for the first item
                        return (
                            <View style={{ width: width, height: 250 }}>
                                <ImageBackground
                                    source={{ uri: country.demoImage }}
                                    style={styles.backgroundImage}
                                >
                                    <View style={styles.textView}>
                                        <Text style={styles.title}>
                                            {country.countryName}
                                        </Text>
                                    </View>
                                </ImageBackground>

                            </View>
                        );
                    } else { // Render other items using PackageCard component
                        return (
                            <PackageCard
                                title={item.title}
                                image={item.demoImage}
                                description={item.description}
                                onPress={() => handlePress(item.id)}
                            />
                        );
                    }
                }}
                keyExtractor={(item, index) => index.toString()} // Key extractor to avoid key warning
            />
        </View>
    );
}

export default PackageScreen