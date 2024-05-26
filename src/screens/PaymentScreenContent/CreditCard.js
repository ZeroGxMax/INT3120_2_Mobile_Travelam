import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../assets/colors/colors";
import AppText from "./AppText";

const CreditCard = ({ holder, cvc, cardNumber, expiryDate }) => {
    const [type, setType] = useState("mastercard")

    const formatCardNumber = (cardNumber) => {
        if (cardNumber != "") {
            return cardNumber
        }
        return "**** **** **** ****"; 
    };

    const formatExpiryDate = (expiryDate) => {
        if (expiryDate) {
            return expiryDate;
        }
        return "MM/YY";
    };

    const formatHolder = (holder) => {
        if (holder) {
            return holder;
        }
        return "Christian Bale";
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View style={styles.microship}>
                    <MaterialCommunityIcons
                        name="integrated-circuit-chip"
                        color={colors.yellow}
                        size={50}
                    />
                </View>
                <View style={styles.cardType}>
                    <Image
                        source={require("../../assets/icons/mastercard.png")}
                        style={styles.image}
                    />
                </View>
            </View>
            <View style={styles.cardCenter}>
                <AppText text={formatCardNumber(cardNumber)} customStyles={styles.cardNumber}/>
                {/* <AppText text="5444" customStyles={styles.cardNumber} />
                <AppText text="4444" customStyles={styles.cardNumber} />
                <AppText text="5555" customStyles={styles.cardNumber} />
                <AppText text="5555" customStyles={styles.cardNumber} /> */}
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.cardHolder}>
                    <AppText text={formatHolder(holder)} customStyles={styles.textMedium} />
                </View>
                <View style={styles.cardExpiry}>
                    <AppText text={formatExpiryDate(expiryDate)} customStyles={styles.textMedium} />
                </View>
            </View>
        </View>
    )
}

export default CreditCard;

const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginHorizontal: 20,
        height: 200,
        backgroundColor: colors.primary,
        borderRadius: 20,
        alignSelf: "center",
    },
    cardHeader: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 50,
        height: 50,
    },
    cardCenter: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        width: "80%",
    },
    cardNumber: {
        flex: 1,
        textAlign: "center",
        // fontFamily: "Lato-Bold",
        color: colors.white,
        fontSize: 20,
    },
    cardFooter: {
        flex: 1,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardHolder: {},
    textMedium: {
        color: colors.white,
        // fontFamily: "Lato-Bold",
        fontSize: 15,
        textTransform: "uppercase"
    }
});