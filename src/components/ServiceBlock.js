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
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ServiceBlock = ({ title, data, color, navigationTarget }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{
                borderRadius: 10
            }}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: "600",
                    // color: 'white'
                }}>
                    {title}
                </Text>
            </View>

            {data.map((item, index) => (
                <TouchableOpacity 
                    style={{ 
                        marginHorizontal: 10, 
                        borderBottomWidth: 1, 
                        paddingVertical: 10, 
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }} 
                    onPress={() => navigation.navigate(navigationTarget, {
                        item: item
                    })}
                    key={1300 + index}
                >
                    <Text style={{ fontSize: 16 }}>
                        {item.name ? item.name : item.type}
                    </Text>
                    <View style={{ width: 30, alignItems: "center" }}>
                        <AntDesign name='right' size={20} color="black" />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ServiceBlock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        marginVertical: 20,
        borderRadius: 10
    },
});