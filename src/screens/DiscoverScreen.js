<<<<<<< HEAD
import { View, Text, SafeAreaView, Image, ScrollView, StatusBar, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native';
=======
import { View, Text, Button, Alert, SafeAreaView, Image, ScrollView, StatusBar, FlatList, TouchableOpacity, Dimensions, TextInput, StyleSheet } from 'react-native';
>>>>>>> hieu
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './DiscoverScreenContent/style';
import { colors } from "../assets/colors/colors"
import { Avatar } from '../assets';

import CountryPackage from './DiscoverScreenContent/CountryPackage';
import RecommendedCard from './DiscoverScreenContent/RecommendedCard';
import ListCategories from './DiscoverScreenContent/ListCategories';
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseService"
import { getTourByCountryId, getAllTours, getTourById, getBestTours } from '../services/firebase/tours';
import { getCountryFromId, getCountryFromName, getAllCountry } from "../services/firebase/country";
import LoadingView from '../components/utils/LoadingView';
<<<<<<< HEAD
=======

>>>>>>> hieu


const Discover = () => {

    const navigation = useNavigation();

    const [country, setCountry] = useState([])
    const [bestTours, setBestTours] = useState([]);
    const [loading, setLoading] = useState(true);

    const {width} = Dimensions.get('screen');


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                const allCountryData = await getAllCountry();
                setCountry(allCountryData);
                
                // Fetch best tours
                const bestTours = await getBestTours();
                setBestTours(bestTours)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };

    if (loading) {
        return <LoadingView />;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar translucent={false} backgroundColor={colors.primary} />
            <View style={styles.header}>
                <Icon name="sort" size={28} color={colors.white} />
                <Icon name="notifications-none" size={28} color={colors.white} />
            </View>
            <ScrollView style={styles.container}>
                <View
                    style={{
                        backgroundColor: colors.primary,
                        height: 120,
                        paddingHorizontal: 20,
                    }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerTitle}>Explore the</Text>
                        <Text style={styles.headerTitle}>beautiful places</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="search" size={28} />
                            <TextInput
                                placeholder="Search place"
                                style={{ color: colors.grey }}
                            />
                        </View>
                    </View>
                </View>
                <ListCategories />

                {/* Recommended */}
                <Text style={styles.sectionTitle}>Countries</Text>
                <View>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingLeft: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={country}
                        renderItem={({ item }) => <CountryPackage item={item} />}
                    />
                    <Text style={styles.sectionTitle}>Recommended</Text>
                    <FlatList
                        snapToInterval={width - 20}
                        contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={bestTours}
                        renderItem={({ item }) => <RecommendedCard item={item} />}
                    />
                </View>
<<<<<<< HEAD
=======
                <TouchableOpacity
                    style={sty.buttonWrapper}
                    onPress={() => navigation.navigate("Customize")}
                >
                    <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>Customize New Tour</Text>
                </TouchableOpacity>
>>>>>>> hieu

            </ScrollView>
        </SafeAreaView>

    )
}

export default Discover

const sty = StyleSheet.create({
    buttonWrapper: {
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 15,
        backgroundColor: colors.green,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        color: "white"
    },
})