# SGTip Real-Time Features - Frontend Implementation

## Overview
This implementation adds real-time notifications and live updates for SGTip likes and shares to the React Native app, allowing users to see who is interacting with their content in real-time without affecting the existing UI.

## Features Implemented

### 1. Real-Time Socket Communication
- **Socket.IO Integration**: Uses existing socket infrastructure from chat functionality
- **SGTip Rooms**: Users can join specific SGTip rooms for live updates
- **Personal Notifications**: Real-time notifications for SGTip interactions
- **Live Stats Updates**: Real-time updates of likes and shares counts

### 2. Push Notifications
- **Firebase Integration**: Uses existing Firebase messaging setup
- **SGTip Notifications**: Push notifications for likes and shares
- **In-App Notifications**: Toast messages for real-time interactions
- **Background Handling**: Proper handling of notifications when app is in background

### 3. UI Components (Non-Intrusive)
- **Real-Time Activity Overlay**: Subtle overlay showing recent activity
- **Like/Share Actions**: Clean action buttons integrated into existing layout
- **Activity Feed**: Real-time updates without disrupting current UI

## File Structure

```
src/
├── components/
│   ├── RealTimeActivity/
│   │   └── RealTimeActivity.jsx          # Real-time activity overlay
│   └── SGTipActions/
│       └── SGTipActions.jsx              # Like/Share action buttons
├── services/
│   ├── sgtipSocketService.js             # Socket.IO service for SGTip
│   ├── sgtipActivityService.js           # API service for SGTip activities
│   ├── pushNotificationService.js        # Push notification handling
│   └── shareService.js                   # Native sharing functionality
└── screens/
    └── sgTabs/
        └── tips/
            └── tipsDetail/
                └── TipsDetail.js         # Updated with real-time features
```

## Components

### 1. RealTimeActivity Component
**Location**: `src/components/RealTimeActivity/RealTimeActivity.jsx`

**Features**:
- Shows recent likes and shares as overlay notifications
- Auto-hides after 3 seconds
- Smooth fade in/out animations
- Non-intrusive design that doesn't affect existing UI

**Props**:
- `sgTipId`: ID of the SGTip
- `userId`: Current user ID
- `isAuthor`: Whether current user is the author
- `onActivityPress`: Callback for activity item press

### 2. SGTipActions Component
**Location**: `src/components/SGTipActions/SGTipActions.jsx`

**Features**:
- Like and Share buttons with real-time count updates
- Prevents users from liking their own SGTips
- Loading states during API calls
- Toast notifications for user feedback
- **Native Share Integration**: Uses device's native share dialog
- **Real Share Functionality**: Actually shares content, not just increments counter
- **Duplicate Share Prevention**: Prevents multiple API calls for the same user sharing the same SGTip
- **Share Status Tracking**: Shows "Shared" state when user has already shared the SGTip

**Props**:
- `sgTipId`: ID of the SGTip
- `userId`: Current user ID
- `authorId`: Author of the SGTip
- `initialStats`: Initial like/share counts
- `onStatsUpdate`: Callback for stats updates
- `sgTipData`: SGTip data for sharing (title, description, author, isLiked, isShared)

## Services

### 1. SGTip Socket Service
**Location**: `src/services/sgtipSocketService.js`

**Features**:
- Singleton pattern for socket management
- Event listeners for SGTip interactions
- Room management for specific SGTips
- Connection status monitoring

**Key Methods**:
- `connect(userId)`: Connect to socket with user ID
- `joinSGTipRoom(sgTipId)`: Join room for specific SGTip
- `leaveSGTipRoom(sgTipId)`: Leave room for specific SGTip
- `addEventListener(event, callback)`: Add event listener
- `removeEventListener(event, callback)`: Remove event listener

### 2. SGTip Activity Service
**Location**: `src/services/sgtipActivityService.js`

**Features**:
- API calls for SGTip activities
- Like and share functionality
- Activity feed fetching
- Stats retrieval

**Key Methods**:
- `getSGTipActivity(sgTipId, limit)`: Fetch recent activity
- `likeSGTip(sgTipId)`: Like a SGTip
- `shareSGTip(sgTipId, shareType)`: Share a SGTip
- `getSGTipStats(sgTipId)`: Get SGTip statistics

