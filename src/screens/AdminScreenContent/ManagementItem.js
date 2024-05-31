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
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ManagementItem = ({ item, props }) => { 
    const navigation = useNavigation();
    const [selected, setSelected] = useState(1)

    // console.log(item.avatar)
    // console.log(item.demoImage)

    // console.log(item.demoImage.split(",\n")[0])

    return (
        <View>
            <View style={{
                padding: 10,
                borderTopWidth: 0.5,
                borderColor: "grey",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Image
                    source={{ uri: (item[props[0]] ? item[props[0]].split(",\n")[0] : "https://cdn-icons-png.flaticon.com/512/3541/3541871.png") }}
                    style={{
                        width: 50,
                        height: 50,
                        borderWidth: 1,
                        borderRadius: 50,
                        borderColor: "grey",
                        marginRight: 10
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 600
                    }}>{item[props[1]] ? item[props[1]] : item.type}</Text>

                    <Text style={{
                        fontSize: 12,
                        color: "grey"
                    }}>{item[props[2]] ? item[props[2]].substring(0, 40) : 'Undefined'}</Text>

                    <Text style={{
                        fontSize: 12,
                        color: "grey"
                    }}>{item[props[3]] ? item[props[3]].substring(0, 40) : 'Undefined'}</Text>
                </View>
                <TouchableOpacity 
                    style={{ marginRight: 5 }}
                    onPress={() => setSelected(selected + 1)}
                >
                    <AntDesign name="edit" size={24} color="grey" />
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default ManagementItem;

