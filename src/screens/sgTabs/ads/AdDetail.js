import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Metrix } from '../../../config';
import colors from '../../../config/Colors';
import fonts from '../../../config/Fonts';
import { Images } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import { ShareIcon, CallIcon, AdsLocationIcon, BlackEyeIcon, GreenBitIcon, PurchaseIcon, LikesIcon } from '../../../assets/svg';
import CustomButton from '../../../components/Button/Button';
import styles from './adDetailStyles';
import axiosInstance from '../../../config/axios';
import { useFocusEffect } from '@react-navigation/native';

export default function AdDetail({ route, navigation }) {
  const { adId } = route.params;
  const { user } = useSelector((state) => state.login);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const fetchAdDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use axiosInstance to include auth token so backend can check if user liked the ad
      const response = await axiosInstance.get(`/api/ads/${adId}`);
      setAd(response.data);
      setIsLiked(response.data.isLiked || false);
    } catch (err) {
      console.error('Error fetching ad details:', err);
      setError('Failed to load ad details');
      Alert.alert('Error', 'Failed to load ad details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [adId]);

  // Fetch when screen comes into focus (when user comes back)
  useFocusEffect(
    useCallback(() => {
      fetchAdDetails();
    }, [fetchAdDetails])
  );

  // Also fetch on mount
  useEffect(() => {
    fetchAdDetails();
  }, [fetchAdDetails]);

  const handleLike = async () => {
    // Prevent if already liked, not logged in, or currently processing
    if (!user?.id || isLiking || isLiked) {
      if (isLiked) {
        Toast.show({
          type: 'info',
          text1: 'Already Liked',
          text2: 'Ads cannot be unliked once liked'
        });
      }
      return;
    }
    
    try {
      setIsLiking(true);
      const response = await axiosInstance.post(`/api/ads/${adId}/like`);
      
      // If already liked, ensure state is set and return
      if (response.data.alreadyLiked || response.data.canUnlike === false) {
        setIsLiked(true);
        setAd(prev => ({
          ...prev,
          likeCount: response.data.likeCount || prev?.likeCount
        }));
        return;
      }

      if (response.data.isLiked) {
        setIsLiked(true);
        setAd(prev => ({
          ...prev,
          likeCount: response.data.likeCount || (prev?.likeCount || 0) + 1
        }));
        
        Toast.show({
          type: 'success',
          text1: 'Ad liked!',
          text2: response.data.message
        });
      }
    } catch (error) {
      console.error('Error liking ad:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to like ad'
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    try {
      const webLink = `https://sharegardendeeplink-s3xe.vercel.app/index.html?type=ad&id=${adId}`;
      const shareMessage = `Check out this amazing ad on ShareGarden!\n\n${ad?.title}\n\n${ad?.description || ''}\n\nView in ShareGarden app:\n${webLink}`;
      
      const result = await Share.share({
        message: shareMessage,
        title: ad?.title,
        url: webLink,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to share ad',
      });
    }
  };

  const handleCall = () => {
    if (ad?.merchant?.phone) {
      Linking.openURL(`tel:${ad.merchant.phone}`);
    } else {
      Toast.show({
        type: 'info',
        text1: 'No Phone Number',
        text2: 'Phone number not available for this merchant',
      });
    }
  };

  const handleLocation = () => {
    if (ad?.merchant?.address) {
      const encodedAddress = encodeURIComponent(ad.merchant.address);
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
    } else {
      Toast.show({
        type: 'info',
        text1: 'No Address',
        text2: 'Address not available for this merchant',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.buttonColor} />
        <Text style={styles.loadingText}>Loading ad details...</Text>
      </View>
    );
  }

  if (error || !ad) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Ad not found'}</Text>
        <CustomButton
          title="Retry"
          onPress={fetchAdDetails}
          backgroundColor={colors.buttonColor}
        />
      </View>
    );
  }

  const imageSource = ad.images ? { uri: ad.images } : Images.homePopularListing;
  const merchantInitial = ad.merchant?.firstName?.charAt(0)?.toUpperCase() || 'M';
  const validUntil = ad.coupon?.validUntil ? moment(ad.coupon.validUntil).format('MMM DD, YYYY') : 'N/A';
  const discountText = ad.coupon?.discountPercentage ? `${ad.coupon.discountPercentage}% OFF` : 'Special Offer';

  return (
    <View style={styles.previewContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <BackArrowIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ad Details</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity 
            onPress={handleLike}
            disabled={isLiking || !user?.id || isLiked}
            style={[
              { padding: 4 },
              (isLiked || !user?.id) && { opacity: 0.6 }
            ]}
            activeOpacity={isLiked || !user?.id ? 1 : 0.7}
          >
            {isLiking ? (
              <ActivityIndicator size="small" color={colors.buttonColor} />
            ) : (
              <LikesIcon 
                stroke={isLiked ? colors.redColor || '#FF0000' : colors.black} 
                fill={isLiked ? colors.redColor || '#FF0000' : 'none'}
                width={24} 
                height={24} 
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <ShareIcon stroke={colors.black} width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Ad Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{ad.title}</Text>
          <Text style={styles.categoryText}>{ad.category?.name || 'General'}</Text>
          <Image source={imageSource} style={styles.image} />
          <Text style={styles.descriptionText}>{ad.description}</Text>
        </View>

        {/* Coupon Card */}
        {ad.coupon && (
          <View style={styles.couponCard}>
            <View style={styles.couponHeader}>
              <View style={styles.userInfoContainer}>
                <Text style={styles.userInitial}>{merchantInitial}</Text>
                <View>
                  <Text style={styles.couponTitle}>{ad.coupon.title || ad.title}</Text>
                  <Text style={styles.validUntil}>Valid Until: {validUntil}</Text>
                  <Text style={styles.redeemText}>Redeem coupon: Online, Instore</Text>
                </View>
              </View>
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>{discountText}</Text>
              </View>
            </View>

            <View style={styles.couponFooter}>
              <View style={styles.iconRow}>
                <TouchableOpacity 
                  style={[
                    styles.iconWithText,
                    (isLiked || !user?.id) && { opacity: 0.6 }
                  ]}
                  onPress={handleLike}
                  disabled={isLiking || !user?.id || isLiked}
                  activeOpacity={isLiked || !user?.id ? 1 : 0.7}
                >
                  {isLiking ? (
                    <ActivityIndicator size="small" color={colors.buttonColor} />
                  ) : (
                    <LikesIcon 
                      stroke={isLiked ? colors.redColor || '#FF0000' : colors.black} 
                      fill={isLiked ? colors.redColor || '#FF0000' : 'none'}
                      width={16} 
                      height={16} 
                    />
                  )}
                  <Text style={[styles.iconText, isLiked && { color: colors.redColor || '#FF0000' }]}>
                    {ad.likeCount || 0}
                  </Text>
                </TouchableOpacity>
                <View style={styles.iconWithText}>
                  <ShareIcon stroke={colors.black} width={16} height={19} />
                  <Text style={styles.iconText}>{ad.shareCount || 0}</Text>
                </View>
                <View style={styles.iconWithText}>
                  <BlackEyeIcon />
                  <Text style={styles.iconText}>{ad.viewCount || 0}</Text>
                </View>
                <View style={styles.iconWithText}>
                  <PurchaseIcon />
                  <Text style={styles.iconText}>{ad.coupon?.usageCount || 0}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
          </View>
        )}

        {/* Merchant Info */}
        <View style={styles.merchantContainer}>
          <Text style={styles.merchantTitle}>Merchant Information</Text>
          <View style={styles.merchantCard}>
            <View style={styles.merchantInfo}>
              <Text style={styles.userInitial}>{merchantInitial}</Text>
              <View style={styles.merchantDetails}>
                <Text style={styles.merchantName}>
                  {ad.merchant?.firstName} {ad.merchant?.lastName}
                </Text>
                <Text style={styles.merchantLocation}>
                  <AdsLocationIcon width={12} height={12} />
                  {ad.merchant?.address || 'Address not available'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Grab Coupon Section */}
        <View style={styles.grabCouponSection}>
          <Text style={styles.grabTitle}>Grab this coupon</Text>
          <View style={styles.pointsContainer}>
            <GreenBitIcon width={40} height={40} />
            <Text style={styles.pointsText}>{ad.coupon?.pointsRequired || 0}</Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerBold}>
            Disclaimer:
            <Text style={styles.disclaimerRegular}>
              {" "}Valid for one-time use only per user. Cannot be combined with other offers or discounts. Show this page to the merchant to avail this coupon in store.
            </Text>
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <CustomButton
            flex={1}
            title="CALL MERCHANT"
            height={Metrix.VerticalSize(42)}
            borderRadius={4}
            color={colors.black}
            backgroundColor={colors.white}
            borderColor="#D0D0D0"
            fontSize={Metrix.FontSmall}
            borderWidth={1}
            onPress={handleCall}
          />
          <CustomButton
            flex={1}
            title="GET DIRECTIONS"
            height={Metrix.VerticalSize(42)}
            fontSize={Metrix.FontSmall}
            borderRadius={4}
            onPress={handleLocation}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
