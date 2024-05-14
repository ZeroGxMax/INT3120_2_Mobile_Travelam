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
import DestinationMenuItem from "../components/DestinationMenuItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingView from '../components/utils/LoadingView';
import { getAllDestFromCountry } from "../services/firebase/destination";

const DestinationScreen = () => {
    const [dest, setDest] = useState([])
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();

    const [queryData, setQueryData] = useState(dest)

    const handleSearch = (text) => {
        if (text) {
            const filteredData = dest.filter((desti) =>
                desti.name.toLowerCase().includes(text.toLowerCase())
            );
            setQueryData(filteredData);
        } else {
            setQueryData(dest)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all countries
                const allDestData = await getAllDestFromCountry(route.params.id);
                setDest(allDestData);
                setLoading(false);
                setQueryData(allDestData)
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
        <View>
        <ScrollView>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 40, fontWeight: 600, paddingBottom: 20 }}>{route.params.name}</Text>
                <Text style={{ fontSize: 25, fontWeight: 600 }}>Destination</Text>
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
                    placeholder="Search for Destinations                                       "
                    onChangeText={(text) => handleSearch(text)}
                />
                <AntDesign name="search1" size={24} color="#FF724C" />
            </View>
            {queryData.map((item) => (
                <DestinationMenuItem key={item.id} item={item} countryName={route.params.name}/>
            ))}
        </ScrollView>
        </View>
    );
};

export default DestinationScreen;

const styles = StyleSheet.create({});
