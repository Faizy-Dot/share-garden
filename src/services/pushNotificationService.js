import messaging from '@react-native-firebase/messaging';
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import { NavigationService } from '../config/NavigationService';

class PushNotificationService {
    constructor() {
        this.initialized = false;
        this.foregroundUnsubscribe = null;
        this.backgroundUnsubscribe = null;
    }

    async checkPermissions() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            return granted;
        } else if (Platform.OS === 'ios') {
            const authStatus = await messaging().hasPermission();
            return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        }
        return true;
    }

    async requestPermissions() {
        // First check if permissions are already granted
        const alreadyGranted = await this.checkPermissions();
        if (alreadyGranted) {
            console.log('Notification permissions already granted');
            return true;
        }

        if (Platform.OS === 'android') {
            // Request notification permission for Android 13+
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                {
                    title: 'Notification Permission',
                    message: 'This app needs notification permission to send you updates about your products and bids.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Android notification permission denied');
                return false;
            }
            
            console.log('Android notification permission granted');
            return true;
        } else if (Platform.OS === 'ios') {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (!enabled) {
                console.log('iOS notification permission denied');
                return false;
            }
            
            console.log('iOS notification permission granted');
            return true;
        }
        
        return true;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            // Request notification permissions
            const permissionGranted = await this.requestPermissions();
            if (!permissionGranted) {
                console.log('Notification permissions not granted');
                return false;
            }

            // Get FCM token
            const token = await messaging().getToken();
            console.log('FCM Token:', token);

            // Set up foreground message handler
            this.foregroundUnsubscribe = messaging().onMessage(async remoteMessage => {
                console.log('Received foreground message:', remoteMessage);
                this.handleForegroundMessage(remoteMessage);
            });

            // Set up background message handler
            this.backgroundUnsubscribe = messaging().setBackgroundMessageHandler(async remoteMessage => {
                console.log('Received background message:', remoteMessage);
                this.handleBackgroundMessage(remoteMessage);
            });

            // Handle notification tap when app is in background/quit state
            messaging().onNotificationOpenedApp(remoteMessage => {
                console.log('Notification opened app:', remoteMessage);
                this.handleNotificationTap(remoteMessage);
            });

            // Handle notification tap when app is in quit state
            messaging()
                .getInitialNotification()
                .then(remoteMessage => {
                    if (remoteMessage) {
                        console.log('Notification opened app from quit state:', remoteMessage);
                        // Add longer delay for app startup
                        setTimeout(() => {
                            this.handleNotificationTap(remoteMessage);
                        }, 2000);
                    }
                });

            this.initialized = true;
            return token;
        } catch (error) {
            console.error('Error initializing push notifications:', error);
            return null;
        }
    }

    handleForegroundMessage(remoteMessage) {
        const { notification, data } = remoteMessage;
        
        if (data?.type === 'SGTIP_LIKED' || data?.type === 'SGTIP_SHARED') {
            // Show in-app notification for SGTip interactions
            Alert.alert(
                notification?.title || 'SGTip Update',
                notification?.body || 'Someone interacted with your SGTip',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        } else if (data?.type === 'PRODUCT_LIKED') {
            // Show in-app notification for product likes
            Alert.alert(
                notification?.title || 'Product Update',
                notification?.body || 'Someone liked your product',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        } else if (data?.type === 'NEW_BID') {
            // Show in-app notification for new bids
            Alert.alert(
                notification?.title || 'New Bid',
                notification?.body || 'You received a new bid',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        } else if (data?.type === 'BID_ACCEPTED') {
            // Show in-app notification for bid acceptance
            Alert.alert(
                notification?.title || 'Bid Accepted',
                notification?.body || 'Your bid was accepted',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        } else if (data?.type === 'BID_REJECTED') {
            // Show in-app notification for bid rejection
            Alert.alert(
                notification?.title || 'Bid Update',
                notification?.body || 'Your bid was not accepted',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        } else if (data?.type === 'TRADE_COMPLETED') {
            // Show in-app notification for trade completion
            Alert.alert(
                notification?.title || 'Trade Completed',
                notification?.body || 'Your trade has been completed',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        } else {
            // Show generic notification for other types
            Alert.alert(
                notification?.title || 'Notification',
                notification?.body || 'You have a new notification',
                [
                    {
                        text: 'View',
                        onPress: () => this.handleNotificationTap(remoteMessage)
                    },
                    {
                        text: 'Dismiss',
                        style: 'cancel'
                    }
                ]
            );
        }
    }

    handleBackgroundMessage(remoteMessage) {
        // Handle background message processing
        console.log('Processing background message:', remoteMessage);
    }

    handleNotificationTap(remoteMessage) {
        const { data } = remoteMessage;
        console.log('Handling notification tap:', data);
        
        // Add a small delay to ensure app is fully loaded
        setTimeout(() => {
            try {
                if (data?.type === 'SGTIP_LIKED' || data?.type === 'SGTIP_SHARED') {
                    // Navigate to SGTip detail screen
                    if (data.sgTipId) {
                        console.log('Navigate to SGTip:', data.sgTipId);
                        NavigationService.navigate('TipsDetail', { id: data.sgTipId });
                    }
                } else if (data?.type === 'PRODUCT_LIKED') {
                    // Navigate to product detail screen
                    if (data.productId) {
                        console.log('Navigate to Product:', data.productId);
                        NavigationService.navigate('ProductDetail', { productId: data.productId });
                    }
                } else if (data?.type === 'NEW_BID' || data?.type === 'BID_ACCEPTED' || data?.type === 'BID_REJECTED') {
                    // Navigate to product detail screen for bid-related notifications
                    if (data.productId) {
                        console.log('Navigate to Product for bid:', data.productId);
                        NavigationService.navigate('ProductDetail', { productId: data.productId });
                    }
                } else if (data?.type === 'TRADE_COMPLETED') {
                    // Navigate to My SG Items screen for completed trades so seller can review buyer
                    console.log('Navigate to My SG Items for completed trade');
                    NavigationService.navigate('MySGItems');
                } else {
                    // Navigate to notifications screen for other types
                    console.log('Navigate to Notifications');
                    NavigationService.navigate('SgUserNotification');
                }
            } catch (error) {
                console.error('Error handling notification tap:', error);
                // Fallback: navigate to main screen
                NavigationService.navigate('SgTabs');
            }
        }, 1000); // 1 second delay
    }

    // Get FCM token
    async getToken() {
        try {
            return await messaging().getToken();
        } catch (error) {
            console.error('Error getting FCM token:', error);
            return null;
        }
    }

    // Manual permission request (can be called from UI)
    async requestNotificationPermission() {
        try {
            const granted = await this.requestPermissions();
            if (granted) {
                // Re-initialize to get token and set up handlers
                await this.initialize();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    // Check if notifications are enabled
    async areNotificationsEnabled() {
        try {
            return await this.checkPermissions();
        } catch (error) {
            console.error('Error checking notification permissions:', error);
            return false;
        }
    }

    // Subscribe to topic
    async subscribeToTopic(topic) {
        try {
            await messaging().subscribeToTopic(topic);
            console.log(`Subscribed to topic: ${topic}`);
        } catch (error) {
            console.error(`Error subscribing to topic ${topic}:`, error);
        }
    }

    // Unsubscribe from topic
    async unsubscribeFromTopic(topic) {
        try {
            await messaging().unsubscribeFromTopic(topic);
            console.log(`Unsubscribed from topic: ${topic}`);
        } catch (error) {
            console.error(`Error unsubscribing from topic ${topic}:`, error);
        }
    }

    // Cleanup
    cleanup() {
        if (this.foregroundUnsubscribe) {
            this.foregroundUnsubscribe();
        }
        if (this.backgroundUnsubscribe) {
            this.backgroundUnsubscribe();
        }
        this.initialized = false;
    }
}

// Create a singleton instance
const pushNotificationService = new PushNotificationService();

export default pushNotificationService;
