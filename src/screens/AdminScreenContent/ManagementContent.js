import React from 'react';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/colors/colors';
import { styles } from './style';

const ManagementContent = ({ item }) => {
    const navigation = useNavigation();

    const onPressHandler = () => {
        navigation.navigate('Manage', {
            title: item.title,
            props: item.props
        });
    };

    // console.log(item)

    return (
        <TouchableOpacity
            // activeOpacity={0.8}
            onPress={onPressHandler}
        >
            <ImageBackground style={styles.cardImage} source={{ uri: item.image }}>
                {/* <View style={{ flexDirection: 'row' }}>
                    <Icon name="star" size={20} color={colors.white} />
                    <Text style={{ marginLeft: 5, color: colors.white }}>5.0</Text>
                </View> */}
                <View style={{ 
                    flex: 1, 
                    justifyContent: 'space-between', 
                    flexDirection: 'row', 
                    alignItems: 'flex-end', 
                    backgroundColor: item.color, 
                    opacity: 0.5 
                }}>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <Icon name="place" size={20} color={colors.white} />
                        <Text style={{ marginLeft: 5, color: colors.white }}>{item.countryName}</Text>
                    </View> */}

                </View>
            </ImageBackground>
            <Text style={{ 
                color: colors.white, 
                fontSize: 18, 
                fontWeight: 'bold', 
                marginBottom: 5, 
                textAlign: "center",
                position: "absolute",
                top: 150,
                left: 15,
                elevation: 20
            }}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};

export default ManagementContent;