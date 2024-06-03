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
import CountryMenuItem from "../components/CountryMenuItem";
import { useNavigation } from "@react-navigation/native";
import LoadingView from '../components/utils/LoadingView';
import { getAllTours } from "../services/firebase/tours";
import RecommendedCard from "./DiscoverScreenContent/RecommendedCard";

const SearchScreen = () => {
    const [tour, setTour] = useState([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const [queryData, setQueryData] = useState(tour)

    const handleSearch = (text) => {
        if (text) {
            const filteredData = tour.filter((t) =>
                t.title.toLowerCase().includes(text.toLowerCase())
            );
            setQueryData(filteredData);
        } else {
            setQueryData(tour)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                const allTour = await getAllTours();
                setTour(allTour);
                setQueryData(allTour)
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
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderWidth: 1,
                    margin: 20,
                    padding: 10,
                    borderColor: "#C0C0C0",
                    borderRadius: 7,
                }}
            >
                <TextInput
                    style={{ fontSize: 17 }}
                    placeholder="Search for Tours                                      "
                    onChangeText={(text) => handleSearch(text)}
                />
                <AntDesign name="search1" size={24} color="#FF724C" />
            </View>
            {queryData.slice(0, 20).map((item, index) => (
                <View key={6000 + index} style={{
                    marginBottom: 30,
                    marginLeft: 20,
                }}>
                    <RecommendedCard item={item} />
                </View>
            ))}
        </ScrollView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    countryItem: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    }
});
