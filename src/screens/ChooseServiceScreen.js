import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Pressable,
    Image,
    ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import LoadingView from '../components/utils/LoadingView';
import ServiceItem from "../components/ServiceItem";
import { getAccomFromDestId } from "../services/firebase/accom";
import { getRestFromDestId } from "../services/firebase/rest";
import { getTransFromDestId } from "../services/firebase/trans";
import { getActFromDestId } from "../services/firebase/activity";

const ChooseServiceScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart
        .map((item) => 70 * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
    console.log(total);
    console.log(cart);
    const route = useRoute();
    const navigation = useNavigation();
    const [menu, setMenu] = useState([]);
    const [accom, setAccom] = useState([])
    const [rest, setRest] = useState([])
    const [trans, setTrans] = useState([])
    const [activity, setActivity] = useState([])
    const [data, setData] = useState({
        'accom': accom,
        'rest': rest,
        'trans': trans,
        'activity': activity
    });
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                const allAccomData = await getAccomFromDestId(route.params.id);
                setAccom(allAccomData);

                const allRestData = await getRestFromDestId(route.params.id);
                setRest(allRestData);

                const allTransData = await getTransFromDestId(route.params.id);
                setTrans(allTransData);

                const allActData = await getActFromDestId(route.params.id);
                setActivity(allActData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <LoadingView />;
    }

    return (
        <>
            <ScrollView>
                <View
                    style={{
                        height: 510,
                        backgroundColor: "#B0C4DE",
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        flex: 1,
                        marginBottom: 10
                    }}
                >
                    <Image
                        style={{
                            justifyContent: 'space-between',
                            height: 300,
                        }}
                        source={{ uri: route.params.image }}
                    >
                    </Image>
                    <View
                        style={{
                            backgroundColor: "#333",
                            height: 210,
                            padding: 10,
                            borderBottomLeftRadius: 15,
                            borderBottomRightRadius: 15,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ fontSize: 19, fontWeight: "bold", color: "white" }}>
                                {route.params.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <AntDesign
                                    style={{ marginHorizontal: 7 }}
                                    name="sharealt"
                                    size={24}
                                    color="white"
                                />
                                <AntDesign
                                    name="hearto"
                                    size={24}
                                    color="white"
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 7,
                            }}
                        >
                            <MaterialIcons
                                name="stars"
                                size={24}
                                color="green"
                            />
                            <Text
                                style={{
                                    marginLeft: 3,
                                    fontSize: 17,
                                    fontWeight: "400",
                                    color: "white"
                                }}
                            >
                                {route.params.rating}
                            </Text>
                            <Text style={{ marginLeft: 3, color: "white" }}>•</Text>
                            <Text
                                style={{
                                    marginLeft: 3,
                                    fontSize: 17,
                                    fontWeight: "400",
                                    color: "white"
                                }}
                            >
                                {route.params.time}mins
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Outlet</Text>
                            <Text
                                style={{
                                    marginLeft: 15,
                                    fontSize: 15,
                                    fontWeight: "bold",
                                    color: "white"
                                }}
                            >
                                {route.params.address}
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>22 mins</Text>
                            <Text
                                style={{
                                    marginLeft: 15,
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "white"
                                }}
                            >
                                Home
                            </Text>
                        </View>

                        <Text
                            style={{
                                borderColor: "white",
                                borderWidth: 0.6,
                                height: 1,
                                marginTop: 12,
                            }}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                                color: "white"
                            }}
                        >
                            <FontAwesome5
                                name="bicycle"
                                size={24}
                                color="orange"
                            />
                            <Text
                                style={{
                                    marginLeft: 7,
                                    color: "gray",
                                    fontSize: 16,
                                    color: "white"
                                }}
                            >
                                0-3 Kms |
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 7,
                                    color: "gray",
                                    fontSize: 16,
                                    color: "white"
                                }}
                            >
                                35 Delivery Fee will Apply
                            </Text>
                        </View>
                    </View>
                </View>
                {(accom && trans && rest && activity) ? (
                [{ id: 0, name: "Accommodation", items: accom },
                { id: 200, name: "Restaurant", items: rest },
                { id: 400, name: "Transportation", items: trans },
                { id: 600, name: "Activity", items: activity }].map((item, index) => (
                    <ServiceItem item={item} key={index} />
                    ))
                ) : (
                    <Text>No menu data available</Text>
                )}

                {total === 0 ? null : <View style={{ marginBottom: 120 }}></View> }

            </ScrollView>

            {total === 0 ? null : (
                <Pressable
                    style={{
                        backgroundColor: "#00A877",
                        width: "90%",
                        padding: 13,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 30,
                        position: "absolute",
                        borderRadius: 8,
                        left: 20,
                        bottom: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                {cart.length} items | {total}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    marginTop: 3,
                                    color: "white",
                                }}
                            >
                                Extra Charges may Apply!
                            </Text>
                        </View>

                        <Pressable
                            onPress={() =>
                                navigation.navigate("Cart", {
                                    name: route.params.name,
                                })
                            }
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "600",
                                    color: "white",
                                }}
                            >
                                View Cart
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            )}
        </>
    );
};

export default ChooseServiceScreen;

const styles = StyleSheet.create({});
