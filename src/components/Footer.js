import { Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { Box, NativeBaseProvider, Center, Pressable, HStack, Icon} from 'native-base'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


const Footer = () => {
    const [selected, setSelected] = useState(1);
    return (
        <NativeBaseProvider>
            <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center" style={styles.wrapper}>

                <HStack bg="#00FF9C" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.7} py="3" flex={1} onPress={() => setSelected(0)}>
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="lg" />
                            <Text color="white" fontSize="12">
                                Home
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.7} py="2" flex={1} onPress={() => setSelected(1)}>
                        <Center>
                            <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="lg" />
                            <Text color="white" fontSize="12">
                                Search
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.7} py="2" flex={1} onPress={() => setSelected(2)}>
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="lg" />
                            <Text color="white" fontSize="12">
                                Cart
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.7} py="2" flex={1} onPress={() => setSelected(3)}>
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="lg" />
                            <Text color="white" fontSize="12">
                                Account
                            </Text>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    }
})

export default Footer;