**Note**: Like status is included in the SGTip detail response, no separate API call needed.

### 3. Push Notification Service
**Location**: `src/services/pushNotificationService.js`

**Features**:
- Firebase messaging integration
- Foreground and background message handling
- Notification tap handling
- Topic subscription management

**Key Methods**:
- `initialize()`: Initialize push notifications
- `getToken()`: Get FCM token
- `subscribeToTopic(topic)`: Subscribe to notification topic
- `unsubscribeFromTopic(topic)`: Unsubscribe from topic

### 4. Share Service
**Location**: `src/services/shareService.js`

**Features**:
- Native share dialog integration
- Platform-specific sharing (WhatsApp, Facebook, Twitter, Instagram)
- Copy to clipboard functionality
- Custom share message formatting
- Deep linking support

**Key Methods**:
- `shareSGTip(sgTipData, sgTipId)`: Share using native dialog
- `shareToPlatform(platform, sgTipData, sgTipId)`: Share to specific platform
- `showShareOptions(sgTipData, sgTipId, callback)`: Show share options dialog
- `formatShareMessage(sgTipData, sgTipId)`: Format share message
- `getShareUrl(sgTipId)`: Get shareable URL

## Integration Points

### 1. TipsDetail Screen Updates
**Location**: `src/screens/sgTabs/tips/tipsDetail/TipsDetail.js`

**Changes Made**:
- Added real-time socket connection
- Integrated RealTimeActivity overlay
- Added SGTipActions component
- Added event listeners for real-time updates
- Added activity feed fetching

**Key Features**:
- Socket connection on component mount
- Real-time activity updates
- Push notification handling
- Stats updates in real-time

### 2. App.jsx Updates
**Location**: `App.jsx`

**Changes Made**:
- Added push notification service initialization
- Integrated with existing user authentication flow

## Socket Events

### Client-Side Events (Send to Server)
```javascript
// Join personal room
socket.emit('join', userId);

// Join SGTip room
socket.emit('join_sgtip', sgTipId);

// Leave SGTip room
socket.emit('leave_sgtip', sgTipId);
```

### Server-Side Events (Receive from Server)
```javascript
// SGTip liked notification
socket.on('sgtip_liked', (data) => {
  // data: { sgTipId, sgTipTitle, likedBy, pointsEarned, timestamp }
});

// SGTip shared notification
socket.on('sgtip_shared', (data) => {
  // data: { sgTipId, sgTipTitle, sharedBy, shareType, pointsEarned, timestamp }
});

// SGTip stats update
socket.on('sgtip_stats_update', (data) => {
  // data: { sgTipId, type, user, shareType, timestamp }
});
```

## API Endpoints Used

### 1. Get SGTip Activity
```
GET /api/sgtips/:sgTipId/activity?limit=10
```

### 2. Like SGTip
```
POST /api/sgtips/:sgTipId/like
```

### 3. Share SGTip
```
POST /api/sgtips/:sgTipId/share
```

### 4. Get SGTip Stats
```
GET /api/sgtips/:sgTipId/stats
```

## Share Behavior

### Share Count Logic
- **One Share Per User**: Each user can only share a SGTip once
- **API Call Only Once**: The backend API is only called once per user per SGTip
- **Visual Feedback**: Share button shows "Shared" state after successful share
- **Duplicate Prevention**: Prevents multiple API calls if user tries to share again

### Expected Backend Response
The SGTip detail API should include:
```json
{
  "id": "sgtip-id",
  "title": "How to Clean Car Headlights",
  "description": "Step by step guide...",
  "status": "PUBLISHED",
  "author": {
    "id": "author-id",
    "firstName": "John",
    "lastName": "Doe",
    "profileImage": "profile-url"
  },
  "category": {
    "id": "category-id",
    "name": "Automotive"
  },
  "isLiked": true,           // ✅ User's like status
  "isShared": false,         // ✅ User's share status
  "imagesArray": ["url1", "url2"],
  "stats": {
    "views": 150,            // ✅ View count
    "likes": 25,             // ✅ Like count
    "shares": 12,            // ✅ Share count
    "comments": 8,           // ✅ Comment count
    "totalPointsEarned": 410, // ✅ Total points
    "pointsBreakdown": {     // ✅ Detailed breakdown
      "publish": 100,        // Points for publishing
      "likes": 250,          // Points from likes (25 × 10)
      "shares": 60           // Points from shares (12 × 5)
    }
  },
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "publishedAt": "2024-01-15T10:00:00Z"
}
```

