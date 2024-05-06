import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import RcmCard from './rcm_card'

const RcmCardContainer = ({ mockTourData, name }) => {

    
    return (
        <View style={styles.rcmBlock}>
            <View>
                <Text className="text-2xl px-8" style={styles.text}>{name}</Text>
            </View>
            <ScrollView horizontal={true}>
                <View style={styles.cardContainer}>
                    {mockTourData.map((tour) => (
                        <View key={tour.id} style={styles.cardWrapper}>
                            <RcmCard id={tour.id} name={tour.title} src={tour.demoImage} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default RcmCardContainer;


const styles = StyleSheet.create({
    rcmBlock: {
        backgroundColor: '#FFFFFF',
//        paddingVertical: 5,
        height: 270,
        marginTop: 10,
        paddingBottom: 10,
    },
    rcmTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    cardContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    cardWrapper: {
//        flex: 2,
        marginRight: 20,
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 400
    }

});