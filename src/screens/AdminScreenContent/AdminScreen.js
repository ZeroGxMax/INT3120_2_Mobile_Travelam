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
        image: "https://i0.wp.com/crmviet.vn/wp-content/uploads/2019/09/Account-executive-la-gi.jpeg?ssl=1",
        color: "#6FDCE3",
        props: ["avatar", "name", "email", "phoneNumber"]
    }, {
        title: "Tours",
        image: "https://sascotravel.com/wp-content/uploads/2020/03/vietnamfood.jpg",
        color: "#799351",
        props: ["demoImage", "title", "description", "startDate"]

    }, {
        title: "Destinations",
        image: "https://static.independent.co.uk/2023/08/02/10/iStock-1185953092.jpg",
        color: "#FFCBCB",
        props: ["demoImage", "name", "description", "additionInfo"]
    }, {
        title: "Accommodations",
        image: "https://media.edinburgh.org/wp-content/uploads/2023/04/23154056/The-Balmoral-Executive-View-Room-e1682260891619.jpg",
        color: "#A67B5B",
        props: ["demoImage", "name", "description", "additionInfo"]
    }, {
        title: "Restaurants",
        image: "https://assets.bonappetit.com/photos/610aa6ddc50e2f9f7c42f7f8/master/pass/Savage-2019-top-50-busy-restaurant.jpg",
        color: "#7469B6",
        props: ["demoImage", "name", "description", "additionInfo"]
    }, {
        title: "Transportations",
        image: "https://media.licdn.com/dms/image/C4D12AQEPXQ5xqNO6AQ/article-cover_image-shrink_720_1280/0/1520226744294?e=2147483647&v=beta&t=HN1j9g7gDTgPlcffpmRzSZI-H2WE6V1UTgRawQlVeRA",
        color: "#387ADF",
        props: ["demoImage", "type", "additionInfo", "type"]
    }, {
        title: "Activities",
        image: "https://etimg.etb2bimg.com/photo/78330532.cms",
        color: "#EADBC8",
        props: ["demoImage", "name", "description", "additionInfo"]
    }, {
        title: "Transactions",
        image: "https://vietnaminsider.vn/wp-content/uploads/2023/11/hnmo_visa_tourism_26.jpeg",
        color: "#192655",
        props: ["Tour", "Username"]
    }, {
        title: "Feedbacks",
        image: "https://media.licdn.com/dms/image/D5612AQG-74Wtpgb5DQ/article-cover_image-shrink_720_1280/0/1694745417786?e=2147483647&v=beta&t=uBbLo74tazUF41tHLxz724R9HO_H8AbNMiwh6fBYoPE",
        color: "#A34343",
        props: ["avatar", "request", "user", "addtitionInfo"]
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