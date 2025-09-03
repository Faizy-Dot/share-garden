import io from 'socket.io-client';
import { BASE_URL } from '../config/constants';

class SGTipSocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
        this.listeners = new Map();
    }

    connect(userId) {
        if (this.socket && this.isConnected) {
            return;
        }

        this.socket = io(BASE_URL, {
            transports: ['websocket'],
            path: '/socket.io',
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            query: { userId }
        });

        this.socket.on('connect', () => {
            console.log('SGTip Socket connected successfully');
            this.isConnected = true;
            // Join personal room for notifications
            this.socket.emit('join', userId);
        });

        this.socket.on('connect_error', (error) => {
            console.error('SGTip Socket connection error:', error);
            this.isConnected = false;
        });

        this.socket.on('disconnect', (reason) => {
            console.log('SGTip Socket disconnected:', reason);
            this.isConnected = false;
        });

        // Set up event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Listen for SGTip liked notifications
        this.socket.on('sgtip_liked', (data) => {
            console.log('SGTip liked notification:', data);
            this.emitToListeners('sgtip_liked', data);
        });

        // Listen for SGTip shared notifications
        this.socket.on('sgtip_shared', (data) => {
            console.log('SGTip shared notification:', data);
            this.emitToListeners('sgtip_shared', data);
        });

        // Listen for SGTip stats updates
        this.socket.on('sgtip_stats_update', (data) => {
            console.log('SGTip stats update:', data);
            this.emitToListeners('sgtip_stats_update', data);
        });
    }

    // Join a specific SGTip room for live updates
    joinSGTipRoom(sgTipId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('join_sgtip', sgTipId);
            console.log(`Joined SGTip room: ${sgTipId}`);
        }
    }

    // Leave a specific SGTip room
    leaveSGTipRoom(sgTipId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('leave_sgtip', sgTipId);
            console.log(`Left SGTip room: ${sgTipId}`);
        }
    }

    // Add event listener
    addEventListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    // Remove event listener
    removeEventListener(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    // Emit to all listeners for an event
    emitToListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }

    // Disconnect socket
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
            this.listeners.clear();
        }
    }

    // Get connection status
    getConnectionStatus() {
        return this.isConnected;
    }
}

// Create a singleton instance
const sgtipSocketService = new SGTipSocketService();

export default sgtipSocketService;
