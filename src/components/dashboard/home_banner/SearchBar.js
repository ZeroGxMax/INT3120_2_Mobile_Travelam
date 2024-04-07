import React from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
    const handleSearchPress = () => {
        // Handle search press action
        // For navigation, you can use React Navigation or any other navigation library
    };

    return (
        <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="black" onPress={handleSearchPress} />
            <TextInput
                placeholder="Where do you want to go?"
                style={styles.searchInput}
                onPress={handleSearchPress}
            />
        </View>
    );
}

const styles = {
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1, // Example border for demonstration, you can customize it further
        borderColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
    },
};
