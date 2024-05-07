import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './DiscoverScreenContent/style';
import { colors } from "../assets/colors/colors"
import { Avatar } from '../assets';

import DiscoverItem from './DiscoverScreenContent/DiscoverItem';
import CountryPackage from './DiscoverScreenContent/CountryPackage';
import { getTourByCountryId, getAllTours, getTourById } from '../services/firebase/tours';
import { getCountryFromId, getCountryFromName, getAllCountry } from "../services/firebase/country";
import LoadingView from '../components/utils/LoadingView';


const Discover = () => {

    const navigation = useNavigation();

    const [country, setCountry] = useState([])
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    const countryName = "France"

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch all country
                const allCountryData = await getAllCountry();
                setCountry(allCountryData)

                // Fetch country data by name
                const countryData = await getCountryFromName(countryName);
                // If country data is found, fetch tours by countryId
                if (countryData) {
                    const toursData = await getTourByCountryId(countryData.id);
                    setTours(toursData);
                    setLoading(false);
                    // console.log(tours[1].demoImage)
                } else {
                    console.log(`Country with name "${countryName}" not found.`);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [countryName]);

    if (loading) {
        return <LoadingView />;
    }

    return (
        <ScrollView style={styles.container}>

            {/* Header */}
            <SafeAreaView>
                <View style={styles.menuWrapper}>
                    <Feather
                        name="menu"
                        size={32}
                        color={colors.black}
                        style={styles.menuIcon}
                    />
                    <Image source={Avatar} style={styles.profileImage} />
                </View>
            </SafeAreaView>

            {/* Discover */}
            <View style={styles.discoverWrapper}>
                <Text style={styles.discoverTitle}>Discover</Text>
                <View style={styles.discoverCategoriesWrapper}>
                    <Text style={[styles.discoverCategoryText, { color: colors.orange }]}>
                        All
                    </Text>
                    <Text style={styles.discoverCategoryText}>Destinations</Text>
                    <Text style={styles.discoverCategoryText}>Cities</Text>
                    <Text style={styles.discoverCategoryText}>Experiences</Text>
                </View>
                <View style={styles.discoverItemsWrapper}>
                    <FlatList
                        data={country}
                        renderItem={({ item }) => <CountryPackage item={item} />}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

        </ScrollView>
    )
}

export default Discover