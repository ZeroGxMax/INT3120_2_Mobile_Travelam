import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { getUserNotification, markReadNotifications } from '../services/firebase/notification';
import { auth } from '../services/firebaseService';
import LoadingView from '../components/utils/LoadingView';
import NotificationPanel from './NotificationScreenContent/NotificationPanel';
import { colors } from '../assets/colors/colors';
import { formatDateTime } from '../utils/dateUtils';
import CustomHeader from '../components/utils/Header';

const NotificationsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const sortNotificationsByDate = (notifications) => {
        return notifications.sort((a, b) => new Date(a.notification_date) - new Date(b.notification_date));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchNotifications = await getUserNotification(auth.currentUser.uid);
                const sortedNotifications = sortNotificationsByDate(fetchNotifications);
                setNotifications(sortedNotifications);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNotificationPress = async (notification) => {
        setSelectedNotification(notification);
        await markReadNotifications(notification.id)

        setNotifications((prevNotifications) =>
            prevNotifications.map((notif) =>
                notif.id == notification.id ? { ...notif, read: true } : notif
            )
        );
    };

    if (loading) {
        return <LoadingView />;
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.notificationItem} onPress={() => handleNotificationPress(item)}>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                {!item.read && <Text style={{color: "red"}}>*New</Text>}
                {item.read && <Text style={{color: colors.darkGray}}>*Seen</Text>}
            </View>
            <Text>{formatDateTime(item.notification_date)}</Text>
            <Text style={styles.notificationBody}>{item.body}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* <CustomHeader></CustomHeader> */}
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
