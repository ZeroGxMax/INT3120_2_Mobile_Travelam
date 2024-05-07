import React from 'react';
import { TouchableOpacity, ImageBackground, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from 'react-native-vector-icons';
import { colors } from "../../assets/colors/colors";
import { styles } from './style';

const CountryPackage = ({ item }) => {
    const navigation = useNavigation();

    const onPressHandler = () => {
        navigation.navigate('Package', {
            country: item
        });
    };

    // console.log(item.demoImage)

    return (
        <TouchableOpacity onPress={onPressHandler}>
            <ImageBackground
                // source={item.demoImage}
                source={{ uri: item.demoImage }}
                style={[
                    styles.discoverItem,
                    { marginLeft: item.id == 'discover-1' ? 20 : 0 },
                ]}
                imageStyle={styles.discoverItemImage}>
                <View style={styles.imageButtonBackground}>
                    <View style={styles.centeredContainer}>
                        <Text style={styles.discoverItemTitle}>{item.countryName}</Text>
                    </View>
                    {/* <View style={styles.discoverItemLocationWrapper}>
                    <Entypo name="location-pin" size={18} color={colors.white} />
                    <Text style={styles.discoverItemLocationText}>{item.location}</Text>
                </View> */}
                </View>

            </ImageBackground>
        </TouchableOpacity>
    );
};

export default CountryPackage;