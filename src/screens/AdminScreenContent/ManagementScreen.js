import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    ScrollView,
    Pressable,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ManagementItem from "./ManagementItem";
import LoadingView from '../../components/utils/LoadingView';
import { getAllCustomerData } from "../../services/firebase/user";
import { getAllTours } from "../../services/firebase/tours";
import { getAllDest } from "../../services/firebase/destination"
import { getAllAccommodation } from "../../services/firebase/accom"
import { getAllRestaurants } from "../../services/firebase/rest"
import { getAllTransportation } from "../../services/firebase/trans"
import { getAllActivity } from "../../services/firebase/activity"
import { getAllFeedback } from "../../services/firebase/feedback";
import { getAllPayment } from "../../services/firebase/payment";

const ManagementScreen = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const navigation = useNavigation();
    const route = useRoute();

    const [queryData, setQueryData] = useState(data)

    const handleSearch = (text) => {
        if (text) {
            const filteredData = data.filter((item_) =>
                (item_.name ? item_.name.toLowerCase().includes(text.toLowerCase()) : item_.title.toLowerCase().includes(text.toLowerCase()))
            );
            setQueryData(filteredData);
        } else {
            setQueryData(data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                let allData = []
                if (route.params.title === "Tours") {
                    allData = await getAllTours();
                }

                if (route.params.title === "Accounts") {
                    allData = await getAllCustomerData();
                }

                if (route.params.title === "Destinations") {
                    allData = await getAllDest();
                }

                if (route.params.title === "Accommodations") {
                    allData = await getAllAccommodation();
                }

                if (route.params.title === "Restaurants") {
                    allData = await getAllRestaurants();
                }

                if (route.params.title === "Transportations") {
                    allData = await getAllTransportation();
                }

                if (route.params.title === "Activities") {
                    allData = await getAllActivity();
                }

                if (route.params.title === "Transactions") {
                    allData = await getAllPayment();
                }

                if (route.params.title === "Feedbacks") {
                    allData = await getAllFeedback();
                }

                setData(allData);
                setQueryData(allData)
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
        <ScrollView>
            <View
                style={{
                    alignItems: "left",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: 600 }}>{route.params.title} Management</Text>
            </View>

            <View style={{
                marginHorizontal: 15,
                borderWidth: 1,
                borderColor: "#DDD",
                borderRadius: 10
            }}>
                <View style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#DDD",
                }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: 10,
                            padding: 5,
                            paddingHorizontal: 10,
                            borderColor: "#C0C0C0",
                            borderRadius: 7,
                            backgroundColor: "#DDD",
                        }}
                    >
                        <AntDesign name="search1" size={20} color="#FF724C" />
                        <TextInput
                            style={{ fontSize: 17, marginLeft: 5 }}
                            placeholder="Search                "
                            onChangeText={(text) => handleSearch(text)}
                        />
                    </View>
                </View>
                {queryData.map((item, index) => (
                    <ManagementItem item={item} key={2600 + index} props={route.params.props} title={route.params.title}/>
                ))}
                
            </View>

            <View style={{marginBottom: 30}}></View>
        </ScrollView>
    );
};

export default ManagementScreen;

const styles = StyleSheet.create({
    countryItem: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    }
});
