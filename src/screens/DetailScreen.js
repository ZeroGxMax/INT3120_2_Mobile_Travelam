import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { colors } from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './DetailScreenContent/style';
import { getCountryIdFromTourId, getCountryFromId } from '../services/firebase/country';
import LoadingView from '../components/utils/LoadingView';
import SmallButton from '../components/SmallButton';

const height = Dimensions.get('window').height;

const DetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [countryId, setCountryId] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCountryId = await getCountryIdFromTourId(item.id);
                setCountryId(fetchedCountryId);

                const fetchedCountryData = await getCountryFromId(fetchedCountryId);
                setCountryData(fetchedCountryData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [item.id]);

    if (loading) {
        return <LoadingView />;
    }


    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: item.demoImage }}
                style={styles.backgroundImage}
            >

                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={32} color={colors.white} />
                </TouchableOpacity>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.locationWrapper}>
                        <Entypo name="location-pin" size={24} color={colors.white} />
                        <Text style={styles.locationText}>{countryData.countryName}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>
                <View style={styles.heartWrapper}>
                    <Entypo name="heart" size={32} color={colors.heart} />
                </View>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText} numberOfLines={7} ellipsizeMode="tail">{item.description}</Text>
                </View>

                <View style={styles.infoWrapper}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>PRICE</Text>
                        <View style={styles.infoTextWrapper}>
                            <Text style={styles.infoText}>${item.price}</Text>
                            <Text style={styles.infoSubText}>/person</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => alert('You booked a trip!')}>
                    <Text style={styles.buttonText}>Book Now</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => navigation.navigate(
                        "Destination",
                        {
                            id: countryId,
                            name: countryData.countryName
                        })}
                >
                    <Text style={styles.buttonText}>Customize</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default DetailScreen;