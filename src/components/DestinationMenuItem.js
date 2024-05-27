import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  Button,
  TouchableOpacity
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const DestinationMenuItem = ({ item, countryName }) => {
  const navigation = useNavigation();
  const startTime = Math.floor(Math.random() * 2) + 1
  const endTime = Math.floor(Math.random() * 3) + (startTime + 1)
  return (
    <View style={{ margin: 10 }}>
      <Pressable
        onPress={() =>
          navigation.navigate("Choose Service", {
            countryName: countryName,
            id: item.id,
            name:item.name,
            image:item.demoImage,
            rating:5.0,
            time:`${startTime}-${endTime}`,
            address:countryName,
          })
        }
        style={{ flexDirection: "row" }}
      >
        <View>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ aspectRatio: 5 / 6, height: 185 }}
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

        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}
          >
            <MaterialIcons name="stars" size={24} color="green" />
            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "400" }}>
              {5.0}
            </Text>
            <Text style={{ marginLeft: 3 }}>•</Text>
            <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
              {`${startTime}-${endTime}`} days
            </Text>
          </View>
          {item.additionInfo.split(",").slice(0, 3).map((info) => (
            <Text>
                <AntDesign
                    name="star"
                    size={24}
                    color="#0EEBBE"
                />

                {info}

            </Text>
          ))}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() =>
                    navigation.navigate("Choose Service", {
                        countryName: countryName,
                        id: item.id,
                        name:item.name,
                        image:item.demoImage,
                        rating:5.0,
                        time:`${startTime}-${endTime}`,
                        address:countryName,
                    })
                }
            >
                <Text style={{ color: "white", fontWeight: 600, fontSize: 14 }}>Customize New Tour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default DestinationMenuItem;

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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: "white"
    },
});

