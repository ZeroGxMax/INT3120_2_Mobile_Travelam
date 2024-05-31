import { StyleSheet, View, ScrollView, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreditCard from "./PaymentScreenContent/CreditCard";
import AppText from "./PaymentScreenContent/AppText";
import Screen from "./PaymentScreenContent/Screen";
import AppHeader from "./PaymentScreenContent/AppHeader";
import { colors } from "../assets/colors/colors";
import { isValidCardNumber, isValidCardHolder, isValidCVC, isValidExpiryDate } from "../utils/cardUtils";
import { auth } from "../services/firebaseService";
import { addNewCreditCard } from "../services/firebase/user";
import { useNavigation, useRoute } from '@react-navigation/native';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { onCardAdded } = route.params;
    const [cardHolder, setCardHolder] = useState("");
    const [isCardHolderValid, setIsCardHolderValid] = useState(false);

    const [expiryDate, setExpiryDate] = useState("");
    const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);

    const [cvc, setCvc] = useState("");
    const [isCvcValid, setIsCvcValid] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);

    useEffect(() => {
        const loadCardDetails = async () => {
            try {
                const savedCardHolder = await AsyncStorage.getItem('cardHolder');
                const savedCardNumber = await AsyncStorage.getItem('cardNumber');
                const savedExpiryDate = await AsyncStorage.getItem('expiryDate');
                const savedCvc = await AsyncStorage.getItem('cvc');

                if (savedCardHolder) {
                    setCardHolder(savedCardHolder);
                    setIsCardNumberValid(isValidCardHolder(savedCardHolder));
                }
                if (savedCardNumber) {
                    setCardNumber(savedCardNumber);
                    setIsCardNumberValid(isValidCardNumber(savedCardNumber));
                }
                if (savedExpiryDate) {
                    setExpiryDate(savedExpiryDate);
                    setIsExpiryDateValid(isValidExpiryDate(savedExpiryDate));
                }
                if (savedCvc) {
                    setCvc(savedCvc);
                    setIsCvcValid(isValidCVC(savedCvc));
                }


            } catch (error) {
                console.error("Failed to load card details", error);
            }
        };

        loadCardDetails();
    }, []);

    const saveCardDetails = async () => {
        try {
            await AsyncStorage.setItem('cardHolder', cardHolder);
            await AsyncStorage.setItem('cardNumber', cardNumber);
            await AsyncStorage.setItem('expiryDate', expiryDate);
            await AsyncStorage.setItem('cvc', cvc);
        } catch (error) {
            console.error("Failed to save card details", error);
        }
    };

    const handleCardNumberChange = (value) => {
        const formattedCardNumber = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        setCardNumber(formattedCardNumber);
        setIsCardNumberValid(isValidCardNumber(formattedCardNumber));
        saveCardDetails();
    };

    const handleCardHolderChange = (value) => {
        setCardHolder(value);
        setIsCardHolderValid(isValidCardHolder(value));
        saveCardDetails();
    };

    const handleCvcChange = (value) => {
        setCvc(value);
        setIsCvcValid(isValidCVC(value));
        saveCardDetails();
    };

    const handleExpiryDateChange = (value) => {
        setExpiryDate(value);
        setIsExpiryDateValid(isValidExpiryDate(value));
        saveCardDetails();
    };

    return (
        <Screen customStyles={styles.container}>
            <AppHeader title={"Add Credit Card"} customTitleStyles={{}} />
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
                                style={[styles.input, !isCardHolderValid && styles.inputError,
                                isCardHolderValid && styles.inputValid]}
                                placeholder={"Christian Bale"}
                                value={cardHolder}
                                onChangeText={handleCardHolderChange}
                            />
                        </View>

                        <View style={styles.formItem}>
                            <AppText text="Card Number" customStyles={styles.formLabel} />

                            <TextInput
                                style={[styles.input, !isCardNumberValid && styles.inputError,
                                isCardNumberValid && styles.inputValid]}
                                placeholder={"5444 4444 5555 5555"}
                                keyboardType="numeric"
                                value={cardNumber}
                                onChangeText={handleCardNumberChange}
                            />

                        </View>

                        <View style={styles.formItemRow}>
                            <View style={[styles.formItemHalf, { marginRight: 10 }]}>
                                <AppText text="Expiry Date" customStyles={styles.formLabel} />
                                <TextInput
                                    style={[styles.input, !isExpiryDateValid && styles.inputError,
                                    isExpiryDateValid && styles.inputValid
                                    ]}
                                    placeholder={"12/25"}
                                    keyboardType="numeric"
                                    value={expiryDate}
                                    onChangeText={handleExpiryDateChange}
                                />
                            </View>
                            <View style={styles.formItemHalf}>
                                <AppText text="CVC" customStyles={styles.formLabel} />
                                <TextInput
                                    style={[styles.input, !isCvcValid && styles.inputError,
                                    isCvcValid && styles.inputValid
                                    ]}
                                    placeholder={"123"}
                                    keyboardType="numeric"
                                    value={cvc}
                                    onChangeText={handleCvcChange}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                if (isCardHolderValid && isCardNumberValid && isExpiryDateValid && isCvcValid) {
                                    await addNewCreditCard(auth.currentUser.uid, cardHolder, cardNumber, expiryDate, cvc);
                                    Alert.alert(
                                        "Success",
                                        "Your credit card has been successfully added. Click OK to return to billing details",
                                        [{
                                            text: "OK", style: "default", onPress: () => {
                                                onCardAdded();
                                                navigation.goBack()
                                                // navigation.navigate('Cart', { nonUpdatedInfo });
                                            }
                                        }],
                                        { cancelable: true }
                                    );
                                } else {
                                    Alert.alert(
                                        "Incomplete Information",
                                        "Please make sure all fields are filled correctly before adding the card.",
                                        [{ text: "OK", style: "default" }],
                                        { cancelable: true }
                                    );
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Add Card</Text>
                        </TouchableOpacity>
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
    inputError: {
        borderColor: colors.error,
    },
    inputValid: {
        borderColor: colors.success,
    },
    errorMessage: {
        color: colors.error,
        fontSize: 12,
    },
});
