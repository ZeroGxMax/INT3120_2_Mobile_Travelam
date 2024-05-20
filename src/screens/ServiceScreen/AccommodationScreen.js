import { View, Text, FlatList, ImageBackground, Animated, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../PackageScreenContent/style';
import { getAllAccommodation } from '../../services/firebase/accom';
import ServicePackageCard from './ServiceScreenContent/ServicePackageCard';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../assets/colors/colors';
import LoadingView from '../../components/utils/LoadingView';

const AccommodationScreen = () => {
    const navigation = useNavigation();

    const { width, height } = Dimensions.get("screen");
    const [accommodation, setAccommodation] = useState([]);
    const [loading, setLoading] = useState(true);

    function separateLinks(links) {
        const linksArray = links.split(',');

        const trimmedLinks = linksArray.map(link => link.trim());

        return trimmedLinks;
    }

    useEffect(() => {
        const fetchAccommodationData = async () => {
            try {
                const accommodationData = await getAllAccommodation();
                setAccommodation(accommodationData);
                setLoading(false);
                // console.log(separateLinks(accommodationData.data[0].demoImage)[0])
            } catch (error) {
                console.error('Error fetching accommodation:', error);
                setLoading(false);
            }
        };

        fetchAccommodationData();
    }, []);

    const handlePress = (item) => {
        navigation.navigate('AccomDetail', {
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
                data={accommodation}
                renderItem={({ item, index }) => {
                    if (index == 0) {
                        return (
                            <View style={{ width: width, height: 250 }}>
                                <ImageBackground
                                    source={{ uri: separateLinks(accommodation[0].demoImage)[0] }}
                                    style={styles.backgroundImage}
                                >
                                    <TouchableOpacity
                                        style={styles.backIcon}
                                        onPress={() => navigation.goBack()}>
                                        <Entypo name="chevron-left" size={32} color={colors.white} />
                                    </TouchableOpacity>
                                    <View style={styles.textView}>
                                        <Text style={styles.title}>
                                            Accommodation
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

export default AccommodationScreen