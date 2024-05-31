import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { colors } from '../../assets/colors/colors';
import { icons } from '../../assets/icons/icons';


const CardItem = ({ card, isSelected, onPress }) => {
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
                borderColor: isSelected ? colors.primary : colors.lightGray,
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
                    borderWidth: 2,
                    borderRadius: radius,
                    borderColor: colors.lightGray,
                }}
            >
                <Image
                    source={icons.mastercard}
                    resizeMode="center"
                    style={{
                        width: 35,
                        height: 35,
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
                {card.cardHolder}
            </Text>

            <Image
                source={isSelected ? icons.selected : icons.unselected}
                style={{
                    width: 25,
                    height: 25,
                }}
            />
        </TouchableOpacity>
    );
};
export default CardItem;