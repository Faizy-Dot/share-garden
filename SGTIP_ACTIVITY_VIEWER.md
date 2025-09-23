# SGTip Activity Viewer Feature

## Overview
This feature allows SGTip authors to see who liked and shared their SGTips by tapping on the like/share counts in the SGTip details screen.

## How It Works

### For SGTip Authors
1. **Visit your SGTip details page**
2. **Tap on the like count** (e.g., "5 Likes") to see who liked your SGTip
3. **Tap on the share count** (e.g., "3 Shares") to see who shared your SGTip
4. **View detailed information** including:
   - User profile pictures
   - User names
   - Timestamps of when they liked/shared
   - Share method (if applicable)

### For Other Users
- Like and share buttons work normally
- Cannot see who else liked/shared (only authors can see this)

## Technical Implementation

### New Components
1. **SGTipActivityModal** - Modal component that displays the list of users who liked/shared
2. **Enhanced SGTipActions** - Made like/share counts tappable for authors
3. **Updated TipsDetail** - Integrated the new functionality

### API Endpoint Used
- `GET /api/sgtips/:sgTipId/activity` - Fetches recent likes and shares with user details

### Key Features
- **Real-time updates** - Uses existing socket service for live updates
- **Pull-to-refresh** - Users can refresh the list
- **Empty states** - Shows appropriate messages when no activity
- **Responsive design** - Works on all screen sizes
- **Loading states** - Shows loading indicators while fetching data

## Files Modified
- `src/components/SGTipActivityModal/SGTipActivityModal.jsx` (new)
- `src/components/SGTipActions/SGTipActions.jsx` (updated)
- `src/screens/sgTabs/tips/tipsDetail/TipsDetail.js` (updated)

## Usage Example
```jsx
// In TipsDetail screen
<SGTipActions
    sgTipId={route.params.id}
    userId={user?.id}
    authorId={sgtipDetail.author?.id}
    onShowLikes={handleShowLikes}  // New callback
    onShowShares={handleShowShares} // New callback
    // ... other props
/>

// Modal components
<SGTipActivityModal
    visible={showLikesModal}
    onClose={() => setShowLikesModal(false)}
    sgTipId={route.params.id}
    activityType="like"
    title="Who Liked This SGTip"
/>
```

## Benefits
- **Better engagement tracking** - Authors can see who's interacting with their content
- **Social proof** - Seeing who liked/shared can encourage more engagement
- **User insights** - Authors can identify their most engaged followers
- **Real-time feedback** - Immediate visibility of new likes/shares
