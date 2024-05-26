import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
} from 'react-native';
import { colors } from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons'
import { getCountryIdFromTourId, getCountryFromId } from '../services/firebase/country';
import LoadingView from '../components/utils/LoadingView';

const DetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCountryId = await getCountryIdFromTourId(item.id);
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

    const handleBookNow = () => {
        alert('You booked a trip!');
    };

    const handleCustomize = () => {
        navigation.navigate("Destination", { id: countryData.id, name: countryData.countryName });
    };

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
                        onPress={() => navigation.navigate("Comment", {tour: item})}>
                        <Octicons name="comment-discussion" size={32} color={colors.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentWrapper}>
                    {/* <View style={styles.heartWrapper}>
                        <Entypo name="heart" size={32} color={colors.heart} />
                    </View> */}
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.locationWrapper}>
                        <Entypo name="location-pin" size={24} color={colors.white} />
                        <Text style={styles.locationText}>{countryData.countryName}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>
                <DescriptionSection title="Description" content={item.description} />
                <InfoSection title="Special" content={item.additionInfo} />
                <PriceSection price={item.price} />
                {/* <CustomButton label="Book Now" onPress={handleBookNow} /> */}
                <CustomButton label="Customize" onPress={handleCustomize} />
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

const PriceSection = ({ price }) => (
    <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Price</Text>
        <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>${price}</Text>
            <Text style={styles.subText}>/person</Text>
        </View>
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    backgroundImage: {
        height: 450,
        justifyContent: 'space-between',
    },
    contentWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },
    commentIcon: {
        marginRight: 20,
        marginTop: 30,
    },
    itemTitle: {
        fontSize: 32,
        color: colors.white,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        fontSize: 16,
        color: colors.white,
    },
    descriptionWrapper: {
        flex: 1,
        marginTop: -20,
        borderRadius: 25,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {

        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: colors.text,
        lineHeight: 22,
    },
    infoSection: {
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 15,
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subText: {
        fontSize: 24,
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    buttonText: {
        fontSize: 18,
        color: colors.white,
    },
    heartWrapper: {
        position: 'absolute',
        right: 20,
        // top: 100,
        width: 64,
        height: 64,
        backgroundColor: colors.white,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1,
    },
});

export default DetailScreen;

