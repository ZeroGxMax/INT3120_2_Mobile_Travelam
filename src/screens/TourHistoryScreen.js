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
import { Ionicons } from "@expo/vector-icons";
import hotels from "../data/hotels";
import PaidTourItem from "../components/PaidTourItem";
import { useNavigation } from "@react-navigation/native";
import LoadingView from '../components/utils/LoadingView';
import { getAllPayment, getUserPayment } from "../services/firebase/payment"
import { auth } from "../services/firebaseService";

const TourHistoryScreen = () => {
    const [payment, setPayment] = useState([])
    const [loading, setLoading] = useState(true);
    
    const [queryData, setQueryData] = useState(payment)

    const handleSearch = (text) => {
        if (text) {
            const filteredData = payment.filter((pay) =>
                pay.tourName.toLowerCase().includes(text.toLowerCase())
            );
            setQueryData(filteredData);
        } else {
            setQueryData(payment)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                if (true) {
                    const userPayment = await getUserPayment(auth.currentUser.uid)
                    setPayment(userPayment);
                    setQueryData(userPayment)
                    setLoading(false);
                } else {
                    const allPayment = await getAllPayment();
                    setPayment(allPayment);
                    setQueryData(allPayment)
                    setLoading(false);
                }
                
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
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    margin: 10,
                    padding: 10,
                    borderColor: "#C0C0C0",
                    borderRadius: 7,
                    marginTop: 20
                }}
            >
                <TextInput
                    style={{ fontSize: 17 }}
                    placeholder="Search for transactions                                      "
                    onChangeText={(text) => handleSearch(text)}
                />
                <AntDesign name="search1" size={24} color="#FF724C" />
            </View>
            {queryData.map((item, index) => (
                <PaidTourItem key={2300 + index} item={item} />
            ))}
        </ScrollView>
    );
};

export default TourHistoryScreen;

const styles = StyleSheet.create({
    countryItem: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    }
});
