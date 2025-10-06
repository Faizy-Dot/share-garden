import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../components/navBar/NavBar';
import { Images } from '../../config';
import axiosInstance from '../../config/axios';

export default function SgUserNotification() {
    const navigation = useNavigation();
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
        // For product-related notifications
        if (notification.product?.images) {
            return { uri: notification.product.images.split(',')[0] };
        }
        
        // For SGTip-related notifications
        if (notification.sgTip?.images) {
            return { uri: notification.sgTip.images.split(',')[0] };
        }
        
        // Fallback based on notification type
        switch (notification.type) {
            case 'PRODUCT_LIKED':
            case 'TRADE_COMPLETED':
            case 'TRADE_CREATED':
                return Images.bidsIcon;
            case 'BID_ACCEPTED':
                return Images.bidsIcon;
            case 'BID_REJECTED':
                return Images.redBidsIcon;
            case 'SGTIP_LIKED':
            case 'SGTIP_SHARED':
                return Images.notificationScreenImg; // Default SGTip icon
            case 'CHAT':
                return Images.notificationScreenImg;
            default:
                return Images.notificationScreenImg;
        }
    };

    // Handle notification tap navigation
    const handleNotificationPress = (notification) => {
        try {
            if (notification.product?.id) {
                // Navigate to Items tab and then to ProductDetail
                // Pass the full product object if available, otherwise just the id
                const productParams = notification.product.title ? 
                    { item: notification.product } : 
                    { id: notification.product.id };
                
                navigation.navigate('Items', {
                    screen: 'ProductDetail',
                    params: productParams
                });
            } else if (notification.sgTip?.id) {
                // Navigate to Tips tab and then to TipsDetail
                navigation.navigate('Tips', {
                    screen: 'TipsDetail',
                    params: { id: notification.sgTip.id }
                });
            } else if (notification.bid?.id) {
                // Navigate to Items tab and then to ProductDetail for bid-related notifications
                navigation.navigate('Items', {
                    screen: 'ProductDetail',
                    params: { id: notification.productId }
                });
            } else {
                // Navigate to notifications screen for other types
                console.log('No specific navigation for notification type:', notification.type);
            }
        } catch (error) {
            console.error('Error navigating from notification:', error);
        }
    };

    const renderNotification = ({ item }) => {
        // Get the appropriate title based on notification type
        const getNotificationTitle = (notification) => {
            if (notification.product?.title) {
                return notification.product.title;
            }
            if (notification.sgTip?.title) {
                return notification.sgTip.title;
            }
            return 'Notification';
        };

        return (
            <TouchableOpacity 
                style={styles.flatlistContainer}
                onPress={() => handleNotificationPress(item)}
                activeOpacity={0.7}
            >
                <View style={styles.imageContainer}>
                    <Image 
                        source={getNotificationImage(item)} 
                        style={styles.notificationImage}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        {getNotificationTitle(item)}
                    </Text>
                    <Text style={[
                        styles.description, 
                        item.type === 'BID_REJECTED' && { color: "#FE130B" }
                    ]}>
                        {item.message}
                    </Text>
                </View>
            </TouchableOpacity>
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
