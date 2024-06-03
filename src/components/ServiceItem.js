import { StyleSheet, Text, View, Pressable } from "react-native";
import React ,{useState} from "react";
import { AntDesign } from "@expo/vector-icons";
import ServiceSubItem from "./ServiceSubItem";

const ServiceItem = ({ item }) => {
  const data = [item];
  const [selected,setSelected] = useState(["Accommodation"]);
  const handleItemSelect = (item) => {
    const itemSelected = selected.find((c) => c === item);
    if(itemSelected){
        setSelected(selected.filter((sel) => sel !== item));
    }else{
        setSelected([...selected,item]);
    }

  }
  return (
    <View>
      {data.map((item, index) => (
        <View key={1400 + index}>
          <Pressable
          onPress={() => handleItemSelect(item.name)}
            style={styles.serviceItem}

          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {item.name} ({item.items.length})
            </Text>
            {selected.includes(item.name) ? (
                <AntDesign name="down" size={24} color="white" />
            ) : (
                <AntDesign name="right" size={24} color="white" />
            )}
          </Pressable>


        {selected.includes(item.name) ? (
            item.items.map((service,index) => (
                <ServiceSubItem service={service} key={1500 + index} baseId={item.id}/>
            ))
        ) : (
            null
        )}
          
        </View>
      ))}
    </View>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
    serviceItem: {
        margin: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#008000",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        borderRadius: 10
    }
});
