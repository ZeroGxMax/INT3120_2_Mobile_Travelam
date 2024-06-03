import { StyleSheet, Platform } from "react-native";
import { colors } from "../../assets/colors/colors";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    backgroundImage: {
        height: 450,
        justifyContent: 'space-between',
    },
    contentWrapper: {
        marginHorizontal: 20,
        marginBottom: 40,
        position: "relative"
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    backIcon: {
        marginLeft: 20,
        marginTop: 30,
    },
    commentIcon: {
        marginRight: 20,
        marginTop: 30,
    },
    itemTitle: {
        fontSize: 32,
        color: colors.white,
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        fontSize: 16,
        color: colors.white,
    },
    descriptionWrapper: {
        flex: 1,
        marginTop: -20,
        borderRadius: 25,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {

        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: colors.text,
        lineHeight: 22,
    },
    infoSection: {
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 15,
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subText: {
        fontSize: 24,
        color: colors.primary,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    buttonText: {
        fontSize: 18,
        color: colors.white,
    },
    heartWrapper: {
        position: 'absolute',
        right: 20,
        top: 15,
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
        zIndex: 10,
    },
    line: {
        height: 20,
        width: 1,
        backgroundColor: 'black',
        marginTop: 5,
        marginBottom: 5
        
    },
});