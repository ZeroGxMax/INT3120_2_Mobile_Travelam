import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../assets/colors/colors';

const LoadingView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.green} />
        </View>
    );
};

export default LoadingView;