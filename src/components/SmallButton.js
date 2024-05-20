import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SmallButton({ icon, text, onPress, style, color }) {
    if (icon) {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.smallButton, style]}>
                <AntDesign
                    style={{ color, textAlign: "right" }}
                    name={icon}
                    size={24}
                />
            </TouchableOpacity>
        );
    } else if (text) {
        return (
            <TouchableOpacity onPress={onPress} style={[styles.smallButton, style]}>
                <Text style={{ color: "white", fontSize: 26 }}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    smallButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.3)",
        justifyContent: "center",
        alignItems: "center",
    }
});