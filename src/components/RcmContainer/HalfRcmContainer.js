import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { Card, Button, Icon, Divider } from '@rneui/themed';
import React from 'react';
import { Box, AspectRatio, NativeBaseProvider, Center, Stack, Heading, HStack } from 'native-base'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const HalfRcmContainer = ({ imageSrc, name, description }) => {
    const navigation = useNavigation();

    return (
        <NativeBaseProvider>
            <Box alignItems="center">
                <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700"
                }}
                _web={{
                    shadow: 2,
                    borderWidth: 0
                }}
                _light={{
                  backgroundColor: "gray.50"
                }}>
                    <Box>
                        <AspectRatio w="100%" ratio={12 / 9}>
                            <Image source={{
                                uri: imageSrc
                            }} alt="image" />
                        </AspectRatio>
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={1}>
                            <Heading size="md" ml="-1">
                              The Garden City
                            </Heading>
                        </Stack>
                        <Text fontWeight="400" style={{
                            fontSize: 10
                        }}>
                            Bengaluru (also called Bangalore) is the center of India's high-tech
                            industry. The city is also known for its parks and nightlife.
                        </Text>

                        <Button
                            icon={
                                <Icon
                                    name="menu"
                                    color="#ffffff"
                                    iconStyle={{ marginRight: 10 }}
                                />
                            }
                            buttonStyle={styles.button}
                            title="Book now"
                        />
                    </Stack>
                </Box>
            </Box>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        width: 150,
        fontSize: 10,
        backgroundColor: '#00FF9C'
    },
    text: {
        marginBottom: 20,
        marginTop: 15,
        fontWeight: 'bold',
    }
})

export default HalfRcmContainer;