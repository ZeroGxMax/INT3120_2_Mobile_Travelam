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
import CountryMenuItem from "../../components/CountryMenuItem";
import LoadingView from '../../components/utils/LoadingView';
import { getCountryFromId, getCountryFromName, getAllCountry } from "../../services/firebase/country";

const ManagementScreen = () => {
    const [country, setCountry] = useState([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();

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
                            placeholder="Search     "
                            onChangeText={(text) => handleSearch(text)}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#DDD"
                    }}
                >
                    <View style={{ borderRightWidth: 1, borderRightColor: "#DDD", paddingHorizontal: 45}}>
                        <Text style={{ fontSize: 16, color: "grey" }}>{route.params.props[0]}</Text>
                    </View>
                    <View style={{ borderRightWidth: 1, borderRightColor: "#DDD", paddingHorizontal: 45 }}>
                        <Text style={{ fontSize: 16, color: "grey" }}>{route.params.props[1]}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 35 }}>
                        <Text style={{ fontSize: 16, color: "grey" }}>Action</Text>
                    </View>
                </View>
            </View>
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
