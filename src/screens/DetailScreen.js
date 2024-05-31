import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';
import { colors } from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons'
import { getCountryIdFromTourId, getCountryFromId } from '../services/firebase/country';
import LoadingView from '../components/utils/LoadingView';
import { styles } from './DetailScreenContent/styles';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { icons } from '../assets/icons/icons';
import { getDestIdsFromTourId, getDestFromId } from '../services/firebase/destination';

const DetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [countryData, setCountryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [destIds, setDestIds] = useState([])
    const [destsData, setDestsData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedDestIds = await getDestIdsFromTourId(item.id);
                const fetchedDestsData = await Promise.all(
                    fetchedDestIds.map(async (destId) => {
                        const destData = await getDestFromId(destId);
                        return destData;
                    })
                );
                let countryIds = []
                fetchedDestsData.forEach((destData) => {
                    countryIds.push(destData.countryId)
                })
                countryIds = Array.from(new Set(countryIds))

                const fetchedCountryData = await Promise.all(
                    countryIds.map(async (countryId) => {
                        const countryData = await getCountryFromId(countryId);
                        return countryData;
                    })
                );
                setDestsData(fetchedDestsData)
                setDestIds(fetchedDestIds)
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

    const handleCustomize = () => {
        navigation.navigate("Destination", {
            id: countryData[0].id,
            name: countryData[0].countryName,
            tour: item.title
        });
    };

    const renderDestList = () => {
        return (
            <View style={[styles.infoSection, { color: colors.primary }]}>
                <Text style={styles.sectionTitle}>Schedule</Text>
                <Text style={{textAlign: "center", fontSize: 16, fontWeight: "bold"}}>Your Location</Text>
                {destsData.map((destData, index) => (
                    <View key={index} style={{ alignItems: 'center' }}>
                        <View style={styles.line}></View>
                        <Image source={icons.train} style={{width: 30, height: 30}}></Image>
                        <View style={styles.line}></View>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>{destData.name}</Text>
                    </View>
                ))}
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={{ uri: item.demoImage }}
                style={styles.backgroundImage}>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}>
                        <Octicons name="chevron-left" size={32} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.commentIcon}
                        onPress={() => navigation.navigate("Comment", { tour: item })}>
                        <Octicons name="comment-discussion" size={32} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentWrapper}>
                    <Text style={styles.itemTitle}>
                        {item.title}
                    </Text>
                    <View style={{ flexDirection: "row", position: "relative" }}>
                        <View style={styles.locationWrapper}>
                            <Entypo name="location-pin" size={24} color={colors.white} />
                            <Text
                                style={styles.locationText}
                            >
                                {countryData.map((data, index) => `${data.countryName}`).join(' - ')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.heartWrapper}
                            onPress={() => {
                                navigation.navigate("Map", { 
                                    item: item, 
                                    country: countryData,
                                    destinations: destsData
                                });
                                // console.log(item.id)
                                // console.log(countryData.location.latitude)
                            }}
                        >
                            <Entypo
                                name="location"
                                size={32}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>

                <DescriptionSection title="Description" content={item.description} />
                <InfoSection title="Special" content={item.additionInfo} />
                {renderDestList()}
                {/* <PriceSection price={item.price} /> */}
                <View>
                    <CustomButton label="Customize" onPress={handleCustomize} />
                </View>
                {/* <View style={{height: 100}}></View> */}
            </View>
        </ScrollView>
    );
};

const DescriptionSection = ({ title, content }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{content}</Text>
    </View>
);

const InfoSection = ({ title, content }) => (
    <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent}>{content}</Text>
    </View>
);

const CustomButton = ({ label, onPress }) => (
    <TouchableOpacity
        style={styles.button}
        onPress={onPress}
    >
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
);

export default DetailScreen;