## Push Notification Types

### 1. SGTip Liked
- **Title**: "Your SGTip Got a Like! 💖"
- **Body**: "{LikerName} liked your SGTip: "{SGTipTitle}""
- **Data**: `{ type: 'SGTIP_LIKED', sgTipId, likerName, sgTipTitle }`

### 2. SGTip Shared
- **Title**: "Your SGTip Was Shared! 📤"
- **Body**: "{SharerName} shared your SGTip: "{SGTipTitle}""
- **Data**: `{ type: 'SGTIP_SHARED', sgTipId, sharerName, sgTipTitle, shareType }`

## Usage Examples

### 1. Basic Integration
```javascript
import RealTimeActivity from '../../components/RealTimeActivity/RealTimeActivity';
import SGTipActions from '../../components/SGTipActions/SGTipActions';
import sgtipSocketService from '../../services/sgtipSocketService';

// In your component
useEffect(() => {
  sgtipSocketService.connect(userId);
  sgtipSocketService.joinSGTipRoom(sgTipId);
  
  return () => {
    sgtipSocketService.leaveSGTipRoom(sgTipId);
  };
}, [userId, sgTipId]);
```

### 2. Handling Real-Time Updates
```javascript
const handleSGTipLiked = (data) => {
  if (data.sgTipId === currentSgTipId) {
    // Update UI with new like
    setStats(prev => ({ ...prev, likes: prev.likes + 1 }));
    
    // Show notification
    Toast.show({
      type: 'success',
      text1: 'New Like!',
      text2: `${data.likedBy.firstName} liked your SGTip`
    });
  }
};

sgtipSocketService.addEventListener('sgtip_liked', handleSGTipLiked);
```

## Performance Considerations

1. **Socket Connection Management**: Uses singleton pattern to prevent multiple connections
2. **Event Listener Cleanup**: Proper cleanup of event listeners on component unmount
3. **Activity Feed Limiting**: Limits activity feed to prevent excessive data transfer
4. **Real-Time Updates**: Only sends essential data for real-time updates
5. **Background Handling**: Efficient handling of background notifications

## Error Handling

1. **Socket Connection Failures**: Graceful handling with reconnection attempts
2. **API Call Failures**: Proper error handling with user feedback
3. **Push Notification Failures**: Fallback to in-app notifications
4. **Network Issues**: Retry mechanisms for failed requests

## Security Considerations

1. **Socket Authentication**: Uses existing JWT authentication system
2. **Room Access Control**: Users can only join rooms for accessible SGTips
3. **Push Notification Security**: Respects user privacy settings
4. **Data Validation**: Validates all incoming socket data

## Testing

### 1. Real-Time Features Testing
- Create a SGTip with one user
- Like/share with another user
- Verify real-time updates appear
- Check push notifications are received

### 2. Socket Connection Testing
- Test connection/disconnection scenarios
- Verify room joining/leaving
- Test event listener cleanup

### 3. UI Integration Testing
- Verify components don't affect existing UI
- Test responsive design
- Check accessibility features

## Future Enhancements

1. **Real-Time Comments**: Add real-time comment updates
2. **User Presence**: Show who's currently viewing SGTip
3. **Advanced Analytics**: Real-time engagement metrics
4. **Custom Notifications**: User-configurable notification preferences
5. **Offline Support**: Queue actions when offline

## Dependencies

- `socket.io-client`: ^4.8.1 (already installed)
- `@react-native-firebase/messaging`: ^21.13.0 (already installed)
- `react-native-toast-message`: ^2.2.1 (already installed)
- `react-redux`: ^9.2.0 (already installed)

## Conclusion

This implementation provides a comprehensive real-time experience for SGTip interactions while maintaining the existing UI design and user experience. The modular approach allows for easy maintenance and future enhancements.
