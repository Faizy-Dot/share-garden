import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Metrix } from '../../config';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../../config/axios';
import Toast from 'react-native-toast-message';

const ProductActions = ({ 
  productId, 
  userId, 
  sellerId, 
  initialStats = { views: 0, likes: 0, shares: 0, favorites: 0 },
  onStatsUpdate,
  productData = {}, // Add product data for sharing
  onShowLikes, // Callback to show likes modal
  onShowShares // Callback to show shares modal
}) => {
  const [stats, setStats] = useState(initialStats);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const isOwner = userId === sellerId;

  useEffect(() => {
    setStats(initialStats);
  }, [initialStats]);

  const handleLike = async () => {
    if (isLiking || !userId) return;
    
    try {
      setIsLiking(true);
      const response = await axiosInstance.post(`/api/products/${productId}/like`);
      
      if (response.data.isLiked !== undefined) {
        setIsLiked(response.data.isLiked);
        const newStats = {
          ...stats,
          likes: response.data.isLiked ? stats.likes + 1 : stats.likes - 1
        };
        setStats(newStats);
        onStatsUpdate && onStatsUpdate(newStats);
        
        Toast.show({
          type: 'success',
          text1: response.data.isLiked ? 'Product liked!' : 'Product unliked!',
          text2: response.data.message
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update like status'
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleFavorite = async () => {
    if (isFavoriting || !userId) return;
    
    try {
      setIsFavoriting(true);
      const response = await axiosInstance.post(`/api/products/favorites/${productId}`);
      
      if (response.status === 200) {
        setIsFavorited(!isFavorited);
        const newStats = {
          ...stats,
          favorites: isFavorited ? stats.favorites - 1 : stats.favorites + 1
        };
        setStats(newStats);
        onStatsUpdate && onStatsUpdate(newStats);
        
        Toast.show({
          type: 'success',
          text1: isFavorited ? 'Removed from favorites' : 'Added to favorites',
          text2: response.data.message
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update favorite status'
      });
    } finally {
      setIsFavoriting(false);
    }
  };

  const handleShare = async () => {
    if (isSharing) return;
    
    try {
      setIsSharing(true);
      
      // Create deeplink URL
      const deeplinkUrl = `https://sharegardendeeplink-s3xe.vercel.app/product.html?id=${productId}`;
      
      const shareMessage = `Check out this amazing product on ShareGarden!\n\n${productData.title || 'Product'}\n\n${productData.description || ''}\n\nPrice: ${productData.isSGPoints ? `${productData.minBid} SG Points` : `$${productData.price}`}\n\nView in ShareGarden: ${deeplinkUrl}`;

      const { Share } = require('react-native');
      const result = await Share.share({
        message: shareMessage,
        title: productData.title || 'ShareGarden Product',
        url: deeplinkUrl
      });

      if (result.action === Share.sharedAction && userId) {
        // Track the share
        try {
          await axiosInstance.post(`/api/products/${productId}/shares`, {
            shareType: 'GENERAL',
            platform: 'MOBILE'
          });
          
          const newStats = {
            ...stats,
            shares: stats.shares + 1
          };
          setStats(newStats);
          onStatsUpdate && onStatsUpdate(newStats);
        } catch (error) {
          console.log('Error tracking share:', error);
        }
      }
    } catch (error) {
      console.error('Error sharing product:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to share product'
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: Metrix.VerticalSize(15),
      paddingHorizontal: Metrix.HorizontalSize(20),
      backgroundColor: colors.white,
      borderTopWidth: 1,
      borderTopColor: colors.borderColor
    }}>
      {/* Views */}
      <View style={{ alignItems: 'center' }}>
        <Icon name="eye" size={Metrix.HorizontalSize(20)} color={colors.gray} />
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: colors.gray,
          marginTop: Metrix.VerticalSize(2)
        }}>
          {stats.views} {stats.views === 1 ? 'View' : 'Views'}
        </Text>
      </View>

      {/* Likes */}
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={isOwner ? () => onShowLikes && onShowLikes() : handleLike}
        disabled={isLiking || (!isOwner && !userId)}
      >
        {isLiking ? (
          <ActivityIndicator size="small" color={colors.buttonColor} />
        ) : (
          <Icon 
            name="heart" 
            size={Metrix.HorizontalSize(20)} 
            color={isLiked ? colors.red : colors.gray} 
            solid={isLiked}
          />
        )}
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: colors.gray,
          marginTop: Metrix.VerticalSize(2)
        }}>
          {stats.likes} {stats.likes === 1 ? 'Like' : 'Likes'}
        </Text>
      </TouchableOpacity>

      {/* Favorites */}
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={handleFavorite}
        disabled={isFavoriting || !userId}
      >
        {isFavoriting ? (
          <ActivityIndicator size="small" color={colors.buttonColor} />
        ) : (
          <Icon 
            name="bookmark" 
            size={Metrix.HorizontalSize(20)} 
            color={isFavorited ? colors.buttonColor : colors.gray} 
            solid={isFavorited}
          />
        )}
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: colors.gray,
          marginTop: Metrix.VerticalSize(2)
        }}>
          {stats.favorites} {stats.favorites === 1 ? 'Save' : 'Saves'}
        </Text>
      </TouchableOpacity>

      {/* Shares */}
      <TouchableOpacity
        style={{ alignItems: 'center' }}
        onPress={isOwner ? () => onShowShares && onShowShares() : handleShare}
        disabled={isSharing}
      >
        {isSharing ? (
          <ActivityIndicator size="small" color={colors.buttonColor} />
        ) : (
          <Icon name="share" size={Metrix.HorizontalSize(20)} color={colors.gray} />
        )}
        <Text style={{
          fontSize: Metrix.FontExtraSmall,
          fontFamily: fonts.InterRegular,
          color: colors.gray,
          marginTop: Metrix.VerticalSize(2)
        }}>
          {stats.shares} {stats.shares === 1 ? 'Share' : 'Shares'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductActions;
