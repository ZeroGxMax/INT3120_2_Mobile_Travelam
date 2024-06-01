import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ImageBackground,
    Button,
    TouchableOpacity,
    Modal,
    Alert,
    // ScrollView
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ManagementSubDetail from "./ManagementSubDetail";
import { AccountList, TourList, DestinationList, AccomList, RestList, TransList, ActList, TransactionList, FeedbackList } from "./TitleList";
import { ScrollView } from "react-native-gesture-handler";



const ManagementItem = ({ item, props, title }) => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);

    let menus = []

    if (title == "Accounts") {
        menus = AccountList
    } 

    if (title == "Tours") {
        menus = TourList
    }

    if (title == "Destinations") {
        menus = DestinationList
    }

    if (title == "Accommodations") {
        menus = AccomList
    }

    if (title == "Restaurants") {
        menus = RestList
    }

    if (title == "Transportations") {
        menus = TransList
    }

    if (title == "Activities") {
        menus = ActList
    }

    if (title == "Transactions") {
        menus = TransactionList
    }

    if (title == "Feedbacks") {
        menus = FeedbackList
    }

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
                    }}>{item[props[3]] ? item[props[3]].substring(0, 40) + (props[3] === 'amount' ? '$' : null) : 'Undefined'}</Text>
                </View>
                <TouchableOpacity
                    style={{ marginRight: 5 }}
                    onPress={() => setModalVisible(true)}
                >
                    <AntDesign name="edit" size={24} color="grey" />
                </TouchableOpacity>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                            // Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <ScrollView style={{
                            flex: 1,
                            // margin: 15,
                            padding: 15
                        }}>
                            <View style={{
                                marginTop: 20,
                                marginBottom: 30,
                                alignItems: "center",
                            }}>
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                }}>{title} Editing</Text>
                            </View>
                            <View>
                                {menus.map((menu, key) => (
                                    <ManagementSubDetail key={key} item={item} menu={menu} />
                                ))}
                            </View>
                            <View style={{
                                flexDirection: "row",
                                marginBottom: 50
                            }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose, {
                                        marginLeft: 10,
                                        backgroundColor: "green"
                                    }]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>Save</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        position: 'absolute'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'white',
        width: 120,
        borderWidth: 0.5,
        borderColor: "grey"
    },
    textStyle: {
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ManagementItem;

