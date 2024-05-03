import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { HStack, Center, NativeBaseProvider, VStack } from 'native-base'
import HalfRcmContainer from './HalfRcmContainer'

const RcmStackContainer = ({ mockTourData, name }) => {
    return (
        <NativeBaseProvider>
            <VStack space={2} justifyContent="center"  style={styles.vstack}>
                <View>
                    <Text className="text-2xl px-8" style={styles.text}>{name}</Text>
                </View>
                <HStack space={2} justifyContent="center"  style={styles.stack}>
                    <HalfRcmContainer name='Paris' imageSrc='https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg' description='Good'/>
                    <HalfRcmContainer name='Paris' imageSrc='https://res.klook.com/image/upload/Mobile/City/swox6wjsl5ndvkv5jvum.jpg' description='Good'/>
                </HStack>
            </VStack>
        </NativeBaseProvider>
    )
}

export default RcmStackContainer;


const styles = StyleSheet.create({
    stack: {
//        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        padding: 5
    },
    vstack: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    text: {
        marginTop: 10,
//        marginBottom: 10,
        fontWeight: 400
    }
});