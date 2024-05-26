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
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../assets/colors/colors"


const PaidTourItem = ({ item, countryName }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)

  const paidTour = {
    'name': 'Tour 1',
    'countryId': 1,
    'destinationId': 1,
    'accom': [1, 2, 3, 4],
    'rest': [1, 2, 3, 4],
    'trans': [1, 2, 3, 4],
    'activity': [1, 2, 3, 4]
  }

  return (
    <TouchableOpacity style={styles.countryItem}>
      <Pressable
        onPress={() =>
          navigation.navigate("Paid Tour Detail", {
            tour: paidTour
          })
        }
        style={{ flexDirection: "row" }}
      >
        <View>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ height: 180, width: 150 }}
            source={{ uri: item.demoImage }}
          >
          </ImageBackground>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.countryName}</Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
          >
            <MaterialIcons name="stars" size={18} color="green" />
            <Text style={{ marginLeft: 3, fontSize: 12, fontWeight: "400" }}>
              {5.0}
            </Text>
            <Text style={{ marginLeft: 3 }}>•</Text>
            <Text style={{ marginLeft: 3, fontSize: 12, fontWeight: "400" }}>
              {"30-40"}mins
            </Text>
          </View>
          <View>
            {item.additionInfo.split(",").slice(0, 4).map((info, index) => (
              <View style={{ marginVertical: 2 }} key={index}>
                <Text style={{ fontSize: 12 }}>
                  <AntDesign
                    name="star"
                    size={18}
                    color="#0EEBBE"
                  />

                  {info}

                </Text>
              </View>
            ))}
          </View>
        </View>
      </Pressable>

    </TouchableOpacity>
  );
};

export default PaidTourItem;

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
    marginRight: 15,
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

