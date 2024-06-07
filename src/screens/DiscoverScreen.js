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
import { getBestTours, getAllTours } from '../services/firebase/tours';
import { getAllCountry } from "../services/firebase/country";
import LoadingView from '../components/utils/LoadingView';
import { firebaseApp } from '../services/firebaseService';
import { ref, get, getDatabase, set } from "firebase/database";
import * as Notifications from 'expo-notifications';
import { sendPushNotification } from '../utils/notificationUtils';
import { getUserNotification, markPushedNotifications } from '../services/firebase/notification';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../services/notificationService';

const Discover = ({route}) => {

    const navigation = useNavigation();

    const [country, setCountry] = useState([])
    const [bestTours, setBestTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [notification, setNotification] = useState(null);
    const [unreadsCount, setUnreadsCount] = useState(0);

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
                await handleNotification(fetchNotifications)
                let count = 0;
                fetchNotifications.forEach((noti) => {
                    if (!noti.read) {
                        count++;
                    }
                })
                setUnreadsCount(count)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();

        if (route.params?.refresh) {
            fetchData();
        }
    }, [route.params?.refresh]);

    const handleLogout = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };

    const handleNotification = async (fetchNotifications) => {
        const now = new Date();
        // console.log(notification);

        for (const noti of fetchNotifications) {
            const notificationDate = new Date(noti.notification_date);

            if (!noti.pushed && notificationDate < now) {
                await sendPushNotification(noti.push_token, noti.title, noti.body);
                await markPushedNotifications(noti.id);
            }
        }
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
                <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
                    <View style={{ position: "relative", "flexDirection": "row"}}>
                        <Icon
                            name={unreadsCount > 0 ? "notifications" : "notifications-none"}
                            size={28}
                            color={colors.white}
                        />
                        {unreadsCount > 0 && (
                            <View style={sty.notificationBadge}>
                                <Text style={sty.notificationBadgeText}>{unreadsCount}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>

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
                        <TouchableOpacity 
                            style={styles.inputContainer}
                            onPress={() => navigation.navigate("Search Tours")}
                        >
                            <Icon name="search" size={28} />
                            <TextInput
                                placeholder="Search place                                             "
                                style={{ color: colors.grey, marginLeft: 10 }}
                                onPress={() => navigation.navigate("Search Tours")}
                            />
                        </TouchableOpacity>
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
                // onPress={() => schedulePushNotification("Explore new island", "It's available for customizing new tour")}
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
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: 0,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    notificationIcon: {
        position: "absolute"
    }
})