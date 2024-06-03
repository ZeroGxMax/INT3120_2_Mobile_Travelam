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
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../assets/colors/colors"


const PaidTourItem = ({ item }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true)

  let startCountry = "";
  let startDestination = "";

  let countryList = [];

  let country = {
    'destination': []
  }
  let destination = {}
  let service = {}

  for (let i = 0; i < item.paymentDetail.length; i++) {
    const item_payment = item.paymentDetail[i];
    if (startCountry != item_payment.countryName) {
      countryList.push(country)
      country = {}
      country.name = item_payment.countryName;
      startCountry = country.name
      country.destination = []
    }

    if (startDestination != item_payment.destinationName) {
      country.destination.push(destination)
      destination = {}
      destination.name = item_payment.destinationName
      startDestination = destination.name
      destination.service = {
        accom: [],
        rest: [],
        trans: [],
        act: []
      }
    }

    if (item_payment.baseId == 0) {
      destination.service.accom.push(item_payment)
    }

    if (item_payment.baseId == 200) {
      destination.service.rest.push(item_payment)
    }

    if (item_payment.baseId == 400) {
      destination.service.trans.push(item_payment)
    }

    if (item_payment.baseId == 600) {
      destination.service.act.push(item_payment)
    }
  }

  country.destination.push(destination)
  countryList.push(country)

  // console.log(countryList[1].destination)

  const paidTour = {
    'name': item.tourName,
    'countryList': countryList,
    'cardHolder': item.creditCard.cardHolder,
    'cardNumber': item.creditCard.cardNumber,
    'startDate': item.startDate,
    'cost': item.amount
  }

  return (
    <TouchableOpacity style={styles.tourItem}>
      <Pressable
        onPress={() =>
          navigation.navigate("Paid Tour Detail", {
            tour: paidTour
          })
        }
        style={{ flexDirection: "row" }}
      >
        {/* <View>
          <ImageBackground
            imageStyle={{ borderRadius: 6 }}
            style={{ height: 180, width: 150 }}
            source={{ uri: item.demoImage }}
          >
          </ImageBackground>
        </View> */}

        <View style={{ margin: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.tourName}</Text>
          <View
            style={{ alignItems: "left", marginVertical: 10 }}
          >
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5
            }}>
              <View style={{
                width: 30,
                alignItems: "center",
              }}>
                <AntDesign name="enviroment" size={20} color="green" />
              </View>
              <Text style={{ marginLeft: 3, fontSize: 16, fontWeight: "400" }}>
                Paris & London
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5
            }}>
              <View style={{
                width: 30,
                alignItems: "center",
              }}>
                <FontAwesome name="user" size={20} color="#686D76" />
              </View>
              <Text style={{ marginLeft: 3, fontSize: 16, fontWeight: "400" }}>
                {item.creditCard.cardHolder}
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5
            }}>
              <View style={{
                width: 30,
                alignItems: "center",
              }}>
                <FontAwesome name="cc-mastercard" size={20} color="#799351" />
              </View>
              <Text style={{ marginLeft: 3, fontSize: 16, fontWeight: "400" }}>
                {item.creditCard.cardNumber}
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5
            }}>
              <View style={{
                width: 30,
                alignItems: "center",
              }}>
                <AntDesign name="tag" size={20} color="orange" />
              </View>
              <Text style={{ marginLeft: 3, fontSize: 16, fontWeight: "400" }}>
                {item.amount} $
              </Text>
            </View>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              // marginBottom: 5
            }}>
              <View style={{
                width: 30,
                alignItems: "center",
              }}>
                <FontAwesome5 name="calendar-day" size={24} color="#006769" />
              </View>
              <Text style={{ marginLeft: 3, fontSize: 16, fontWeight: "400" }}>
                {item.startDate}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

    </TouchableOpacity>
  );
};

export default PaidTourItem;

const styles = StyleSheet.create({
  tourItem: {
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

