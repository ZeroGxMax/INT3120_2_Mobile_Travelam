import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";

import { HomeMorning, WhitePin } from '../assets';

const HomeScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="flex-1 relative">
            
            {/* Background Image */}
            <Image
                source={HomeMorning}
                className="absolute w-screen h-screen"
            />

            {/* Logo */}
            <Animatable.View animation={"bounceInDown"} duration={3000}>
                <View className="flex-row items-start justify-center space-x-2 mt-10 relative">
                    <View className="relative">
                        <Text className="mr-2 text-2xl">Travelam</Text>
                    </View>
                </View>
            </Animatable.View>

            <Animatable.View 
                animation={"slideInUp"}
                easing="ease-in"
                duration={1000}
                delay={1000}
                className="absolute bottom-0 bg-white/75  h-60 w-full rounded-t-[40px] flex items-center justify-between p-8">
                <View className="flex justify-center items-center mt-1">
                    <Text className="text-xl">Plan </Text>
                    <Text className="text-xl">Your holiday</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Discover")}
                    className="w-11/12 flex items-center justify-center mb-4"
                    >
                    <Animatable.View
                        animation={"pulse"}
                        easing="ease-in-out"
                        iterationCount={"infinite"}
                        className="w-full h-16 rounded-full"
                    >
                        <LinearGradient 
                            colors={["#80BEED", "#336699"]}
                            start={[0, 0]}
                            end={[1, 1]}
                            location={[0.25, 0.4, 1]}
                            className="w-full h-16 items-center justify-center rounded-full"
                        >
                            <Text className="text-gray-50 text-xl bg-gradient-to-tr from-[#5CA7F1] from-10% to-[#336699] to-90%">Get Started</Text>
                        </LinearGradient>
                    </Animatable.View>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    );
};

export default HomeScreen;