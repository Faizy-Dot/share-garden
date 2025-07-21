import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './Button/Button';
import { Metrix } from '../config';
import fonts from '../config/Fonts';
import colors from '../config/Colors';

const SubscriptionProtectedRoute = ({ children, requiredFeature = 'premium' }) => {
  const { user } = useSelector((state) => state.login);
  const navigation = useNavigation();

  // Check if merchant is subscribed
  const isMerchantSubscribed = () => {
    return user?.role === 'MERCHANT' && 
           user?.subscription && 
           user?.subscription.status === 'active';
  };

  // Check if user can access the feature
  const canAccessFeature = () => {
    if (user?.role !== 'MERCHANT') {
      return true; // Non-merchants can access (adjust as needed)
    }
    
    if (!isMerchantSubscribed()) {
      return false;
    }

    // Add specific feature checks based on subscription plan
    switch (requiredFeature) {
      case 'ads':
        return user?.subscription?.planName === 'Basic' || 
               user?.subscription?.planName === 'Premium' || 
               user?.subscription?.planName === 'Ultimate';
      case 'coupons':
        return user?.subscription?.planName === 'Premium' || 
               user?.subscription?.planName === 'Ultimate';
      case 'analytics':
        return user?.subscription?.planName === 'Premium' || 
               user?.subscription?.planName === 'Ultimate';
      default:
        return true;
    }
  };

  const handleSubscribe = () => {
    navigation.navigate('MerchantItems');
  };

  const handleUpgrade = () => {
    Alert.alert(
      'Upgrade Required',
      `This feature requires a higher subscription tier. Your current plan: ${user?.subscription?.planName}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Upgrade', onPress: () => navigation.navigate('MerchantItems') }
      ]
    );
  };

  // If user can access the feature, render the children
  if (canAccessFeature()) {
    return children;
  }

  // If merchant is not subscribed, show subscription prompt
  if (user?.role === 'MERCHANT' && !isMerchantSubscribed()) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Metrix.HorizontalSize(20),
        backgroundColor: colors.white
      }}>
        <Text style={{
          fontSize: Metrix.normalize(24),
          fontFamily: fonts.InterBold,
          textAlign: 'center',
          marginBottom: Metrix.VerticalSize(10),
          color: colors.textColor
        }}>
          Subscription Required
        </Text>
        <Text style={{
          fontSize: Metrix.FontSmall,
          fontFamily: fonts.InterRegular,
          textAlign: 'center',
          marginBottom: Metrix.VerticalSize(20),
          color: colors.textColor,
          lineHeight: Metrix.VerticalSize(20)
        }}>
          This feature requires an active subscription. Subscribe to unlock powerful tools and boost your sales!
        </Text>
        <CustomButton
          width={Metrix.HorizontalSize(200)}
          height={Metrix.VerticalSize(50)}
          title="Subscribe Now"
          fontSize={Metrix.FontSmall}
          fontFamily={fonts.InterBold}
          borderRadius={5}
          onPress={handleSubscribe}
        />
      </View>
    );
  }

  // If merchant needs to upgrade, show upgrade prompt
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: Metrix.HorizontalSize(20),
      backgroundColor: colors.white
    }}>
      <Text style={{
        fontSize: Metrix.normalize(24),
        fontFamily: fonts.InterBold,
        textAlign: 'center',
        marginBottom: Metrix.VerticalSize(10),
        color: colors.textColor
      }}>
        Upgrade Required
      </Text>
      <Text style={{
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular,
        textAlign: 'center',
        marginBottom: Metrix.VerticalSize(20),
        color: colors.textColor,
        lineHeight: Metrix.VerticalSize(20)
      }}>
        This feature requires a higher subscription tier. Upgrade your plan to access this feature.
      </Text>
      <CustomButton
        width={Metrix.HorizontalSize(200)}
        height={Metrix.VerticalSize(50)}
        title="Upgrade Plan"
        fontSize={Metrix.FontSmall}
        fontFamily={fonts.InterBold}
        borderRadius={5}
        onPress={handleUpgrade}
      />
    </View>
  );
};

export default SubscriptionProtectedRoute; 