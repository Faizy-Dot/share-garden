import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
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
    sgTipData = {}, // Add SGTip data for sharing
    pulseLikeKey, // triggers like icon pulse when changes
    pulseShareKey, // triggers share icon pulse when changes
    onShareSuccess, // Callback to refresh data after successful share
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [stats, setStats] = useState(initialStats);
    const [hasShared, setHasShared] = useState(false); // Track if user has already shared

    const isAuthor = userId === authorId;

    // Animated values for graffiti/pulse
    const likeScale = useRef(new Animated.Value(1)).current;
    const shareScale = useRef(new Animated.Value(1)).current;

    const runPulse = (animatedValue) => {
        Animated.sequence([
            Animated.timing(animatedValue, { toValue: 1.25, duration: 120, useNativeDriver: true }),
            Animated.timing(animatedValue, { toValue: 0.95, duration: 120, useNativeDriver: true }),
            Animated.timing(animatedValue, { toValue: 1, duration: 120, useNativeDriver: true }),
        ]).start();
    };

    useEffect(() => {
        if (pulseLikeKey) runPulse(likeScale);
    }, [pulseLikeKey]);

    useEffect(() => {
        if (pulseShareKey) runPulse(shareScale);
    }, [pulseShareKey]);

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

        // Prevent multiple interactions (check if already liked)
        if (isLiked) {
            return; // Already liked, do nothing
        }

        if (isLiking) return;

        setIsLiking(true);
        try {
            const response = await sgtipActivityService.likeSGTip(sgTipId);
            
            // If already liked, just return
            if (response.alreadyLiked) {
                setIsLiked(true);
                return;
            }

            // Update local state - only allow liking (not unliking)
            setIsLiked(true);
            setStats(prev => ({
                ...prev,
                likes: prev.likes + 1
            }));

            // Notify parent component
            if (onStatsUpdate) {
                onStatsUpdate({
                    ...stats,
                    likes: stats.likes + 1
                });
            }

            Toast.show({
                type: 'success',
                text1: 'Liked',
                text2: 'SGTip liked successfully'
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

        // Note: We no longer check hasShared here - allow sharing once per day

        setIsSharing(true);
        try {
            // Use native share dialog directly
            const result = await shareService.shareSGTip(sgTipData, sgTipId);

            // Check if share was successful
            // Android returns 'sharedAction', iOS returns 'shared'
            const isShareSuccessful = result.action === 'shared' || result.action === 'sharedAction';

            if (isShareSuccessful) {
                // If author shares own SGTip, just update local count
                if (isAuthor) {
                    setStats(prev => ({ ...prev, shares: prev.shares + 1 }));
                    if (onStatsUpdate) {
                        onStatsUpdate({ ...stats, shares: stats.shares + 1 });
                    }
                    return;
                }

                // Call API to record share (backend will handle once-per-day logic)
                try {
                    const response = await sgtipActivityService.shareSGTip(sgTipId);
                    
                    // Update stats with count from backend
                    const newShareCount = response.totalShares !== undefined 
                        ? response.totalShares 
                        : stats.shares;
                    
                    setStats(prev => ({
                        ...prev,
                        shares: newShareCount
                    }));

                    if (onStatsUpdate) {
                        onStatsUpdate({
                            ...stats,
                            shares: newShareCount
                        });
                    }

                    // Only show success message if points were awarded (first share of the day)
                    if (response.pointsAwarded > 0) {
                        Toast.show({
                            type: 'success',
                            text1: 'Shared Successfully!',
                            text2: `SGTip shared! +${response.pointsAwarded} points earned`
                        });
                    }

                    if (onShareSuccess) {
                        onShareSuccess();
                    }
                } catch (apiError) {
                    console.error('❌ Error recording share in API:', apiError);
                }
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
                disabled={isLiking || (!isAuthor && isLiked)}
            >
                <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                    {isLiking ? (
                        <ActivityIndicator size="small" color={colors.buttonColor} />
                    ) : (
                        <LikesIcon 
                            fill={isLiked ? colors.redColor : 'none'} 
                            stroke={isLiked ? colors.redColor : colors.gray}
                        />
                    )}
                </Animated.View>
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
                <Animated.View style={{ transform: [{ scale: shareScale }] }}>
                    {isSharing ? (
                        <ActivityIndicator size="small" color={colors.buttonColor} />
                    ) : (
                        <ShareIcon stroke={hasShared ? colors.buttonColor : colors.gray} />
                    )}
                </Animated.View>
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
