import messaging from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';

class PushNotificationService {
    constructor() {
        this.initialized = false;
        this.foregroundUnsubscribe = null;
        this.backgroundUnsubscribe = null;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            // Request permission for iOS
            if (Platform.OS === 'ios') {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (!enabled) {
                    console.log('Notification permission denied');
                    return false;
                }
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
                        this.handleNotificationTap(remoteMessage);
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
        }
    }

    handleBackgroundMessage(remoteMessage) {
        // Handle background message processing
        console.log('Processing background message:', remoteMessage);
    }

    handleNotificationTap(remoteMessage) {
        const { data } = remoteMessage;
        
        if (data?.type === 'SGTIP_LIKED' || data?.type === 'SGTIP_SHARED') {
            // Navigate to SGTip detail screen
            if (data.sgTipId) {
                // You can use navigation service or Redux to handle navigation
                // For now, we'll just log the action
                console.log('Navigate to SGTip:', data.sgTipId);
                
                // Example navigation (you'll need to implement this based on your navigation setup)
                // NavigationService.navigate('TipsDetail', { id: data.sgTipId });
            }
        }
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
