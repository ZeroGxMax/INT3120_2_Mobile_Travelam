import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    ScrollView,
    Pressable,
    Image,
    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import hotels from "../data/hotels";
import { Logo } from "../assets"
import CountryMenuItem from "../components/CountryMenuItem";
import { useNavigation } from "@react-navigation/native";
import LoadingView from '../components/utils/LoadingView';
import { getCountryFromId, getCountryFromName, getAllCountry } from "../services/firebase/country";
import { colors } from "../assets/colors/colors"

import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseService"

const OptionsScreen = () => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const optionsList = [{
        "title": "User Profile",
        "navigation": "Profile",
        "icon": "user",
    }, {
        "title": "Paid Tours",
        "navigation": "Paid Tours",
        "icon": "flag",
    }, {
        "title": "Transactions",
        "navigation": "Transactions",
        "icon": "switcher",
    }, {
        "title": "Contact Supports",
        "navigation": "Contact Supports",
        "icon": "customerservice",
    }]

    const handleLogout = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };

    if (loading) {
        return <LoadingView />;
    }

    return (
        <View>
            {/* <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 10,
                    marginTop: 80
                }}
            >
                <Text style={{ fontSize: 40, fontWeight: 600 }}>User Profile</Text>
            </View> */}

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 10,
                    marginTop: 50,
                    marginBottom: 30
                }}
            >
                <Image source={Logo} style={styles.image} />
            </View>
            {/* <View style={{
                width: '100%',
                borderWidth: 0.5,
                borderColor: "grey",
            }}>

            </View> */}
            <View style={{
                marginVertical: 10,
                paddingHorizontal: 40
            }}>
                {optionsList.map((item, index) => (
                    <TouchableOpacity
                        style={styles.labelWrapper}
                        onPress={() => navigation.navigate(item.navigation)}
                        key={index}
                    >
                        <View style={{ width: 30, alignItems: "center", marginRight: 10 }}>
                            <AntDesign name={item.icon} size={20} color="black" />
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 305 }}>
                            <Text style={styles.label}>
                                {item.title}
                            </Text>
                            <View style={{ width: 30, alignItems: "center", marginRight: 10 }}>
                                <AntDesign name='right' size={20} color="black" />
                            </View>
                        </View>

                    </TouchableOpacity>
                ))}

            </View>

            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={handleLogout}
            >
                <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>Sign Out</Text>
                <View style={{ width: 30, alignItems: "center", marginRight: 10, marginLeft: 10 }}>
                    <AntDesign name="logout" size={26} color="white" />
                </View>
            </TouchableOpacity>

        </View>
    );
};

export default OptionsScreen;

const styles = StyleSheet.create({
    countryItem: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    labelWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#CCC",
        marginBottom: 20
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'whites'
    },
    image: {
        width: 300
    },
    buttonWrapper: {
        marginHorizontal: 37,
        marginBottom: 20,
        marginTop: 15,
        backgroundColor: "#799351",
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 105,
        borderRadius: 10,
        color: "white",
        position: "absolute",
        top: 650,
        width: 330,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 5,
    },
});
