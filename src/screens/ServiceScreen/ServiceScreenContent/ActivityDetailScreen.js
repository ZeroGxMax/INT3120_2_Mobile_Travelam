import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { colors } from '../../../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { getCountryIdFromActivityId, getCountryFromId } from '../../../services/firebase/country';
import LoadingView from '../../../components/utils/LoadingView';

const height = Dimensions.get('window').height;

const separateLinks = (links) => links.split(',').map(link => link.trim());

const ActivityDetailScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [countryId, setCountryId] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCountryId = await getCountryIdFromActivityId(item.id);
                setCountryId(fetchedCountryId);

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

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: separateLinks(item.demoImage)[0] }}
                style={styles.backgroundImage}
            >
                <TouchableOpacity
                    style={styles.backIcon}
                    onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={32} color={colors.white} />
                </TouchableOpacity>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <View style={styles.locationWrapper}>
                        <Entypo name="location-pin" size={24} color={colors.white} />
                        <Text style={styles.locationText}>{countryData?.countryName}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.descriptionWrapper}>
                <DescriptionSection title="Description" content={item.description} />
                <InfoSection title="Special" content={item.additionInfo} />
                <InfoSection title="Type" content={item.type} />
            </View>
        </ScrollView>
    );
};

const DescriptionSection = ({ title, content }) => (
    <View style={{ marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionContent} numberOfLines={7} ellipsizeMode="tail">
            {content}
        </Text>
    </View>
);

const InfoSection = ({ title, content }) => (
    <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>{title}</Text>
        <View style={styles.infoContent}>
            <Text style={styles.sectionContent}>{content}</Text>
        </View>
    </View>
);

const PriceSection = ({ content }) => (
    <View style={[styles.infoSection, styles.centeredContent]}>
        {/* <Text style={styles.infoTitle}>{title}</Text> */}
        <View style={styles.priceWrapper}>

            <Text style={styles.priceText}>${content}</Text>
            <Text style={styles.subText}>/night</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    backgroundImage: {
        justifyContent: 'space-between',
        height: 450,
    },
    descriptionWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: -20,
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },
    titlesWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
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
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 5,
    },
    infoContent: {
        paddingLeft: 10,
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    currencyText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginLeft: 5,
    },
    subText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.primary,
    },
});

export default ActivityDetailScreen;
