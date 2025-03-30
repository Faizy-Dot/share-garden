import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../components/navBar/NavBar';
import { Images } from '../../config';
import axiosInstance from '../../config/axios';

export default function SgUserNotification() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/notifications');
            setNotifications(response.data);
            console.log('Notifications response:', response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    // Get appropriate image based on notification type
    const getNotificationImage = (notification) => {
        switch (notification.type) {
            case 'TRADE_COMPLETED':
            case 'TRADE_CREATED':
                return notification.product?.images ? 
                    { uri: notification.product.images.split(',')[0] } : 
                    Images.bidsIcon;
            case 'BID_ACCEPTED':
                return Images.bidsIcon;
            case 'BID_REJECTED':
                return Images.redBidsIcon;
            case 'CHAT':
                return Images.notificationScreenImg;
            default:
                return Images.notificationScreenImg;
        }
    };

    const renderNotification = ({ item }) => {
        return (
            <View style={styles.flatlistContainer}>
                <View style={styles.imageContainer}>
                    <Image source={getNotificationImage(item)} />
                </View>
                <View>
                    <Text style={styles.title}>
                        {item.product?.title || 'Notification'}
                    </Text>
                    <Text style={[
                        styles.description, 
                        item.type === 'BID_REJECTED' && { color: "#FE130B" }
                    ]}>
                        {item.message}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.notificationContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"Notifications"} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : error ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>
                            No notifications found
                        </Text>
                    }
                />
            )}
        </View>
    );
}
