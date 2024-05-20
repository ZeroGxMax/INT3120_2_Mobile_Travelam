import { View, Text, FlatList, ImageBackground, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../PackageScreenContent/style';
import { getAllRestaurants } from '../../services/firebase/rest';
import ServicePackageCard from './ServiceScreenContent/ServicePackageCard';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../assets/colors/colors';
import LoadingView from '../../components/utils/LoadingView';

const RestaurantScreen = () => {
    const navigation = useNavigation();

    const { width, height } = Dimensions.get("screen");
    const [restaurant, setRestaurant] = useState([]);
    const [loading, setLoading] = useState(true);

    function separateLinks(links) {
        const linksArray = links.split(',');

        const trimmedLinks = linksArray.map(link => link.trim());

        return trimmedLinks;
    }

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const restaurantData = await getAllRestaurants();
                setRestaurant(restaurantData);
                setLoading(false);
                // console.log(separateLinks(restaurantData.data[0].demoImage)[0])
            } catch (error) {
                console.error('Error fetching restaurant:', error);
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, []);

    const handlePress = (item) => {
        navigation.navigate('RestDetail', {
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
                data={restaurant}
                renderItem={({ item, index }) => {
                    if (index == 0) {
                        return (
                            <View style={{ width: width, height: 250 }}>
                                <ImageBackground
                                    source={{ uri: separateLinks(restaurant[0].demoImage)[0] }}
                                    style={styles.backgroundImage}
                                >
                                    <TouchableOpacity
                                        style={styles.backIcon}
                                        onPress={() => navigation.goBack()}>
                                        <Entypo name="chevron-left" size={32} color={colors.white} />
                                    </TouchableOpacity>
                                    <View style={styles.textView}>
                                        <Text style={styles.title}>
                                            Restaurant
                                        </Text>
                                    </View>
                                </ImageBackground>

                            </View>
                        );
                    } else {
                        return (
                            <ServicePackageCard
                                title={item.name}
                                image={separateLinks(item.demoImage)[0]}
                                description={item.description}
                                onPress={() => handlePress(item)}
                            />
                        );
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

export default RestaurantScreen