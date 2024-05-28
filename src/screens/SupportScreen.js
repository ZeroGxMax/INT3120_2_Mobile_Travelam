import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    ScrollView,
    Pressable,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Support } from "../assets"
import { useNavigation } from "@react-navigation/native";
import LoadingView from '../components/utils/LoadingView';
import { auth, firebaseApp } from "../services/firebaseService";
import { ref, getDatabase, update } from "firebase/database";
import { getFeedbackId } from "../services/firebase/feedback";
import call from 'react-native-phone-call';

const db = getDatabase(firebaseApp);


const SupportScreen = () => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("")
    const navigation = useNavigation();
    const admin_phone = '03966565646'
    const admin_email = 'admin@gmail.com'
    const admin_name = 'Nguyễn Trung Hiếu'

    const submitRequest = async () => {
        console.log("Submitted request: ", text)
        const id = await getFeedbackId();
        const feedbackRef = ref(db, `Feedback/data/${id}`);
        const userAuth = auth.currentUser;
        const newFeedback = {
            "id": `${id}`,
            "user": userAuth['email'],
            "request": text
        }

        await update(feedbackRef, newFeedback);
        setText("")

        navigation.navigate("Discover")

        Alert.alert("Sending supporting request....")
    };

    const makeCall = () => {
        const args = {
          number: admin_phone,
          prompt: true, 
        };
    
        call(args).catch(console.error);
      };

    if (loading) {
        return <LoadingView />;
    }

    return (
        <View>

            <View
                style={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 10,
                    padding: 10,
                    marginTop: 10,
                    marginBottom: 10
                }}
            >
                <Image
                    source={Support}
                    style={styles.image}
                />
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginTop: 10
                }}>CONTACT US</Text>
            </View>
            {/* <View style={{
                width: '100%',
                borderWidth: 0.5,
                borderColor: "grey",
            }}>

            </View> */}
            <View style={{
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 7,
                padding: 10,
                borderColor: "#BBB",
                marginHorizontal: 30,
                flexDirection: "row",
            }}>
                <View style={{
                    flexDirection: "column",
                    marginRight: 125
                }}>
                    <Text style={{
                        fontSize: 12
                    }}>
                        Admin's Name
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                    }}>{admin_name}</Text>
                </View>
                <View style={{
                    borderWidth: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingHorizontal: 6,
                    borderRadius: 100,
                    borderColor: "#AAA"

                }}>
                    <AntDesign name="user" size={28} color="grey" />
                </View>
            </View>

            <View style={{
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 7,
                padding: 10,
                borderColor: "#BBB",
                marginHorizontal: 30,
                flexDirection: "row",
            }}>
                <View style={{
                    flexDirection: "column",
                    marginRight: 128
                }}>
                    <Text style={{
                        fontSize: 12
                    }}>
                        Admin's Email
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                    }}>{admin_email}</Text>
                </View>
                <View style={{
                    borderWidth: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingHorizontal: 6,
                    borderRadius: 100,
                    borderColor: "#AAA"

                }}>
                    <AntDesign name="mail" size={28} color="grey" />
                </View>
            </View>

            <View style={{
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 7,
                padding: 10,
                borderColor: "#BBB",
                marginHorizontal: 30,
                flexDirection: "row",
            }}>
                <View style={{
                    flexDirection: "column",
                    marginRight: 155
                }}>
                    <Text style={{
                        fontSize: 12
                    }}>
                        Admin's Phone Number
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                    }}>{admin_phone}</Text>
                </View>
                <TouchableOpacity 
                    style={{
                        borderWidth: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingHorizontal: 6,
                        borderRadius: 100,
                        borderColor: "#AAA"
                    }}
                    onPress={makeCall}
                >
                    <AntDesign name="phone" size={28} color="grey" />
                </TouchableOpacity>
            </View>

            <View style={{
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 7,
                padding: 10,
                borderColor: "#BBB",
                marginHorizontal: 30,
                // flexDirection: "row",
            }}>
                <TextInput
                    style={{
                        textAlignVertical: 'top'
                    }}
                    multiline
                    numberOfLines={8}
                    onChangeText={setText}
                    value={text}
                    placeholder="Write your feedback"
                />
            </View>

            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={submitRequest}
            >
                <Text style={{ color: "white", fontWeight: 600, fontSize: 14 }}>Send Requests</Text>
            </TouchableOpacity>

        </View>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
    countryItem: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
    },
    labelWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#CCC",
        marginBottom: 20
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'whites'
    },
    image: {
        width: 100,
        height: 100
    },
    buttonWrapper: {
        marginHorizontal: 30,
        marginBottom: 20,
        marginTop: 15,
        backgroundColor: "#799351",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        color: "white",
        position: "absolute",
        top: 600,
        right: 0,
        width: 150,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 5,
    },
});
