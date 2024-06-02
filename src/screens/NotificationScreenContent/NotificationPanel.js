import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colors } from '../../assets/colors/colors';

const NotificationPanel = ({ notification, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.notificationPanel}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationBody}>{notification.body}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    notificationPanel: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        elevation: 5,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.black,
    },
    notificationBody: {
        fontSize: 16,
        color: colors.darkGray,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 16,
        color: colors.primary,
    },
});

export default NotificationPanel;