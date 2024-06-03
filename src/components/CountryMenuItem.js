import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  Button,
  Dimensions,
  TouchableOpacity
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../assets/colors/colors"
const CountryMenuItem = ({ item, countryName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={ styles.countryItem }>
      <Pressable
        onPress={() =>
          navigation.navigate("Destination", {
            id: item.id,
            name: item.countryName
          })
        }
        style={{ flexDirection: "column" }}
      >
        <View>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ height: 200, width: 388 }}
            source={{ uri: item.demoImage }}
          >
            <AntDesign
              style={{ position: "absolute", top: 10, right: 10 }}
              name="hearto"
              size={24}
              color="white"
            />
          </ImageBackground>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.countryName}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
          >
            <MaterialIcons name="stars" size={24} color="green" />
            <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
              {5.0} - Excellent
            </Text>
          </View>
          <View>
              {item.additionInfo.split(",").slice(0, 3).map((info, index) => (
                <View key={1000 + index}>
                    <Text>
                        <AntDesign
                            name="star"
                            size={24}
                            color="#0EEBBE"
                        />

                        {info}

                    </Text>
                </View>
              ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate("Destination", {
                    id: item.id,
                    name: item.countryName
                })}
            >
                <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>Customize New Tour</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default CountryMenuItem;

const styles = StyleSheet.create({
    countryItem: {
        margin: 10,
        borderRadius: 6,
        backgroundColor: "#DDD",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    buttonWrapper: {
        marginBottom: 10,
        backgroundColor: "#13ED77",
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 10,
        color: "white"
    },
});

