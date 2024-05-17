import { View, Text, FlatList, ImageBackground, Animated, Dimensions, Image, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../PackageScreenContent/style';
import { getAllTransportation } from '../../services/firebase/transportation';
import PackageCard from '../PackageScreenContent/PackageCard';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../assets/colors/colors';
import LoadingView from '../../components/utils/LoadingView';

const TransportationScreen = () => {
    const navigation = useNavigation();

    const { width, height } = Dimensions.get("screen");
    const [transportation, setTransportation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch transportation data by country id
        const fetchTransportationData = async () => {
            try {
                const transportationData = await getAllTransportation();
                setTransportation(transportationData);
                setLoading(false);
                // console.log(transportation.data[1].demoImage)
            } catch (error) {
                console.error('Error fetching transportation:', error);
                setLoading(false);
            }
        };

        fetchTransportationData();
    }, []);

    const handlePress = (item) => {
        navigation.navigate('Detail', {
            item: item,
        })
    };

    if (loading) {
        return <LoadingView />;
    }

    return (
        <View>
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={transportation}
                renderItem={({ item, index }) => {
                    if (index == 0) { 
                        return (
                            <View style={{ width: width, height: 250 }}>
                                <ImageBackground
                                    source={{ uri: transportation[9].demoImage }}
                                    style={styles.backgroundImage}
                                >
                                    <TouchableOpacity
                                        style={styles.backIcon}
                                        onPress={() => navigation.goBack()}>
                                        <Entypo name="chevron-left" size={32} color={colors.white} />
                                    </TouchableOpacity>
                                    <View style={styles.textView}>
                                        <Text style={styles.title}>
                                            Transportation
                                        </Text>
                                    </View>
                                </ImageBackground>

                            </View>
                        );
                    } else { // Render other items using PackageCard component
                        return (
                            <PackageCard
                                title={item.type}
                                image={item.demoImage}
                                description={item.additionInfo}
                                onPress={() => handlePress(item)}
                            />
                        );
                    }
                }}
                keyExtractor={(item, index) => index.toString()} // Key extractor to avoid key warning
            />
        </View>
    );
}

export default TransportationScreen