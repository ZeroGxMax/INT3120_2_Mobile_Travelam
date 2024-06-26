import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%",
    },
    textView: {
        position: "absolute",
        left: width / 10,
        bottom: height / 40,
    },
    title: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
    },
    description: {
        color: "white",
        marginVertical: 10,
    },
    cardView: {
        height: height / 1.8,
        width: width,
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },

});