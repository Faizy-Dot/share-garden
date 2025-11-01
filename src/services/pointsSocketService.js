import io from 'socket.io-client';
import { BASE_URL } from '../config/constants';
import store from '../redux/store';
import { updateUserPoints } from '../redux/Actions/authActions/loginAction';

class PointsSocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.userId = null;
    }

    connect(userId) {
        // If already connected with the same user, don't reconnect
        if (this.socket && this.isConnected && this.userId === userId) {
            console.log('Points Socket already connected for user:', userId);
            return;
        }

        // Disconnect existing connection if userId changed
        if (this.socket && this.userId !== userId) {
            this.disconnect();
        }

        this.userId = userId;

        // Create new socket connection
        this.socket = io(BASE_URL, {
            transports: ['websocket'],
            path: '/socket.io',
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            query: { userId }
        });

        // Set up event listeners immediately (they'll work once connected)
        this.setupEventListeners();

        this.socket.on('connect', () => {
            console.log('✅ Points Socket connected successfully for user:', userId);
            this.isConnected = true;
            // Join personal room for points notifications
            this.socket.emit('join', userId);
            console.log('✅ Joined personal room for user:', userId);
        });

        this.socket.on('connect_error', (error) => {
            console.error('❌ Points Socket connection error:', error);
            this.isConnected = false;
        });

        this.socket.on('disconnect', (reason) => {
            console.log('⚠️ Points Socket disconnected:', reason);
            this.isConnected = false;
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log('🔄 Points Socket reconnected after', attemptNumber, 'attempts');
            this.isConnected = true;
            // Rejoin personal room after reconnect
            this.socket.emit('join', userId);
        });
    }

    setupEventListeners() {
        if (!this.socket) {
            console.error('Cannot setup listeners: socket is null');
            return;
        }

        // Remove existing listener to prevent duplicates
        this.socket.off('points_earned');

        // Listen for points earned notifications (centralized)
        this.socket.on('points_earned', (data) => {
            console.log('💰 Points earned notification received:', data);
            
            // Get current user from Redux
            const currentUser = store.getState()?.login?.user;
            
            console.log('Current logged-in user:', currentUser?.id);
            console.log('Points notification for user:', data.userId);
            
            // Only update if this points update is for the current logged-in user
            if (currentUser && currentUser.id === data.userId && data.updatedPoints !== undefined && data.updatedPoints !== null) {
                // Update Redux with new points
                store.dispatch(updateUserPoints(data.updatedPoints));
                const updatedUser = store.getState()?.login?.user;
                console.log(`✅ Updated points for user ${data.userId} from ${currentUser.sgPoints} to ${data.updatedPoints} via socket`);
                console.log('User points after update:', updatedUser?.sgPoints);
            } else {
                console.log('⚠️ Points notification ignored:', {
                    hasCurrentUser: !!currentUser,
                    userIdsMatch: currentUser?.id === data.userId,
                    hasUpdatedPoints: data.updatedPoints !== undefined && data.updatedPoints !== null
                });
            }
        });
    }

    // Disconnect socket
    disconnect() {
        if (this.socket) {
            this.socket.off('points_earned'); // Remove listeners
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
            this.userId = null;
            console.log('Points Socket disconnected and cleaned up');
        }
    }

    // Get connection status
    getConnectionStatus() {
        return this.isConnected;
    }
}

// Create a singleton instance
const pointsSocketService = new PointsSocketService();

export default pointsSocketService;

