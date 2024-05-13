import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/colors/colors';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { getCountryIdFromTourId, getCountryFromId } from '../../services/firebase/country';

const RecommendedCard = ({ item }) => {
    const [countryData, setCountryData] = useState(null);

    const navigation = useNavigation();

    const onPressHandler = () => {
        navigation.navigate('Detail', {
            item: item
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCountryId = await getCountryIdFromTourId(item.id);
                const fetchedCountryData = await getCountryFromId(fetchedCountryId);
                setCountryData(fetchedCountryData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [item.id]);

    return (
        <TouchableOpacity onPress={onPressHandler}>
            <ImageBackground style={styles.rmCardImage} source={{ uri: item.demoImage }}>
                <Text style={{ color: colors.white, fontSize: 22, fontWeight: 'bold', marginTop: 0 }}>
                    {item.title}
                </Text>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                    <View style={{ fontWeight: "bold", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }}>
                        {countryData && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="place" size={22} color={colors.white} />
                                <Text style={{ color: colors.white, marginLeft: 5 }}>
                                    {countryData.countryName}
                                </Text>
                            </View>
                        )}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="star" size={22} color={colors.white} />
                            <Text style={{ color: colors.white, marginLeft: 5 }}>5.0</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default RecommendedCard;
