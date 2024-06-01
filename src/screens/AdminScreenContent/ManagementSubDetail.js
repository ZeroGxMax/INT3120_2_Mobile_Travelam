import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { auth, firebaseApp } from '../../services/firebaseService'
import { getCustomerFromId } from "../../services/firebase/user"
import { colors } from "../../assets/colors/colors"
import { ref, getDatabase, update } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";

export default MenuItem = ({ key, item, menu }) => {
    const [editable, setEditable] = useState(false)
    const [text, setText] = useState("")
    
    return (
        <>
            <View style={{
                marginBottom: 10,
                padding: 10,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#EEE",
                paddingHorizontal: 10
            }} key={key}>
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                    }}>{menu.title}</Text>
                    <Text style={{
                        fontSize: 16,
                    }}>{item[menu.prop]}</Text>
                </View>
                <AntDesign name="ellipsis1" size={24} color="black" />
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    firstItem: {
        borderTopWidth: 1,
    },
    menu: {
        borderBottomWidth: 1,
        borderColor: '#CBCBCB',
        padding: 20,
        flexDirection: 'row',

    },
    customizeMenu: {
        borderColor: '#CBCBCB',
        padding: 20,
        flexDirection: 'column',
        backgroundColor: "#DDD",
    },
    textMenu: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#C0C0C0",
        borderRadius: 7,
        borderBottomWidth: 1,
        borderColor: '#CBCBCB',
        padding: 20,
        flexDirection: 'row',
    },
    menuItem: {
        color: '#262626',
        letterSpacing: 0,
        alignSelf: 'flex-start',
        flex: 1,
    },
    menuItemCustomize: {
        color: '#262626',
        letterSpacing: 0,
        alignSelf: 'flex-start',
        flex: 1,
    },
    icon: {
        alignSelf: 'flex-end',
    },
});

const sty = StyleSheet.create({
    buttonWrapper: {
        marginLeft: 270,
        marginTop: 15,
        backgroundColor: "#666",
        alignItems: 'center',
        paddingVertical: 7,
        borderRadius: 10,
        color: "white"
    },
})