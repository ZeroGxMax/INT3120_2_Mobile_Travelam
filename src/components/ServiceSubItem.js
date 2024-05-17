import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../redux/CartReducer";
const ServiceSubItem = ({ service, baseId }) => {
  const dispatch = useDispatch();
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  return (
    <View style={{ padding: 10, margin: 10, borderColor: "gray", borderRadius: 5, backgroundColor: "#DDDDDD" }}>
      <Pressable
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>{
            service.name
            ? service.name.substr(0, 20)
            : service.type}</Text
          >
          <Text style={{ fontWeight: "600" }}>{"70$"}</Text>
          <Text
            style={{
              marginTop: 5,
              borderRadius: 4,
            }}
          >
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                 key={`${service.id}-${i}`}
                style={{ paddingHorizontal: 3 }}
                name={i < Math.floor(4.5) ? "star" : "star-o"}
                size={15}
                color="yellow"
              />
            ))}
          </Text>
          <Text
            style={{ width: 180, marginTop: 8, color: "gray", fontSize: 16 }}
          >
            {(service.additionInfo + service.description).length > 40
              ? (service.additionInfo + service.description).substr(0, 60) + "..."
              : (service.additionInfo + service.description)}
          </Text>
        </View>

        <Pressable style={{ marginRight: 10 }}>
          <Image
            style={styles.image}
            source={{ uri: service.demoImage.split(',\n')[0] }}
          />
          {selected ? (
            <Pressable
              style={{
                position: "absolute",
                top: 105,
                left: 21,

                flexDirection: "row",
                paddingHorizontal: 12,
                paddingVertical: 5,
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <Pressable onPress={() => {
                if(additems === 1){
                  dispatch(removeFromCart(service))
                  setSelected(false)
                  setAddItems(0);
                }else{
                  setAddItems((c) => c - 1);
                  dispatch(decrementQuantity(service))

                }
              }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "green",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    fontSize: 14,
                    color: "green",
                    paddingHorizontal: 6,
                  }}
                >
                  {additems}
                </Text>
              </Pressable>

              <Pressable onPress={() => {
                setAddItems((c) => c + 1);
                dispatch(incrementQuantity(service))
              }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "green",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setSelected(true);
                if (additems == 0) {
                  setAddItems((c) => c + 1);
                }
                dispatch(addToCart(service));
              }}
              style={{
                position: "absolute",
                top: 105,
                left: 20,

                flexDirection: "row",
                paddingHorizontal: 25,
                paddingVertical: 5,
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#018749",
                }}
              >
                ADD
              </Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ServiceSubItem;

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 5,
    }
});
