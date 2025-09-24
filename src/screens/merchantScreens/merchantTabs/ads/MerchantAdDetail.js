import React, { useState, useEffect } from 'react';
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

import ApiCaller from '../../../../config/ApiCaller';
import { Metrix } from '../../../../config';
import colors from '../../../../config/Colors';
import fonts from '../../../../config/Fonts';
import { Images } from '../../../../config';
import MerchantNavbar from '../../../../components/navBar/MerchantNavbar';
import { ShareIcon, CallIcon, AdsLocationIcon, BlackEyeIcon, GreenBitIcon, PurchaseIcon, EditIcon, CrossIcon } from '../../../../assets/svg';
import CustomButton from '../../../../components/Button/Button';

import styles from './merchantAdDetailStyles';

export default function MerchantAdDetail({ route, navigation }) {
  const { adId } = route.params;
  const { user } = useSelector((state) => state.login);
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdDetails();
  }, [adId]);

  const fetchAdDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ApiCaller.Get(`/api/ads/${adId}`);
      setAd(response.data);
    } catch (err) {
      console.error('Error fetching ad details:', err);
      setError('Failed to load ad details');
      Alert.alert('Error', 'Failed to load ad details. Please try again.');
    } finally {
      setLoading(false);
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

  const handleEdit = () => {
    // Navigate to edit ad screen
    navigation.navigate('EditAd', { adId: adId, adData: ad });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Ad',
      'Are you sure you want to delete this ad? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteAd,
        },
      ]
    );
  };

  const deleteAd = async () => {
    try {
      await ApiCaller.Delete(`/api/ads/${adId}`);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Ad deleted successfully',
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting ad:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete ad',
      });
    }
  };

  const handlePublishToggle = async () => {
    try {
      const newStatus = ad.isPublished ? 'unpublish' : 'publish';
      await ApiCaller.Patch(`/api/ads/${adId}/${newStatus}`);
      
      setAd(prev => ({
        ...prev,
        isPublished: !prev.isPublished
      }));
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: `Ad ${newStatus}ed successfully`,
      });
    } catch (error) {
      console.error('Error toggling publish status:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update ad status',
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
  const validUntil = ad.coupon?.validTill ? moment(ad.coupon.validTill).format('MMM DD, YYYY') : 'N/A';
  const discountText = ad.coupon?.discountValue ? 
    (ad.coupon.type === 'PERCENTAGE' ? `${ad.coupon.discountValue}% OFF` : `$${ad.coupon.discountValue} OFF`) : 
    'Special Offer';

  return (
    <View style={styles.previewContainer}>
      {/* Header */}
      <MerchantNavbar 
        title="Ad Details" 
        showBackButton={true}
        rightComponent={
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <ShareIcon stroke={colors.black} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
              <EditIcon stroke={colors.black} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
              <CrossIcon stroke={colors.red} width={20} height={20} />
            </TouchableOpacity>
          </View>
        }
      />

      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Ad Status */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: ad.isPublished ? colors.green : colors.orange }]}>
            <Text style={styles.statusText}>
              {ad.isPublished ? 'Published' : 'Draft'}
            </Text>
          </View>
          <Text style={styles.statusDate}>
            Created: {moment(ad.createdAt).format('MMM DD, YYYY')}
          </Text>
        </View>

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
                  <Text style={styles.redeemText}>
                    Redeem coupon: {ad.coupon.redeemBy?.includes('ONLINE') ? 'Online' : ''}
                    {ad.coupon.redeemBy?.includes('ONLINE') && ad.coupon.redeemBy?.includes('INSTORE') ? ', ' : ''}
                    {ad.coupon.redeemBy?.includes('INSTORE') ? 'Instore' : ''}
                  </Text>
                </View>
              </View>
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>{discountText}</Text>
              </View>
            </View>

            <View style={styles.couponFooter}>
              <View style={styles.iconRow}>
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
                <Text style={[styles.statusText, { backgroundColor: ad.coupon?.isActive ? colors.green : colors.red }]}>
                  {ad.coupon?.isActive ? 'Active' : 'Inactive'}
                </Text>
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
                  {ad.merchant?.businessAddress || 'Address not available'}
                </Text>
                <Text style={styles.merchantPhone}>
                  📞 {ad.merchant?.businessPhone || ad.merchant?.phoneNumber || 'Phone not available'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ad Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Ad Performance</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{ad.viewCount || 0}</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{ad.shareCount || 0}</Text>
              <Text style={styles.statLabel}>Shares</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{ad.coupon?.usageCount || 0}</Text>
              <Text style={styles.statLabel}>Redemptions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{ad.likeCount || 0}</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <CustomButton
            flex={1}
            title={ad.isPublished ? "UNPUBLISH" : "PUBLISH"}
            height={Metrix.VerticalSize(42)}
            borderRadius={4}
            color={colors.white}
            backgroundColor={ad.isPublished ? colors.orange : colors.green}
            fontSize={Metrix.FontSmall}
            onPress={handlePublishToggle}
          />
          <CustomButton
            flex={1}
            title="EDIT AD"
            height={Metrix.VerticalSize(42)}
            fontSize={Metrix.FontSmall}
            borderRadius={4}
            color={colors.black}
            backgroundColor={colors.white}
            borderColor="#D0D0D0"
            borderWidth={1}
            onPress={handleEdit}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
