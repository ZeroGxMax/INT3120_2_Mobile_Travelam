import { View, Text, Button, Alert, SafeAreaView, Image, ScrollView, StatusBar, FlatList, TouchableOpacity, Dimensions, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import { colors } from "../../assets/colors/colors"
import { Avatar } from '../../assets';

import ManagementContent from './ManagementContent';
import RecommendedCard from '../DiscoverScreenContent/RecommendedCard';
import ListCategories from '../DiscoverScreenContent/ListCategories';
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseService"
import { getTourByCountryId, getAllTours, getTourById, getBestTours } from '../../services/firebase/tours';
import { getCountryFromId, getCountryFromName, getAllCountry } from "../../services/firebase/country";
import LoadingView from '../../components/utils/LoadingView';

const { width, height } = Dimensions.get("screen");

const AdminScreen = () => {

    const navigation = useNavigation();

    const managementList = [{
        title: "Accounts",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#6FDCE3",
        props: ["Name", "Email"]
    }, {
        title: "Tours",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#FDE49E",
        props: ["Title", "Description"]
    }, {
        title: "Destinations",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#FFCBCB",
        props: ["Name", "Description"]
    }, {
        title: "Accommodations",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#FC4100",
        props: ["Name", "Description"]
    }, {
        title: "Restaurants",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#74E291",
        props: ["Name", "Description"]
    }, {
        title: "Transportations",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#387ADF",
        props: ["Type", "AdditionInfo"]

    }, {
        title: "Activities",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#A2C579",
        props: ["Name", "Description"]
    }, {
        title: "Transactions",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#192655",
        props: ["Tour", "Username"]
    }, {
        title: "Feedbacks",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#192655",
        props: ["User", "Description"]
    }]

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
            <StatusBar translucent={false} backgroundColor={colors.primary} />
            <View style={styles.header}>
                <Icon
                    name="sort"
                    size={28}
                    color={colors.white}
                    onPress={() => navigation.navigate("Options")} />
                <Icon name="notifications-none" size={28} color={colors.white} />
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Management</Text>
                <View style={{ 
                    flexDirection: "row", 
                    width: 390, 
                    flexWrap: "wrap", 
                    justifyContent: "center",
                    marginLeft: 15
                }}>
                    {managementList.map((item) => (
                        <ManagementContent item={item} />
                    ))}
                </View>
            </ScrollView>
        </ScrollView>

    )
}

export default AdminScreen

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