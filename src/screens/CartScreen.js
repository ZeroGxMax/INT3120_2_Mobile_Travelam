import { StyleSheet, Text, View, ScrollView, Pressable, Alert, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCustomerCreditCard } from "../services/firebase/user";
import { auth } from "../services/firebaseService";
import LoadingView from "../components/utils/LoadingView";
import CardItem from "./CartScreenContent/CardItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddCardItem from "./CartScreenContent/AddCardItem";
import { addNewPayment } from "../services/firebase/payment";
import { getToken, addNotification, addScheduleNotification } from "../services/firebase/notification";
import { sendPushNotification } from "../utils/notificationUtils";

const CartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const cart = useSelector((state) => state.cart.cart);
    const sortedCart = [...cart].sort((a, b) => {
        if (a.countryName === b.countryName) {
            if (a.destinationName === b.destinationName) {
                return a.baseId - b.baseId
            } else {
                return a.destinationName.localeCompare(b.destinationName)
            }
        } else {
            return a.countryName.localeCompare(b.countryName)
        }
    });
    const total = cart
        .map((item) => item.price)
        .reduce((curr, prev) => curr + prev, 0);
    const [creditCardData, setCreditCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedCardData, setSelectedCardData] = useState(null)

    const [text, setText] = useState((route.params.tour ? route.params.tour : ""))
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [token, setToken] = useState(null);
    let service = [{
        label: 'Accommodation',
        cost: 0
    }, {
        label: 'Restaurant',
        cost: 0
    }, {
        label: 'Transportation',
        cost: 0
    }, {
        label: 'Activity',
        cost: 0
    }]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const creditCard = await getCustomerCreditCard(auth.currentUser.uid)
                setCreditCardData(creditCard)
                // console.log(creditCardData)
                const fetchToken = getToken(auth.currentUser.uid)
                setToken(fetchToken)
                // setToken(fetchToken.push_token)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const refreshCartScreen = async () => {
        try {
            const creditCard = await getCustomerCreditCard(auth.currentUser.uid);
            setCreditCardData(creditCard);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        const amount = total + 0.05 * total
        if (selectedCardData && amount > 0 && sortedCart) {
            // await addNewPayment(auth.currentUser.uid, selectedCardData, amount, text, date, sortedCart);

            Alert.alert(
                "Payment Success",
                "Your payment was added successfully.",
                [{ text: "OK", style: "default" }],
                { cancelable: true }
            )
            if (token) {
                const title = "New transaction"
                const body = `Thank you for booking the "${text}" tour! Your payment of ${amount} has been successfully processed using the card ending in ${selectedCardData.cardNumber.slice(-4)}, registered under the name of ${selectedCardData.cardHolder}.`;

                sendPushNotification(token._j, title, body)
                // addNotification(auth.currentUser.uid, title, body, token._j, 0)
                
            }
            
        } else {
            Alert.alert(
                "Incomplete Details",
                "Please select a card and ensure the cart is not empty.",
                [{ text: "OK", style: "default" }],
                { cancelable: true }
            );
        }
    }

    for (let i = 0; i < 4; i++) {
        service[i].cost = cart
            .map((item) => (item.baseId == i * 200) ? item.price : 0)
            .reduce((curr, prev) => curr + prev, 0);
    }

    const dispatch = useDispatch();
    var startBaseId = -1
    var startCountry = ""
    var startDestination = ""


    const color_ = ['#FFBF00', '#25a18e', '#004e64', '#00a5cf']

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    useEffect(() => {

    }, [show])

    if (loading) {
        return <LoadingView />;
    }

    const navigateToPaymentScreen = () => {
        navigation.navigate('Payment', { onCardAdded: refreshCartScreen });
    };

    const renderTour = () => {
        return (
            <View>
                <View>
                    <View style={{ marginHorizontal: 10, marginTop: 10 }} >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Tour name
                        </Text>
                    </View>
                    <TextInput
                        placeholder="Enter tour name                          "
                        style={{
                            color: "black",
                            marginVertical: 10,
                            marginHorizontal: 20,
                            backgroundColor: "#FFF",
                            padding: 10,
                            borderRadius: 10,
                            fontSize: 18
                        }}
                        value={text}
                        onChangeText={setText}
                    />
                </View>
                <View>
                    <View style={{ marginHorizontal: 10 }} >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Start date
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        flex: 1,
                        // justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginHorizontal: 20,
                        marginVertical: 10
                    }}>
                        <Text style={{
                            fontSize: 18,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            backgroundColor: "white",
                            marginRight: 10
                        }}>
                            {date.toLocaleDateString()}
                        </Text>
                        <Button
                            onPress={() => showMode('date')}
                            title="Set date"
                            color="green"
                            type="outline"
                        />
                        {show ? (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        ) : (
                            null
                        )}
                    </View>
                </View>
            </View>
        )
    }

    const renderServiceList = () => {
        return (
            <View>
                <View style={{ marginHorizontal: 10, marginTop: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Services List
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 16,
                        marginHorizontal: !5,
                        backgroundColor: "white",
                        borderRadius: 12,
                        padding: 14,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                >
                    {sortedCart.map((item, index) => (
                        <View key={index}>
                            {startCountry !== item.countryName ? <View style={{
                                // backgroundColor: color_[item.baseId / 200],
                                // alignItems: 'center',
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderTopWidth: ((startCountry === "") ? 0 : 1),
                                borderTopColor: "#DDD",
                                marginTop: ((startCountry === "") ? 0 : 10),
                                paddingTop: ((startCountry === "") ? 0 : 20)
                            }}>
                                {(startDestination = "") ? null : null}
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: "600",
                                    color: 'green'
                                }}>
                                    {(startCountry = item.countryName) ? item.countryName : 'Accommodation'}
                                </Text>
                            </View> : null}

                            {startDestination !== item.destinationName ? <View style={{
                                // backgroundColor: color_[item.baseId / 200],
                                // alignItems: 'center',
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderTopWidth: ((startDestination === "") ? 0 : 1),
                                borderTopColor: "#DDD",
                                marginTop: ((startDestination === "") ? 0 : 10),
                                paddingTop: ((startDestination === "") ? 0 : 20)
                            }}>
                                {(startBaseId = -1) ? null : null}
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "600",
                                    color: '#808836'
                                }}>
                                    {(startDestination = item.destinationName) ? item.destinationName : 'Accommodation'}
                                </Text>
                            </View> : null}


                            {startBaseId < item.baseId ? <View style={{
                                // backgroundColor: color_[item.baseId / 200],
                                // alignItems: 'center',
                                paddingVertical: 10,
                                borderRadius: 10

                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: color_[item.baseId / 200]
                                }}>
                                    {(startBaseId = item.baseId) ? service[item.baseId / 200].label : 'Accommodation'}
                                </Text>
                            </View> : null}

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginVertical: 10,
                                    paddingHorizontal: 10
                                }}
                                key={index}
                            >
                                <Text
                                    style={{
                                        width: 280,
                                        fontSize: 16,
                                        // fontWeight: "600",
                                        borderRightWidth: 1,
                                        borderRightColor: "#CCC",
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    {item.name ? item.name.substr(0, 80) : item.type}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        paddingHorizontal: 15

                                    }}
                                >
                                    ${item.price}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const renderBillingDetails = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Billing Details
                </Text>
                <View
                    style={{
                        backgroundColor: "white",
                        borderRadius: 7,
                        padding: 10,
                        marginTop: 15,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "400",
                                color: "gray",
                            }}
                        >
                            Item Total
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "400",
                            }}
                        >
                            ${total}
                        </Text>
                    </View>

                    {service.map((item, index) => (
                        <>
                            {item.cost ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}

                                    key={index}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "gray",
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "green",
                                        }}
                                    >
                                        ${item.cost}
                                    </Text>
                                </View>
                            ) : (
                                null
                            )}
                        </>
                    ))}

                    <View
                        style={{
                            borderColor: "gray",
                            height: 1,
                            borderWidth: 0.5,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: "gray",
                            }}
                        >
                            Taxes and Charges
                        </Text>

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "400",
                                color: "green",
                            }}
                        >
                            ${(0.05 * total).toFixed(2)}
                        </Text>
                    </View>

                    <View
                        style={{
                            borderColor: "gray",
                            height: 1,
                            borderWidth: 0.5,
                            marginTop: 10,
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            To Pay
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            ${total + 0.05 * total}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderCreditCard = () => {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Credit Card Details
                </Text>
                <View
                    style={{
                        borderRadius: 7,
                        marginTop: 15,
                    }}
                >
                    {creditCardData && creditCardData.map((card, index) => (
                        <CardItem
                            key={`MyCard-${index}`}
                            card={card}
                            isSelected={selectedCard == index}
                            onPress={() => {
                                setSelectedCardData(card);
                                setSelectedCard(index);
                            }}
                        />
                    ))}
                    <AddCardItem
                        onPress={() => { navigateToPaymentScreen() }}
                    />
                </View>
            </View>
        );
    };

    const renderEmptyCart = () => {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "600",
                    }}
                >
                    Your Cart is Empty!
                </Text>
            </View>
        );
    };


    return (
        <>
            <View
                style={{
                    padding: 15,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back"
                    size={25}
                    color="black"
                />
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "600",
                        marginLeft: 20,
                    }}
                >
                    Billing
                </Text>
            </View>
            <ScrollView>
                {total > 0 ? (
                    <>
                        {renderTour()}
                        {renderServiceList()}
                        {renderBillingDetails()}
                        {renderCreditCard()}
                    </>
                ) : (
                    <>
                        {renderEmptyCart()}
                    </>

                )}
            </ScrollView>

            {total === 0 ? null : (
                <Pressable
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        marginBottom: 20,
                        padding: 20,
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            ${total + 0.05 * total}
                        </Text>
                        <Text style={{ color: "#00A877", fontSize: 17 }}>
                            View Detailed Bill
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={async () => {
                            handlePayment()
                        }}
                        style={{
                            backgroundColor: "#00A877",
                            padding: 14,
                            width: 200,
                            borderRadius: 6,
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            Proceed To pay
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            )}
        </>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: 'black'
    }
});
