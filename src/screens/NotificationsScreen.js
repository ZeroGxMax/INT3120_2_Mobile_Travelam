import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { getUserNotification } from '../services/firebase/notification';
import { auth } from '../services/firebaseService';
import LoadingView from '../components/utils/LoadingView';
import NotificationPanel from './NotificationScreenContent/NotificationPanel';
import { colors } from '../assets/colors/colors';

const NotificationsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedNotification, setSelectedNotification] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchNotifications = await getUserNotification(auth.currentUser.uid);
                setNotifications(fetchNotifications)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNotificationPress = (notification) => {
        setSelectedNotification(notification);
    };

    if (loading) {
        return <LoadingView />;
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item)}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationBody}>{item.body}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.notificationList}
            />
            {selectedNotification && (
                <NotificationPanel
                    notification={selectedNotification}
                    onClose={() => setSelectedNotification(null)}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.lightGray,
        padding: 20,
    },
    notificationList: {
        paddingTop: 10,
    },
    notificationItem: {
        backgroundColor: colors.white,
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
    },
    notificationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.primary,
    },
    notificationBody: {
        fontSize: 16,
        color: colors.darkGray,
    },
});

export default NotificationsScreen;
