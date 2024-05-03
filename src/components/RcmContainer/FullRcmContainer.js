import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { Card, Button, Icon, Divider } from '@rneui/themed';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const FullRcmContainer = ({ imageSrc, name, description }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.fullContainerWrapper}>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />
                <Card.Image
                    style={{
                        padding: 0,
                        borderRadius: 10,
                        height: 200,
                        boxShadow: '5px 10px #000000'

                    }}
                    source={{
                        uri: imageSrc,
                    }}
                />
                <Text style={styles.text}>
                    {description}
                </Text>
                <View style={styles.vertical}>
                    <Button
                        icon={
                            <Icon
                                name="menu"
                                color="#ffffff"
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={styles.button}
                        title="Booking"
                    />
                    <Divider orientation="vertical" width={1} />
                    <Button
                        icon={
                            <Icon
                                name="search"
                                color="#ffffff"
                                iconStyle={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={styles.button}
                        title="More details"
                    />
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    fullContainerWrapper: {
//        flexDirection: 'row',
        width: '100%'
    },
    infoWrapper: {
        width: "50%",
        backgroundColor: '#00FF9C',
        textAlign: 'center',
        marginHorizontal: -5,
        //        paddingHorizontal: -10
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        borderRadius: 10,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        width: 150,
        backgroundColor: '#00FF9C'

    },
    text: {
        marginBottom: 20, 
        marginTop: 15,
        fontWeight: 'bold',
    }
})

export default FullRcmContainer;