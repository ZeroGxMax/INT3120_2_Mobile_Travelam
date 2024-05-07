import { View, Text, FlatList, ImageBackground, Animated, Dimensions, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from './PackageScreenContent/style';
import { getTourByCountryId } from '../services/firebase/tours';
import PackageCard from './PackageScreenContent/PackageCard';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../assets/colors/colors';
import LoadingView from '../components/utils/LoadingView';

const PackageScreen = ({ route }) => {
    const navigation = useNavigation();

    const { width, height } = Dimensions.get("screen");
    const { country } = route.params
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch tours data by country id
        const fetchToursData = async () => {
            try {
                const toursData = await getTourByCountryId(country.id);
                setTours(toursData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tours:', error);
                setLoading(false);
            }
        };

        fetchToursData();
    }, [country.id]);

    handlePress = (item) => {
        navigation.navigate('Detail', {
            item: item,
        })
    };

    if (loading) {
        return <LoadingView />;
    }

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
                                    <TouchableOpacity
                                        style={styles.backIcon}
                                        onPress={() => navigation.goBack()}>
                                        <Entypo name="chevron-left" size={32} color={colors.white} />
                                    </TouchableOpacity>
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
                                onPress={() => handlePress(item)}
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