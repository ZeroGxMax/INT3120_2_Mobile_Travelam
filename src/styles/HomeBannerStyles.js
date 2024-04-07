import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingContainer: {
        marginTop: 20, // Adjust margin as per your requirement
        alignItems: 'center',
    },
    headingText: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    hassleFreeText: {
        fontSize: 30,
        fontWeight: '700',
        color: '#98ff53',
    },
    homeWrapper: {
        width: '100%',
        backgroundColor: '#ffffff',
    },
    homeBannerWrapper: {
        position: 'relative',
        width: '100%',
        height: 560,
    },
    bannerWrapper: {
        width: '100%',
        height: 560,
        overflow: 'hidden',
    },
    searchBar: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        width: '40%',
        marginTop: '2.5%',
    },
    searchIcon: {
        borderStyle: 'solid',
        borderColor: 'greenyellow',
        borderWidth: 'thick 0px thick thick',
    },
    searchField: {
        borderStyle: 'solid',
        borderColor: 'greenyellow',
        borderWidth: 'thick thick thick 0px',
    },
    blackComponent: {
        width: '100%',
        height: 250,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        top: 'calc(100% - 250px)',
        overflow: 'hidden',
        left: 0,
        zIndex: 2,
        transform: [{ rotate: '180deg' }],
    },
    homeBanner: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        filter: [{ brightness: 0.4 }],
    },
    bannerInfo: {
        textAlign: 'left',
        paddingHorizontal: 75,
        position: 'relative',
        width: '100%',
        transform: [{ translateY: -150 }],
        color: 'white',
        zIndex: 50,
        height: 100,
        overflow: 'hidden',
    },
    bannerHeader: {
        fontSize: 36,
    },
    bannerDesc: {
        width: '100%',
        overflow: 'hidden',
        overflowWrap: 'break-word',
        fontSize: 16,
        zIndex: 60,
    },
    heading: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        fontSize: 48,
        whiteSpace: 'nowrap',
    },
    hassleFree: {
        fontFamily: 'serif',
        fontStyle: 'normal',
        color: '#98ff53',
        whiteSpace: 'normal',
        fontSize: 56,
    },
    // Media Queries
    '@media (max-width: 576px)': {
        heading: {
            fontSize: 30,
            left: 'calc(50% - 240px)',
        },
        hassleFree: {
            fontSize: 42,
        },
        searchBar: {
            width: '80%',
        },
    },
    '@media (min-width: 576px) and (max-width: 768px)': {
        heading: {
            fontSize: 40,
            left: 'calc(50% - 255px)',
        },
        hassleFree: {
            fontSize: 46,
        },
        searchBar: {
            width: '60%',
        },
    },
    '@media (min-width: 768px) and (max-width: 992px)': {
        heading: {
            fontSize: 50,
            left: 'calc(50% - 320px)',
        },
        hassleFree: {
            fontSize: 56,
        },
        searchBar: {
            width: '50%',
        },
    },
    '@media (min-width: 992px) and (max-width: 1200px)': {
        heading: {
            fontSize: 60,
            left: 'calc(50% - 380px)',
        },
        hassleFree: {
            fontSize: 64,
        },
    },
    '@media (min-width: 1200px)': {
        heading: {
            fontSize: 60,
            left: 'calc(50% - 400px)',
        },
        hassleFree: {
            fontSize: 70,
        },
    },
});

export default styles;
