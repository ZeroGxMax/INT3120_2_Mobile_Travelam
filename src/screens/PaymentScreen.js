import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CreditCard from "./PaymentScreenContent/CreditCard";
import AppText from "./PaymentScreenContent/AppText";
import Screen from "./PaymentScreenContent/Screen";
import AppHeader from "./PaymentScreenContent/AppHeader";
// import Input from "./PaymentScreenContent/Input";
import Button from "./PaymentScreenContent/Button";
import { colors } from "../assets/colors/colors";

const PaymentScreen = () => {
    const [cardHolder, setCardHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvc, setCvc] = useState("");

    return (
        <Screen customStyles={styles.container}>
            <AppHeader title={"Credit card info"} customTitleStyles={{}} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.contentContainer}>
                    <CreditCard
                        holder={cardHolder}
                        cardNumber={cardNumber}
                        expiryDate={expiryDate}
                        cvc={cvc}
                    />
                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <AppText text="Card Holder" customStyles={styles.formLabel} />
                            <TextInput
                                style = {styles.input}
                                placeholder={"Christian Bale"}
                                value={cardHolder}
                                onChangeText={(text) => {
                                    setCardHolder(text);
                                }}
                            />
                        </View>
                        <View style={styles.formItem}>
                            <AppText text="Card Number" customStyles={styles.formLabel} />
                            <TextInput
                                style = {styles.input}
                                placeholder={"5444 4444 5555 5555"}
                                customStyles={styles.formInput}
                                keyboardType="numeric"
                                value={cardNumber}
                                onChangeText={(text) => setCardNumber(text)}
                            />
                        </View>
                        <View style={styles.formItemRow}>
                            <View style={[styles.formItemHalf, { marginRight: 10 }]}>
                                <AppText text="Expiry Date" customStyles={styles.formLabel} />
                                <TextInput
                                    style = {styles.input}
                                    placeholder={"12/25"}
                                    customStyles={styles.formInput}
                                    keyboardType="numeric"
                                    value={expiryDate}
                                    onChangeText={(text) => setExpiryDate(text)}
                                />
                            </View>
                            <View style={styles.formItemHalf}>
                                <AppText text="CVC" customStyles={styles.formLabel} />
                                <TextInput
                                    style = {styles.input}
                                    placeholder={"123"}
                                    customStyles={styles.formInput}
                                    keyboardType="numeric"
                                    value={cvc}
                                    onChangeText={(text) => setCvc(text)}
                                />
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <Button label={"Pay"} customStyles={styles.button} />
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        backgroundColor: colors.white,
        paddingBottom: 20,
        alignItems: 'center',
    },
    form: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 20,
    },
    formItem: {
        marginBottom: 20,
    },
    formItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formItemHalf: {
        flex: 1,
    },
    formLabel: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.darkGray,
    },
    formInput: {
        height: 40,
        borderColor: colors.lightGray,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: colors.white,
        fontSize: 16,
        width: '100%',
    },
    checkbox: {
        marginTop: 20,
    },
    checkboxText: {
        fontSize: 15,
        color: colors.darkGray,
    },
    buttonContainer: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    button: {
        paddingVertical: 15,
        width: '100%',
        backgroundColor: colors.primary,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});
