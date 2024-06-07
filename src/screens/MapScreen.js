import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { icons } from "../assets/icons/icons";
import { colors } from "../assets/colors/colors";

const MapScreen = ({ route, navigation }) => {
    const { item, country, destinations } = route.params;
    const initialLocation = {
        latitude: destinations[0].location.latitude,
        longitude: destinations[0].location.longitude,
        latitudeDelta: 10,
        longitudeDelta: 10,
    };
    const [region, setRegion] = useState(initialLocation);
    const [currentLoc, setCurrentLoc] = useState(null);
    const [markerPressCount, setMarkerPressCount] = useState(0);
    const [markerIndex, setMarkerIndex] = useState(0);

    useEffect(() => {
        _getLocation();
        setRegion(initialLocation)
    }, []);

    const _getLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.warn('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLoc({
                ...region,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (err) {
            console.warn(err);
        }
    };

    const handleZoomIn = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta * 0.2,
            longitudeDelta: region.longitudeDelta * 0.2,
        });
    };

    const handleZoomOut = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta * 5,
            longitudeDelta: region.longitudeDelta * 5,
        });
    };

    const handleMarkerPress = () => {
        setMarkerPressCount(markerPressCount + 1);
        console.log("pressed")
        if (markerPressCount == 1) {
            setRegion({
                ...region,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035,
            });
        }
    };

    const handleMoveToNextMarker = () => {
        if (markerIndex < destinations.length - 1) {
            const curIndex = markerIndex
            const threshold = 0.1;
            const nextDestination = destinations[curIndex + 1].location;
            setRegion({
                ...region,
                latitude: destinations[curIndex + 1].location.latitude,
                longitude: destinations[curIndex + 1].location.longitude,
            });
            if (
                Math.abs(region.latitude - nextDestination.latitude) < threshold &&
                Math.abs(region.longitude - nextDestination.longitude) < threshold
            ) {
                // setRegion({
                //     ...region,
                //     latitude: destinations[curIndex + 1].location.latitude,
                //     longitude: destinations[curIndex + 1].location.longitude,
                // });
                setMarkerIndex(curIndex + 1);
            } else {
                setMarkerIndex(curIndex)
            }
        }
    };

    const handleMoveToPreviousMarker = () => {
        if (markerIndex > 0) {
            const curIndex = markerIndex
            const threshold = 0.1;
            const nextDestination = destinations[curIndex - 1].location;
            setRegion({
                ...region,
                latitude: destinations[curIndex - 1].location.latitude,
                longitude: destinations[curIndex - 1].location.longitude,
            });
            if (
                Math.abs(region.latitude - nextDestination.latitude) < threshold &&
                Math.abs(region.longitude - nextDestination.longitude) < threshold
            ) {
                // setRegion({
                //     ...region,
                //     latitude: destinations[curIndex - 1].location.latitude,
                //     longitude: destinations[curIndex - 1].location.longitude,
                // });
                setMarkerIndex(curIndex - 1);
            } else {
                setMarkerIndex(curIndex)
            }
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialLocation}
                provider='google'
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {currentLoc && (
                    <Marker
                        coordinate={currentLoc}
                        title="Your Location"
                        pinColor={colors.primary}
                        tracksViewChanges={false}
                    />
                )}
                {destinations.map((destination, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: destination.location.latitude,
                            longitude: destination.location.longitude,
                        }}
                        tracksViewChanges={false}
                    >
                        <Callout>
                            <View>
                                <Text style={{ fontWeight: "bold" }}>
                                    {(index + 1) + " - " + destination.name}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
                {currentLoc && destinations.length > 0 && (
                    <Polyline
                        coordinates={[
                            { latitude: currentLoc.latitude, longitude: currentLoc.longitude },
                            { latitude: destinations[0].location.latitude, longitude: destinations[0].location.longitude },
                        ]}
                        strokeWidth={3}
                        strokeColor="#f00"
                    />
                )}
                <Polyline
                    coordinates={destinations.map(destination => ({
                        latitude: destination.location.latitude,
                        longitude: destination.location.longitude,
                    }))}
                    strokeWidth={3}
                    strokeColor="#00f"
                />
            </MapView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleZoomIn}>
                    <Image source={icons.zoomIn} style={styles.zoom} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoomOut}>
                    <Image source={icons.zoomOut} style={styles.zoom} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMoveToPreviousMarker}>
                    <Image source={icons.prevLoc} style={styles.zoom} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleMoveToNextMarker}>
                    <Image source={icons.nextLoc} style={styles.zoom} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    zoom: {
        width: 50,
        height: 50,
    },
});
