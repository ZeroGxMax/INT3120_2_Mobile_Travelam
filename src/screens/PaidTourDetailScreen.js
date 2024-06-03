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
import { useNavigation, useRoute } from "@react-navigation/native";


const height = Dimensions.get('window').height;

const PaidTourDetailScreen = ({ navigation }) => {
    const route = useRoute();
    const paidTour = route.params.tour;
    const [loading, setLoading] = useState(true)

    // console.log(paidTour.countryList[1].destination[1].service)

    useEffect(() => {

    }, [paidTour]);

    let destination = {}

    // if (loading) {
    //     return <LoadingView />;
    // }

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={{ uri: "https://viptrip.vn/public/upload/tour/vinh-ha-long-1_21-09-2022_970318379.jpg" }}
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
            </View>
            <View style={[styles.descriptionWrapper, styles.firstItem] }>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Start Date</Text>
                </View>

                <View style={styles.descriptionBody}>
                    <Text style={{ fontSize: 16, textAlign: "justify", color: "#888" }}>{paidTour.startDate}</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Card Holder</Text>
                </View>

                <View style={styles.descriptionBody}>
                    <Text style={{ fontSize: 16, textAlign: "justify", color: "#888" }}>{paidTour.cardHolder}</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Card Number</Text>
                </View>

                <View style={styles.descriptionBody}>
                    <Text style={{ fontSize: 16, textAlign: "justify", color: "#888" }}>{paidTour.cardNumber}</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Amount</Text>
                </View>

                <View style={styles.descriptionBody}>
                    <Text style={{ fontSize: 16, textAlign: "justify", color: "#888" }}>{paidTour.cost} $</Text>
                </View>
            </View>
            <View style={styles.descriptionWrapper}>
                <View style={styles.descriptionTextWrapper}>
                    <Text style={styles.descriptionTitle}>Tour Details</Text>
                </View>

                {paidTour.countryList.map((item, index) => (
                    item != { 'destination': [] } && item.destination && item.destination.length > 0 ? (
                        <View key={4000 + index}>
                            <Text style={{
                                // paddingLeft: 25,
                                fontSize: 22,
                                fontWeight: 600,
                                marginBottom: 20,
                                marginTop: 20,
                                color: "green"
                            }}>{item.name}</Text>
                            {item.destination.map((item_, index_) => (
                                (item_.name ? (
                                    <View key={ 5000 + index_ }>
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: "#799351"
                                        }}>{item_.name}</Text>
                                        <ServiceBlock title='Accommodations' color='#00FF9C' data={item_.service.accom} navigationTarget="AccomDetail" />
                                        <ServiceBlock title='Restaurants' color='#00FF9C' data={item_.service.rest} navigationTarget="RestDetail" />
                                        <ServiceBlock title='Transportations' color='#00FF9C' data={item_.service.trans} navigationTarget="TransDetail" />
                                        <ServiceBlock title='Activities' color='#00FF9C' data={item_.service.act} navigationTarget="ActivityDetail" />
                                    </View>
                                ) : (
                                    null
                                ))
                            ))}
                        </View>
                    ) : null
                ))}

            </View>
            <View style={{ height: 10 }}></View>
        </ScrollView>
    );
};

export default PaidTourDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 25
    },
    backgroundImage: {
        justifyContent: 'space-between',
        height: 300,
        opacity: 0.85
    },
    descriptionWrapper: {
        flex: 1,
        backgroundColor: "#EEE",
        // marginTop: -20,
        borderRadius: 25,
        margin: 10,
        fontWeight: '600',
        paddingVertical: 10,
        paddingHorizontal: 30
        // borderWidth: 1,
        // borderColor: ""
    },
    descriptionBody: {
        // alignItems: 'center',
        textAlign: "justify"
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },
    titlesWrapper: {
        marginHorizontal: 20,
        marginBottom: 20,
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
        // marginTop: 10
    },
    descriptionTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: colors.black,
        fontWeight: "600",
    },
    descriptionText: {
        fontSize: 14,
        color: colors.darkGray,
        minHeight: 130,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    firstItem: {
        marginTop: 20
    }
});