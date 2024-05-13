import React from 'react';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/colors/colors';
import { styles } from './style';

const CountryPackage = ({ item }) => {
    const navigation = useNavigation();

    const onPressHandler = () => {
        navigation.navigate('Package', {
            country: item
        });
    };

    // console.log(item)

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressHandler}
        >
            <ImageBackground style={styles.cardImage} source={{ uri: item.demoImage }}>
                {/* <View style={{ flexDirection: 'row' }}>
                    <Icon name="star" size={20} color={colors.white} />
                    <Text style={{ marginLeft: 5, color: colors.white }}>5.0</Text>
                </View> */}
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-end' }}>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <Icon name="place" size={20} color={colors.white} />
                        <Text style={{ marginLeft: 5, color: colors.white }}>{item.countryName}</Text>
                    </View> */}

                </View>
                <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold', marginBottom: 5, textAlign: "center" }}>
                    {item.countryName}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default CountryPackage;