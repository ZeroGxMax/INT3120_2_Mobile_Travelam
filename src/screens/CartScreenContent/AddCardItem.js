import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons/icons';


const AddCardItem = ({ onPress }) => {
    const radius = 10;
    const padding = 5;

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
                paddingHorizontal: padding,
                borderWidth: 1,
                borderColor: colors.lightGray,
                flex: 1,
                padding: 15,
                backgroundColor: "white"
            }}
            onPress={onPress}
        >
            {/* Card Image */}
            <View
                style={{
                    width: 60,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: colors.lightGray,
                }}
            >
                <Image
                    source={icons.addCard}

                    resizeMode="contain"
                    style={{
                        width: 60,
                        height: 45,
                    }}
                />
            </View>
            <Text
                style={{
                    flex: 1,
                    marginLeft: radius,
                    fontSize: 20,
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                }}
            >
                Add New Card
            </Text>

            <Image
                source={icons.next}
                style={{
                    width: 25,
                    height: 25,
                }}
            />
        </TouchableOpacity>
    );
};
export default AddCardItem;