import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { Metrix } from '../../config';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';
import { Images } from '../../config';

const RealTimeActivity = ({ 
    sgTipId, 
    userId, 
    isAuthor = false,
    onActivityPress 
}) => {
    const [recentActivity, setRecentActivity] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (recentActivity.length > 0) {
            setIsVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Auto-hide after 3 seconds
            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    setIsVisible(false);
                });
            }, 3000);
        }
    }, [recentActivity]);

    const addActivity = (activity) => {
        setRecentActivity(prev => [activity, ...prev.slice(0, 2)]); // Keep only last 3
    };

    const getActivityText = (activity) => {
        if (activity.type === 'like') {
            return `${activity.user.firstName} liked your SGTip`;
        } else if (activity.type === 'share') {
            return `${activity.user.firstName} shared your SGTip`;
        }
        return '';
    };

    const getActivityIcon = (activity) => {
        if (activity.type === 'like') {
            return '❤️';
        } else if (activity.type === 'share') {
            return '📤';
        }
        return '🔔';
    };

    if (!isVisible || recentActivity.length === 0) {
        return null;
    }

    return (
        <Animated.View 
            style={{
                position: 'absolute',
                top: Metrix.VerticalSize(100),
                left: Metrix.HorizontalSize(15),
                right: Metrix.HorizontalSize(15),
                backgroundColor: colors.white,
                borderRadius: Metrix.VerticalSize(8),
                padding: Metrix.HorizontalSize(12),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                zIndex: 1000,
                opacity: fadeAnim,
            }}
        >
            {recentActivity.map((activity, index) => (
                <TouchableOpacity
                    key={`${activity.id}-${index}`}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: Metrix.VerticalSize(4),
                    }}
                    onPress={() => onActivityPress && onActivityPress(activity)}
                >
                    <View style={{
                        width: Metrix.HorizontalSize(32),
                        height: Metrix.HorizontalSize(32),
                        borderRadius: Metrix.HorizontalSize(16),
                        backgroundColor: colors.borderColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: Metrix.HorizontalSize(10),
                    }}>
                        {activity.user.profileImage ? (
                            <Image
                                source={{ uri: activity.user.profileImage }}
                                style={{
                                    width: Metrix.HorizontalSize(32),
                                    height: Metrix.HorizontalSize(32),
                                    borderRadius: Metrix.HorizontalSize(16),
                                }}
                                resizeMode="cover"
                            />
                        ) : (
                            <Text style={{
                                fontSize: Metrix.FontSmall,
                                fontFamily: fonts.InterBold,
                                color: colors.buttonColor,
                            }}>
                                {activity.user.firstName?.charAt(0) || '?'}
                            </Text>
                        )}
                    </View>
                    
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            fontSize: Metrix.FontSmall,
                            fontFamily: fonts.InterRegular,
                            color: colors.black,
                        }}>
                            {getActivityIcon(activity)} {getActivityText(activity)}
                        </Text>
                        <Text style={{
                            fontSize: Metrix.FontExtraSmall,
                            fontFamily: fonts.InterRegular,
                            color: colors.gray,
                        }}>
                            {new Date(activity.timestamp).toLocaleTimeString()}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </Animated.View>
    );
};

export default RealTimeActivity;
