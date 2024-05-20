import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    StyleSheet
} from 'react-native';
import { colors } from '../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { getCountryIdFromTourId, getCountryFromId } from '../services/firebase/country';
import LoadingView from '../components/utils/LoadingView';
import { getAccomListFromId } from "../services/firebase/accom"
import { getRestListFromId } from "../services/firebase/rest"
import { getTransListFromId } from "../services/firebase/trans"
import { getActListFromId } from "../services/firebase/activity"
import { set } from 'firebase/database';
import ServiceBlock from '../components/ServiceBlock'

const height = Dimensions.get('window').height;

const DetailScreen = ({ route, navigation }) => {
    const paidTour = route.params.tour;
    const [loading, setLoading] = useState(true)
    const [accomData, setAccomData] = useState([])
    const [restData, setRestData] = useState([])
    const [transData, setTransData] = useState([])
    const [actData, setActData] = useState([])
    const [countryData, setCountryData] = useState({
        'demoImage': 'https://dulichkingtravel.com/images/stories/virtuemart/product/resized/euro-travel-1-8066_600x600.jpg',
        'countryName': "Paris",
        'description': 'ok'
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                const allAccomData = await getAccomListFromId(paidTour.accom);
                const allRestData = await getRestListFromId(paidTour.rest);
                const allTransData = await getTransListFromId(paidTour.trans);
                const allActData = await getActListFromId(paidTour.activity);
                const countryData = await getCountryFromId(paidTour.countryId);

                setAccomData(allAccomData)
                setRestData(allRestData)
                setTransData(allTransData)
                setActData(allActData);
                setCountryData(countryData)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <LoadingView />;
    }

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: countryData.demoImage }}
                style={styles.backgroundImage}
            >

                <View style={{
                    elevation: 5,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black'
                }}>

                </View>

            </ImageBackground>
            <View style={styles.titlesWrapper}>
                <Text style={styles.itemTitle}>{paidTour.name}</Text>
                <View style={styles.locationWrapper}>
                    <Entypo name="location-pin" size={24} color={colors.white} />
                    <Text style={styles.locationText}>{countryData.countryName}</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Time</Text>
                </View>

                <View style={styles.descriptionBody}>
                    <Text style={{ fontSize: 18, textAlign: "justify", color: "#888" }}>25-12-2024</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                </View>

                <View style={styles.descriptionBody}>
                    <Text style={{ fontSize: 18, textAlign: "justify", color: "#888" }}>{countryData.description}</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Services</Text>
                </View>
                <View style={{ marginHorizontal: 30 }}>
                    <ServiceBlock title='Accommodations' color='#00FF9C' data={accomData} navigationTarget="AccomDetail" />
                    <ServiceBlock title='Restaurants' color='#00FF9C' data={restData} navigationTarget="RestDetail" />
                    <ServiceBlock title='Transportations' color='#00FF9C' data={transData} navigationTarget="TransDetail" />
                    <ServiceBlock title='Activities' color='#00FF9C' data={actData} navigationTarget="ActivityDetail" />
                </View>
            </View>
            <View style={{ height: 60 }}></View>
        </ScrollView>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    backgroundImage: {
        justifyContent: 'space-between',
        height: 300,
        opacity: 0.85
    },
    descriptionWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: -20,
        borderRadius: 25,
        marginBottom: 10,
        fontWeight: '600',
    },
    descriptionBody: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        textAlign: "justify"
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },
    titlesWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
        marginTop: 20,
        position: 'absolute',
        top: 170
    },
    itemTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 32,
        color: colors.white,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: colors.white,
    },
    heartWrapper: {
        position: 'absolute',
        right: 40,
        top: -30,
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
    },
    descriptionTextWrapper: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: "center",
    },
    descriptionTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 30,
        color: colors.black,
        fontWeight: "600"
    },
    descriptionText: {
        marginTop: 20,
        // fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.darkGray,
        minHeight: 130,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    infoItem: {},
    infoTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: colors.gray,
    },
    infoTextWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    infoText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.green,
    },
    infoSubText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: colors.gray,
    },
    buttonWrapper: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: colors.green,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.white,
    },
});