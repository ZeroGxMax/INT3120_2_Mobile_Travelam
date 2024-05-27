import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from "react-native";
import React, { useContext, createContextj } from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    cleanCart,
    removeFromCart,
} from "../redux/CartReducer";
import { db } from "../services/firebaseService";
const CartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const cart = useSelector((state) => state.cart.cart);
    const sortedCart = [...cart].sort((a, b) => a.baseId - b.baseId);
    const total = cart
        .map((item) => 70)
        .reduce((curr, prev) => curr + prev, 0);

    let cost_ = [0, 0, 0, 0]

    for (let i = 0; i < 4; i++) {
        cost_[i] = cart
            .map((item) => (item.baseId == i * 200) ? 70 : 0)
            .reduce((curr, prev) => curr + prev, 0);
    }

    const dispatch = useDispatch();
    var startBaseId = -1
    const label_ = ['Accommodation', 'Restaurant', 'Transportation', 'Activity']

    const color_ = ['#007200', '#25a18e', '#004e64', '#00a5cf']

    return (
        <>
            <ScrollView>
                {total > 0 ? (
                    <>
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
                                    {startBaseId < item.baseId ? <View style={{
                                        backgroundColor: color_[item.baseId / 200],
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                        borderRadius: 10
                                    }}>
                                        <Text style={styles.label}>
                                            {(startBaseId = item.baseId) ? label_[item.baseId / 200] : 'Accommodation'}
                                        </Text>
                                    </View> : null}

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginVertical: 10,
                                        }}
                                        key={index}
                                    >
                                        <Text
                                            style={{
                                                width: 100,
                                                fontSize: 16,
                                                fontWeight: "600",
                                            }}
                                        >
                                            {item.name ? item.name.substr(0, 20) : item.type}
                                        </Text>

                                        <Pressable
                                            style={{
                                                flexDirection: "row",
                                                paddingHorizontal: 10,
                                                paddingVertical: 5,
                                                alignItems: "center",
                                                borderColor: "#BEBEBE",
                                                borderWidth: 0.5,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <Pressable
                                                onPress={() => {
                                                    dispatch(removeFromCart(item))
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: "green",
                                                        paddingHorizontal: 6,
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    REMOVE
                                                </Text>
                                            </Pressable>
                                        </Pressable>

                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            ${70}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

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

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "gray",
                                        }}
                                    >
                                        Accommodation
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "green",
                                        }}
                                    >
                                        ${cost_[0]}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "gray",
                                        }}
                                    >
                                        Restaurant
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "green",
                                        }}
                                    >
                                        ${cost_[1]}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "gray",
                                        }}
                                    >
                                        Transportation
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "green",
                                        }}
                                    >
                                        ${cost_[2]}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginVertical: 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "gray",
                                        }}
                                    >
                                        Activity
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: "400",
                                            color: "green",
                                        }}
                                    >
                                        ${cost_[3]}
                                    </Text>
                                </View>

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
                                        ${0.05 * total}
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
                    </>
                ) : (
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

                    <Pressable
                        onPress={() => {
                            Alert.alert("Proceeding to pay ....")
                            navigation.navigate('Discover')
                            dispatch(cleanCart());
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
                    </Pressable>
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
        color: 'white'
    }
});
