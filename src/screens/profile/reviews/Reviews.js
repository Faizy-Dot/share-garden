import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import styles from './style';
import { ProgressBar } from 'react-native-paper';
import { Colors, Images, Metrix } from '../../../config';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';
import { StarIcon } from '../../../assets/svg';
import ApiCaller from '../../../config/ApiCaller';
import moment from 'moment';
import Toast from 'react-native-toast-message';

export default function Reviews() {
  const { user } = useSelector(state => state.login);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ratingBreakdown, setRatingBreakdown] = useState({
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  });

  // Fetch user reviews
  const fetchUserReviews = async () => {
    try {
      setLoading(true);
      if (!user?.id) {
        Toast.show({ type: 'error', text1: 'Error', text2: 'User not found. Please login again.' });
        return;
      }

      const response = await ApiCaller.Get(
        `/api/reviews/user/${user.id}`,
        '',
        user?.token ? { Authorization: `Bearer ${user.token}` } : {}
      );
      
      if (response.status === 200) {
        const { reviews: userReviews, averageRating: avgRating, totalReviews: total } = response.data;
        
        // Ensure reviews is an array
        const safeReviews = Array.isArray(userReviews) ? userReviews : [];
        setReviews(safeReviews);
        setAverageRating(avgRating || 0);
        setTotalReviews(total || 0);
        
        // Calculate rating breakdown
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        safeReviews.forEach(review => {
          if (review.rating >= 1 && review.rating <= 5) {
            breakdown[review.rating]++;
          }
        });
        setRatingBreakdown(breakdown);
        
        console.log('Reviews fetched:', safeReviews.length, 'reviews');
      } else {
        console.error('Error fetching reviews:', response?.status, response?.data);
        Toast.show({ type: 'error', text1: 'Error', text2: response?.data?.message || 'Failed to load reviews. Please try again.' });
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Toast.show({ type: 'error', text1: 'Error', text2: error?.data?.message || 'Failed to load reviews. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserReviews();
  }, [user?.id]);

  // Calculate percentage for each rating
  const getRatingPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return ratingBreakdown[rating] / totalReviews;
  };

  // Generate rating breakdown data
  const reviewsData = [
    { label: 'Excellent', percentage: getRatingPercentage(5), rating: 5 },
    { label: 'Good', percentage: getRatingPercentage(4), rating: 4 },
    { label: 'Average', percentage: getRatingPercentage(3), rating: 3 },
    { label: 'Below Average', percentage: getRatingPercentage(2), rating: 2 },
    { label: 'Poor', percentage: getRatingPercentage(1), rating: 1 },
  ];

  const renderReviewDetail = ({ item }) => {
    // Safety check for undefined item
    if (!item) {
      return null;
    }

    const reviewerName = item.reviewer ? 
      `${item.reviewer.firstName} ${item.reviewer.lastName}` : 
      'Anonymous';
    
    const timeAgo = item.createdAt ? 
      moment(item.createdAt).fromNow() : 
      'Unknown time';
    
    const productTitle = item.product ? item.product.title : 'Product';
    
    // Render stars based on rating
    const renderStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <StarIcon 
            key={i}
            width={13} 
            height={13} 
            fillColor={i <= rating ? colors.buttonColor : 'transparent'}
            strokeColor={colors.buttonColor} 
          />
        );
      }
      return stars;
    };

    return (
      <View style={styles.renderReviewDetail}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), alignItems: "center" }}>
            <Image 
              source={item.reviewer?.profileImage ? 
                { uri: item.reviewer.profileImage } : 
                Images.homeProfile
              } 
              style={styles.profileImage} 
            />
            <View>
              <Text style={styles.nameTimeText}>{reviewerName}</Text>
              <View style={styles.renderStarContainer}>
                {renderStars(item.rating || 0)}
              </View>
            </View>
          </View>
          <Text style={styles.nameTimeText}>{timeAgo}</Text>
        </View>

        <Text style={styles.descriptionText}>{item.comment || 'No comment provided'}</Text>
        
        {/* Show product info if available */}
        {item.product && (
          <View style={{ marginTop: Metrix.VerticalSize(5) }}>
            <Text style={[styles.descriptionText, { fontSize: 12, color: colors.gray }]}>
              For: {productTitle}
            </Text>
          </View>
        )}
      </View>
    )
  }

  // Render stars for average rating
  const renderAverageStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon 
            key={i}
            fillColor={colors.buttonColor} 
            strokeColor={colors.buttonColor} 
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarIcon 
            key={i}
            fillColor={colors.buttonColor} 
            strokeColor={colors.buttonColor} 
          />
        );
      } else {
        stars.push(
          <StarIcon key={i} />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <View style={styles.reviewsContainer}>
        <View style={styles.topContainer}>
          <BackArrowIcon />
          <Text style={styles.topTitle}>Reviews</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.buttonColor} />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.reviewsContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <Text style={styles.topTitle}>Reviews</Text>
      </View>

      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
        <View style={styles.starsContainer}>
          {renderAverageStars(averageRating)}
        </View>
        <Text style={styles.totalReviewsText}>({totalReviews} reviews)</Text>
      </View>

      {/* Review Breakdown - Only show if there are reviews */}
      {totalReviews > 0 && reviewsData.map((item, index) => (
        <View style={styles.reviewRow} key={index}>
          <Text style={styles.reviewLabel}>{item.label}</Text>
          <ProgressBar progress={item.percentage} color={colors.buttonColor} style={styles.progressBar} />
          <Text style={styles.ratingCount}>({ratingBreakdown[item.rating]})</Text>
        </View>
      ))}

      <View style={{ paddingHorizontal: Metrix.HorizontalSize(15) }}>
        <View style={styles.line}></View>
      </View>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <FlatList 
          data={reviews}
          renderItem={renderReviewDetail}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          contentContainerStyle={{ 
            marginTop: Metrix.VerticalSize(15), 
            gap: Metrix.VerticalSize(10), 
            borderBottomWidth: 1, 
            borderColor: colors.borderColor,
            paddingBottom: Metrix.VerticalSize(20)
          }} 
        />
      ) : (
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>No reviews yet</Text>
          <Text style={styles.noReviewsSubText}>You haven't received any reviews from completed deals.</Text>
        </View>
      )}

      <View style={{ paddingHorizontal: Metrix.HorizontalSize(40), marginBottom: Metrix.VerticalSize(5) }}>
        <CustomButton 
          title={"Write reviews"}
          height={Metrix.VerticalSize(48)}
          width={"100%"}
          borderRadius={Metrix.VerticalSize(37)} 
        />
      </View>

    </View>
  );
}
