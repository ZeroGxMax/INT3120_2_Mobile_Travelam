import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';

import { REACT_NATIVE_GOOGLE_PLACES_API_KEY } from "@env";
import { AttractionsIcon, Avatar, BluePin, ChevronDown, HotelIcon, NotFound, RestaurantsIcon, Search, TourIcon, TransportationIcon } from '../assets';
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData, getUserLocation } from '../api';
import RcmCard from './rcm_card';

const Discover = () => {

    const mockTourData = [
        { id: 1, title: 'Paris & Louvre Exploration', demoImage: 'https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg' },
        { id: 2, title: 'Magical Japan Adventure', demoImage: 'https://c4.wallpaperflare.com/wallpaper/611/69/87/japan-mountains-mount-fuji-asian-architecture-wallpaper-preview.jpg' },
        { id: 3, title: 'Australian Wonders Expedition', demoImage: 'https://images4.alphacoders.com/743/743533.jpg' },
        { id: 4, title: 'Kyoto Temples', demoImage: 'https://w0.peakpx.com/wallpaper/898/965/HD-wallpaper-kyoto-japan-temple-city-buildings-houses.jpg' },
    ];

    const ToursContent = () => (
        <>
            <View style={styles.rcmBlock}>
                <ScrollView horizontal={true}>
                    <View style={styles.cardContainer}>
                        {mockTourData.map((tour) => (
                            <View key={tour.id} style={styles.cardWrapper}>
                                <RcmCard id={tour.id} name={tour.title} src={tour.demoImage} />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </>
    );

    const AccommodationsContent = () => (
        <Text className="text-2xl px-8 mb-4">Accommodations Content</Text>
        // Add your accommodations content here
    );

    const ActivitiesContent = () => (
        <Text className="text-2xl px-8 mb-4">Activities Content</Text>
        // Add your activities content here
    );

    const RestaurantsContent = () => (
        <Text className="text-2xl px-8 mb-4">Restaurants Content</Text>
        // Add your restaurants content here
    );

    const TransportationContent = () => (
        <Text className="text-2xl px-8 mb-4">Transportation Content</Text>
        // Add your transportation content here
    );

    const navigation = useNavigation();

    const [type, setType] = useState("tours");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [geoCoords, setGeoCoords] = useState({});
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locality, setLocality] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(geoCoords, type).then(data => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false);
            }, 1000)
        });
    }, [geoCoords, type]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            getUserLocation(location).then(userData => {
                setLocality(userData.results[0].formatted_address)
            })
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#F6F6F6] relative">

            {/* Header */}
            <View className="flex-row items-start justify-between px-8 pt-5">
                <View className="mr-12">
                    {/* <Text className="mb-2">Hello
                        <Text> traveller,</Text>
                    </Text> */}
                    <Text className="text-3xl text-black flex-wrap max-w-[245px]">Where will you go today?</Text>
                </View>
                <View className="rounded-full border-2 border-white shadow-lg">
                    <Image source={Avatar} className="w-12 h-12 object-cover rounded-full" />
                </View>
            </View>
            {/* <View className="flex-row items-start px-8 pt-5 space-x-2">
                <Image source={BluePin} className="w-5 h-5 object-cover" />
                <Text>
                    <Text>Currently in </Text>
                    <Text>{locality ? locality : "Adventure Land"}</Text>
                </Text>
            </View> */}

            <View className="flex-row items-start bg-white mx-4 rounded-full py-1 px-4 shadow-md m-8">
                <Image source={Search} className="w-4 h-4 object-cover mr-1 mt-4" />
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    fetchDetails={true}
                    placeholder='Discover a tour/service'
                    onPress={(data, details = null) => {
                        setGeoCoords(prevCoords => ({
                            ...prevCoords,
                            bl_lat: details?.geometry?.viewport?.southwest?.lat,
                            bl_lng: details?.geometry?.viewport?.southwest?.lng,
                            tr_lat: details?.geometry?.viewport?.northeast?.lat,
                            tr_lng: details?.geometry?.viewport?.northeast?.lng
                        }));
                        console.log(geoCoords);
                    }}
                    query={{
                        key: REACT_NATIVE_GOOGLE_PLACES_API_KEY,
                        language: 'en',
                        components: "country:jp"
                    }}
                    onFail={(error) => console.error(error)}
                />
            </View>

            {/* Browse Section */}
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#336699" />
                </View>
            ) : (
                <>
                    {/* Search results */}
                    <Text className="text-2xl px-8 mb-4">Explore</Text>
                    <>
                        {type === 'tours' && <ToursContent />}
                        {type === 'accommodations' && <AccommodationsContent />}
                        {type === 'activities' && <ActivitiesContent />}
                        {type === 'restaurants' && <RestaurantsContent />}
                        {type === 'transportation' && <TransportationContent />}
                    </>
                    {/* <ScrollView horizontal={true}>
                        <View className="px-8 flex-row items-start justify-evenly">
                            {mainData?.length > 0 ? (
                                <>
                                    {mainData?.map((data, i) => (
                                        data?.name && (
                                            <ItemCardContainer
                                                key={i}
                                                // imageSrc={
                                                //     data?.photo?.images?.medium?.url ?
                                                //     data?.photo?.images?.medium?.url :
                                                //     "https://res.cloudinary.com/diyvlobep/image/upload/v1680617719/restaurant-default_ml2fb9.png"
                                                // } 
                                                name={data?.name}
                                                location={data?.location_string}
                                                data={data}
                                            />
                                        )
                                    ))}
                                </>
                            ) : (
                                <>
                                    <View className="w-full h-full px-10 flex items-center space-y-4 justify-center">
                                        <Image source={NotFound} className="w-28 h-28 object-cover" />
                                        <Text>Try searching by a different keyword.</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView> */}

                    {/* Categories */}
                    <Text className="text-2xl px-8">Categories</Text>
                    <View>
                        <View className="flex-row items-center justify-between px-8 p-5 mt-0">
                            <MenuContainer
                                key={"tours"}
                                title="Tours"
                                imageSrc={TourIcon}
                                type={type}
                                setType={() => setType("tours")}
                            />
                            <MenuContainer
                                key={"accommodations"}
                                title="Accommodations"
                                imageSrc={HotelIcon}
                                type={type}
                                setType={() => setType("accommodations")}
                            />
                            <MenuContainer
                                key={"activities"}
                                title="Activities"
                                imageSrc={AttractionsIcon}
                                type={type}
                                setType={() => setType("activities")}
                            />
                        </View>

                        <View className="flex-row items-center justify-between px-20 mt-0">
                            <MenuContainer
                                key={"restaurants"}
                                title="Restaurants"
                                imageSrc={RestaurantsIcon}
                                type={type}
                                setType={() => setType("restaurants")}
                            />
                            <MenuContainer
                                key={"transportation"}
                                title="Transportations"
                                imageSrc={TransportationIcon}
                                type={type}
                                setType={() => setType("transportation")}
                            />
                        </View>
                    </View>

                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    rcmBlock: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        height: 235,
    },
    rcmTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardWrapper: {
        marginRight: 20,
    }
});

export default Discover;