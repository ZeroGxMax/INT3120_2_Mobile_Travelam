import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './style'; 
import { colors } from '../../assets/colors/colors';

const ListCategories = () => {
    const categoryIcons = [
        <Icon name="flight" size={25} color={colors.primary} />,
        <Icon name="beach-access" size={25} color={colors.primary} />,
        <Icon name="near-me" size={25} color={colors.primary} />,
        <Icon name="place" size={25} color={colors.primary} />,
    ];

    return (
        <View style={styles.categoryContainer}>
            {categoryIcons.map((icon, index) => (
                <View key={index} style={styles.iconContainer}>
                    {icon}
                </View>
            ))}
        </View>
    );
};

export default ListCategories;
