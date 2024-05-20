import React from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../assets/colors/colors";

const { width, height } = Dimensions.get("screen");

const ServicePackageCard = ({ title, description, image, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={localStyles.card}>
            <View style={{ flexDirection: "row" }}>
                <View style={localStyles.cardImage}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 20 }}
                        source={{ uri: image }}
                    />
                </View>
                <View style={{ flex: 0.6, marginHorizontal: 12, overflow: "hidden" }}>
                    <Text style={localStyles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
                        {title.length > 20 ? title.substring(0, 20) + "..." : title}
                    </Text>
                    <Text style={localStyles.cardDescription} numberOfLines={3} ellipsizeMode="tail">
                        {description.length > 70 ? description.substring(0, 70) + "..." : description}
                        {description.length > 70 && (
                            <Text style={{ color: colors.green}}>Learn more</Text>
                        )}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    card: {
        marginVertical: 10,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: width / 1.1,
        marginHorizontal: 20,
        borderRadius: 20,
        height: 120,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },    
    cardImage: {
        flex: 0.3,
    },
    cardTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    },
    cardLocation: {
        fontSize: 11.5,
        color: "#777",
        marginLeft: 10,
    },
    cardDescription: {
        fontSize: 12,
        marginVertical: 8,
        marginLeft: 10,
    },
});

export default ServicePackageCard;
