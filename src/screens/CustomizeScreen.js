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
import { getCountryFromId, getCountryFromName, getAllCountry } from "../services/firebase/country";

const CustomizeScreen = () => {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const data = hotels;

    const [queryData, setQueryData] = useState(country)

    const handleSearch = (text) => {
        if (text) {
            const filteredData = country.filter((coun) =>
                coun.countryName.toLowerCase().includes(text.toLowerCase())
            );
            setQueryData(filteredData);
        } else {
            setQueryData(country)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                const allCountryData = await getAllCountry();
                setCountry(allCountryData);
                setQueryData(allCountryData)
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 25, fontWeight: 600 }}>Tour Customization</Text>
            </View>

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
                }}
            >
                <TextInput
                    style={{ fontSize: 17 }}
                    placeholder="Search for Countries                                      "
                    onChangeText={(text) => handleSearch(text)}
                />
                <AntDesign name="search1" size={24} color="#FF724C" />
            </View>
            {queryData.map((item) => (
                <CountryMenuItem key={item.id} item={item} />
            ))}
        </ScrollView>
    );
};

export default CustomizeScreen;

const styles = StyleSheet.create({
    countryItem: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    }
});
