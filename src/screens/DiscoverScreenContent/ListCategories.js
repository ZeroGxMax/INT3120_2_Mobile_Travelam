import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style'; 
import { colors } from '../../assets/colors/colors';

const ListCategories = () => {
    const navigation = useNavigation();

    const handlePress = (category) => {
        switch (category) {
            case 'transportation':
                navigation.navigate('Transportation');
                break;
            case 'restaurant':
                navigation.navigate('Restaurant'); 
                break;
            case 'activity':
                navigation.navigate('Activity'); 
                break;
            case 'accommodation':
                navigation.navigate('Accommodation');
                break;
            default:
                break;
        }
    };

    const categoryIcons = [
        { name: "emoji-transportation", category: "transportation" },
        { name: "local-restaurant", category: "restaurant" },
        { name: "attractions", category: "activity" },
        { name: "hotel", category: "accommodation" },
    ];

    return (
        <View style={styles.categoryContainer}>
            {categoryIcons.map((icon, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(icon.category)}>
                    <View style={styles.iconContainer}>
                        <MaterialIcon name={icon.name} size={25} color={colors.primary} />
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default ListCategories;
