import { View, Text, Button, Alert, SafeAreaView, Image, ScrollView, StatusBar, FlatList, TouchableOpacity, Dimensions, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from './DiscoverScreenContent/style';
import { colors } from "../assets/colors/colors"
import { Avatar } from '../assets';

import CountryPackage from './DiscoverScreenContent/CountryPackage';
import RecommendedCard from './DiscoverScreenContent/RecommendedCard';
import ListCategories from './DiscoverScreenContent/ListCategories';
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseService"
import { getBestTours } from '../services/firebase/tours';
import { getAllCountry } from "../services/firebase/country";
import LoadingView from '../components/utils/LoadingView';
import { firebaseApp } from '../services/firebaseService';
import { ref, get, getDatabase, set } from "firebase/database";
import * as Notifications from 'expo-notifications';
import { sendPushNotification } from '../utils/notificationUtils';
import { getUserNotification } from '../services/firebase/notification';

const Discover = () => {

    const navigation = useNavigation();

    const [country, setCountry] = useState([])
    const [bestTours, setBestTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [notification, setNotification] = useState(null);

    const { width } = Dimensions.get('screen');

    const registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Notifications.requestPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus != 'granted') {
            return;
        }

        try {
            let token = (await Notifications.getExpoPushTokenAsync(
                { projectId: "6fa260c9-814c-44b4-b028-bd44e92022a3" }
            )).data;
            setToken(token)
            // console.log(token)
            const db = getDatabase(firebaseApp);
            await set(ref(db, 'customer/data/' + auth.currentUser.uid + '/push_token'), token);
        } catch (error) {
            console.log(error);
        }
    };


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
                await registerForPushNotificationsAsync();
                const fetchNotifications = await getUserNotification(auth.currentUser.uid);
                setNotification(fetchNotifications)
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
                <Icon
                    name="sort"
                    size={28}
                    color={colors.white}
                    onPress={() => navigation.navigate("Options")} />
                <Icon 
                    name="notifications-none" size={28} color={colors.white} 
                    onPress={() => navigation.navigate("Notifications")}
                />
            </View>
            {/* <TouchableOpacity onPress={async () => {
                sendPushNotification(token, "Demo", "Demo notifications")
            }}>
                <Text>Push notification</Text>
            </TouchableOpacity> */}
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
                <TouchableOpacity
                    style={sty.buttonWrapper}
                    onPress={() => navigation.navigate("Customize")}
                >
                    <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>Customize New Tour</Text>
                </TouchableOpacity>

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