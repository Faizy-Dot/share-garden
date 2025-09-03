import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { LikesIcon, ShareIcon } from '../../assets/svg';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';
import { Metrix } from '../../config';
import sgtipActivityService from '../../services/sgtipActivityService';
import shareService from '../../services/shareService';
import Toast from 'react-native-toast-message';

const SGTipActions = ({ 
    sgTipId, 
    userId, 
    authorId, 
    initialStats = { likes: 0, shares: 0 },
    onStatsUpdate,
    sgTipData = {} // Add SGTip data for sharing
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [stats, setStats] = useState(initialStats);
    const [hasShared, setHasShared] = useState(false); // Track if user has already shared

    const isAuthor = userId === authorId;

    useEffect(() => {
        // Use the existing data from the SGTip detail instead of making a separate API call
        // The like status should be available in the SGTip data structure
        if (sgTipData && sgTipData.isLiked !== undefined) {
            setIsLiked(sgTipData.isLiked);
        }
        
        // Check if user has already shared this SGTip
        if (sgTipData && sgTipData.hasShared !== undefined) {
            setHasShared(sgTipData.hasShared);
        }
    }, [sgTipData]);

    const handleLike = async () => {
        if (isAuthor) {
            Toast.show({
                type: 'info',
                text1: 'Notice',
                text2: 'You cannot like your own SGTip'
            });
            return;
        }

        if (isLiking) return;

        setIsLiking(true);
        try {
            const response = await sgtipActivityService.likeSGTip(sgTipId);
            
            // Update local state
            setIsLiked(!isLiked);
            setStats(prev => ({
                ...prev,
                likes: prev.likes + (isLiked ? -1 : 1)
            }));

            // Notify parent component
            if (onStatsUpdate) {
                onStatsUpdate({
                    ...stats,
                    likes: stats.likes + (isLiked ? -1 : 1)
                });
            }

            Toast.show({
                type: 'success',
                text1: isLiked ? 'Unliked' : 'Liked',
                text2: isLiked ? 'SGTip unliked' : 'SGTip liked successfully'
            });

        } catch (error) {
            console.error('Error liking SGTip:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to like SGTip'
            });
        } finally {
            setIsLiking(false);
        }
    };

    const handleShare = async () => {
        if (isSharing) return;

        // Check if user has already shared this SGTip
        if (hasShared) {
            Toast.show({
                type: 'info',
                text1: 'Already Shared',
                text2: 'You have already shared this SGTip'
            });
            return;
        }

        setIsSharing(true);
        try {
            // Use native share dialog directly
            const result = await shareService.shareSGTip(sgTipData, sgTipId);

            // Only call API if share was successful and user hasn't shared before
            if (result.action === 'shared' && !hasShared) {
                try {
                    const response = await sgtipActivityService.shareSGTip(sgTipId);
                    
                    // Mark as shared to prevent duplicate API calls
                    setHasShared(true);
                    
                    // Update local state
                    setStats(prev => ({
                        ...prev,
                        shares: prev.shares + 1
                    }));

                    // Notify parent component
                    if (onStatsUpdate) {
                        onStatsUpdate({
                            ...stats,
                            shares: stats.shares + 1
                        });
                    }

                    Toast.show({
                        type: 'success',
                        text1: 'Shared Successfully!',
                        text2: `SGTip shared! +${response.pointsAwarded || 0} points earned`
                    });
                } catch (apiError) {
                    console.error('Error recording share in API:', apiError);
                    // Still show success for the share action, but mention API issue
                    Toast.show({
                        type: 'info',
                        text1: 'Shared Successfully!',
                        text2: 'SGTip shared, but stats may not update immediately'
                    });
                }
            } else if (result.action === 'dismissed') {
                // User dismissed the share dialog
                console.log('Share dismissed by user');
            } else if (hasShared) {
                // User tried to share again but already shared
                Toast.show({
                    type: 'info',
                    text1: 'Already Shared',
                    text2: 'You have already shared this SGTip'
                });
            }

        } catch (error) {
            console.error('Error sharing SGTip:', error);
            Toast.show({
                type: 'error',
                text1: 'Share Failed',
                text2: 'Unable to share SGTip. Please try again.'
            });
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: Metrix.VerticalSize(15),
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.borderColor,
            marginTop: Metrix.VerticalSize(10),
        }}>
            {/* Like Button */}
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: Metrix.HorizontalSize(8),
                    paddingHorizontal: Metrix.HorizontalSize(15),
                    paddingVertical: Metrix.VerticalSize(8),
                    borderRadius: Metrix.VerticalSize(20),
                    backgroundColor: isLiked ? colors.redColor + '20' : 'transparent',
                }}
                onPress={handleLike}
                disabled={isLiking || isAuthor}
            >
                {isLiking ? (
                    <ActivityIndicator size="small" color={colors.buttonColor} />
                ) : (
                    <LikesIcon 
                        fill={isLiked ? colors.redColor : 'none'} 
                        stroke={isLiked ? colors.redColor : colors.gray}
                    />
                )}
                <Text style={{
                    fontSize: Metrix.FontSmall,
                    fontFamily: fonts.InterSemiBold,
                    color: isLiked ? colors.redColor : colors.gray,
                }}>
                    {stats.likes} {stats.likes === 1 ? 'Like' : 'Likes'}
                </Text>
            </TouchableOpacity>

            {/* Share Button */}
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: Metrix.HorizontalSize(8),
                    paddingHorizontal: Metrix.HorizontalSize(15),
                    paddingVertical: Metrix.VerticalSize(8),
                    borderRadius: Metrix.VerticalSize(20),
                    backgroundColor: hasShared ? colors.buttonColor + '20' : 'transparent',
                }}
                onPress={handleShare}
                disabled={isSharing}
            >
                {isSharing ? (
                    <ActivityIndicator size="small" color={colors.buttonColor} />
                ) : (
                    <ShareIcon stroke={hasShared ? colors.buttonColor : colors.gray} />
                )}
                <Text style={{
                    fontSize: Metrix.FontSmall,
                    fontFamily: fonts.InterSemiBold,
                    color: hasShared ? colors.buttonColor : colors.gray,
                }}>
                    {hasShared ? 'Shared' : 'Share'} ({stats.shares})
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SGTipActions;
