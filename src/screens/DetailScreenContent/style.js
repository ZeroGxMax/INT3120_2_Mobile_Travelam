import { StyleSheet, Dimensions } from "react-native-web";
import { colors } from "../../assets/colors/colors";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    backgroundImage: {
        justifyContent: 'space-between',
        height: 450,
    },
    descriptionWrapper: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: -20,
        borderRadius: 25,
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },
    titlesWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
    },
    itemTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 32,
        color: colors.white,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: colors.white,
    },
    heartWrapper: {
        position: 'absolute',
        right: 40,
        top: -30,
        width: 64,
        height: 64,
        backgroundColor: colors.white,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    descriptionTextWrapper: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    descriptionTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.black,
    },
    descriptionText: {
        marginTop: 20,
        // fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.darkGray,
        minHeight: 130,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    infoItem: {},
    infoTitle: {
        // fontFamily: 'Lato-Bold',
        fontSize: 12,
        color: colors.gray,
    },
    infoTextWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    infoText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 24,
        color: colors.green,
    },
    infoSubText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 14,
        color: colors.gray,
    },
    buttonWrapper: {
        marginHorizontal: 20,
        marginTop: 15,
        backgroundColor: colors.green,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
    },
    buttonText: {
        // fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: colors.white,
    },
});