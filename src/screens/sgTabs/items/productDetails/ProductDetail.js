import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, Dimensions, TextInput, TouchableOpacity, Linking, StyleSheet, Alert, Share, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Images, Metrix } from '../../../../config';
import styles from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';
import axiosInstance from '../../../../config/axios';
import { useSelector } from 'react-redux';
import { BlackBitIcon, CallIcon, CashIcon, CrossIcon, HandShakeIcon, LikesIcon, NotificationIcon, ShareIcon, SpeakerIcon, TimeIcon } from '../../../../assets/svg';
import { Modal } from 'react-native';
import Toast from 'react-native-toast-message';
import ProductActivityModal from '../../../../components/ProductActivityModal/ProductActivityModal';


const ProductDetail = ({ route, navigation }) => {
  // Handle both route params and deep link params
  const { item, id } = route.params;
  const productId = id || (item ? item.id : null);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize time states with 0
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Add new state for tracking favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  // Add these new states near other state declarations
  const [isBidModalVisible, setIsBidModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState(null);

  // Add states for activity modals
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showSharesModal, setShowSharesModal] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [productStats, setProductStats] = useState({ views: 0, likes: 0, shares: 0, favorites: 0 });
  const [isLiked, setIsLiked] = useState(false);

  const images = [Images.homePopularListing, Images.homeProfile, Images.homePopularListing,]

  const { width } = Dimensions.get('window');

  const { user } = useSelector((state) => state.login);

  const viewIncremented = useRef(false);


  const getDisplayCondition = (condition) => {
    switch (condition) {
      case 'FAIRLY_USED':
        return 'Fairly Used';
      case 'GOOD':
        return 'Good';
      case 'EXCELLENT':
        return 'Excellent';
      default:
        return condition;
    }
  };

  const calculateTimeRemaining = (durationInSeconds) => {
    const clampedDuration = Math.max(0, durationInSeconds); // Prevent negatives

    const days = Math.floor(clampedDuration / (24 * 60 * 60));
    const hours = Math.floor((clampedDuration % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((clampedDuration % (60 * 60)) / 60);
    const seconds = clampedDuration % 60;

    return { days, hours, minutes, seconds };
  };

  const fetchProductDetail = async () => {
    if (!productId) {
      console.error('No product ID available');
      setLoading(false);
      return;
    }

    if (loading) {
      console.log('Already loading product details, skipping...');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/products/${productId}`);
      setProductDetail(response.data);
      
      // Set initial favorite and like status if your API returns this information
      setIsFavorite(response.data.isFavorited || false);
      setIsLiked(response.data.isLiked || false);
      
      // Update stats from API response
      if (response.data.stats) {
        setProductStats(response.data.stats);
      } else {
        // Fallback to individual fields if stats object doesn't exist
        setProductStats({
          views: response.data.viewCount || 0,
          likes: response.data.likeCount || 0,
          shares: response.data.shareCount || 0,
          favorites: response.data.favoriteCount || 0
        });
      }

      console.log("Product Detail response", response.data);

      // Update time if it's a bidding product
      if (response.data.isSGPoints && response.data.bidDuration) {
        const bidEndTime = new Date(response.data.bidEndTime);
        const now = new Date();
        const durationInSeconds = Math.floor((bidEndTime - now) / 1000);
        const timeRemaining = calculateTimeRemaining(durationInSeconds);
        setDays(timeRemaining.days);
        setHours(timeRemaining.hours);
        setMinutes(timeRemaining.minutes);
        setSeconds(timeRemaining.seconds);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product details and update time
  useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  // Update countdown timer every second
  useEffect(() => {
    if (!productDetail?.isSGPoints) return;

    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds, productDetail?.isSGPoints]);

  // Use productDetail if available, otherwise fallback to item
  const displayData = productDetail || item;

  useEffect(() => {
    const incrementProductView = async () => {
      try {
        // Only increment view if viewer is not the seller and hasn't been incremented yet
        if (user?.id !== displayData?.seller?.id && !viewIncremented.current && displayData?.id) {
          await axiosInstance.post(`/api/products/${displayData.id}/views`);
          viewIncremented.current = true; // Mark as incremented
        }
      } catch (error) {
        console.log('Error incrementing view:', error);
      }
    };

    // Only call if we have both user and product data, and view hasn't been incremented
    if (user && displayData?.id && !viewIncremented.current) {
      incrementProductView();
    }
  }, [user?.id, displayData?.id]); // Only depend on user ID and product ID

  // Add function to handle favorite toggle
  const handleFavoritePress = async () => {
    try {
      const response = await axiosInstance.post(`/api/products/favorites/${productId}`);
      if (response.status === 200) {
        setIsFavorite(!isFavorite); // Toggle favorite status
        
        // Update local stats
        const newStats = {
          ...productStats,
          favorites: isFavorite ? productStats.favorites - 1 : productStats.favorites + 1
        };
        setProductStats(newStats);
        
        // Show success feedback
        Toast.show({
          type: 'success',
          text1: isFavorite ? 'Removed from favorites' : 'Added to favorites',
          text2: response.data.message
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Show error message to user
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to update favorite status'
      });
    }
  };

  // Add function to handle product sharing
  const handleSharePress = async () => {
    try {
      // Use hosted web URL that redirects to app
      const webLink = `https://sharegardendeeplink-s3xe.vercel.app/product.html?id=${productId}`;

      const shareMessage = `Check out this amazing product on ShareGarden!\n\n${displayData.title}\n\n${displayData.description}\n\nPrice: ${displayData.isSGPoints ? `${displayData.minBid} SG Points` : `$${displayData.price}`}\n\nCondition: ${getDisplayCondition(displayData.condition)}\n\nSeller: ${displayData.seller?.firstName || ''} ${displayData.seller?.lastName || ''}\n\nView in ShareGarden app:\n${webLink}`;

      const result = await Share.share({
        message: shareMessage,
        title: displayData.title,
        url: webLink, // Add URL for better sharing on iOS
      });

      if (result.action === Share.sharedAction) {
        // Optionally increment share count on your backend
        try {
          await axiosInstance.post(`/api/products/${productId}/shares`);
          // Update local stats
          const newStats = {
            ...productStats,
            shares: productStats.shares + 1
          };
          setProductStats(newStats);
        } catch (error) {
          if (error?.response?.status === 404) {
            // Endpoint does not exist, ignore
            console.log('Share count endpoint not implemented on backend. Skipping.');
          } else {
            console.log('Error incrementing share count:', error);
          }
        }
      }
    } catch (error) {
      console.log('Error sharing product:', error);
      Alert.alert('Error', 'Failed to share product. Please try again.');
    }
  };

  // Add handler functions for activity modals
  const handleShowLikes = () => {
    setShowLikesModal(true);
  };

  const handleShowShares = () => {
    setShowSharesModal(true);
  };

  const handleShowFavorites = () => {
    setShowFavoritesModal(true);
  };

  const handleStatsUpdate = (newStats) => {
    setProductStats(newStats);
  };

  // Add like handler
  const handleLikePress = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axiosInstance.post(`/api/products/${productId}/like`);
      
      if (response.data.isLiked !== undefined) {
        setIsLiked(response.data.isLiked);
        const newStats = {
          ...productStats,
          likes: response.data.isLiked ? productStats.likes + 1 : productStats.likes - 1
        };
        setProductStats(newStats);
        
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
    }
  };

  // Add this function near the top of your component
  const getInitialLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Add these new functions before the return statement
  const handleBidSubmit = async () => {
    // Add debug logs
    console.log('Product details for bidding:', {
      id: displayData.id,
      isSGPoints: displayData.isSGPoints,
      isBidding: displayData.isBidding,
      status: displayData.status,
      bidStartTime: displayData.bidStartTime,
      bidEndTime: displayData.bidEndTime,
      minBid: displayData.minBid,
      highestBid: displayData.highestBid
    });

    // Basic validation
    if (!bidAmount || isNaN(bidAmount) || parseInt(bidAmount) <= 0) {
      setBidError('Please enter a valid bid amount');
      return;
    }

    // Check if product is still active for bidding
    if (!displayData?.isSGPoints || !displayData?.isBidding) {
      setBidError('This product is not open for bidding');
      return;
    }

    // Check if bidding has ended
    if (displayData?.bidEndTime && new Date(displayData.bidEndTime) < new Date()) {
      setBidError('Bidding has ended for this product');
      return;
    }

    // Check if bidding has started
    if (displayData?.bidStartTime && new Date(displayData.bidStartTime) > new Date()) {
      setBidError('Bidding has not started yet');
      return;
    }

    // Check if user is trying to bid on their own product
    if (displayData?.sellerId === user?.id) {
      setBidError('You cannot bid on your own product');
      return;
    }

    // Check if bid meets minimum bid requirement
    if (parseInt(bidAmount) < displayData?.minBid) {
      setBidError(`Bid must be at least ${displayData.minBid} SG Points`);
      return;
    }

    // Check if bid is higher than current highest bid
    if (displayData?.highestBid && parseInt(bidAmount) <= displayData.highestBid) {
      setBidError(`Bid must be higher than current highest bid of ${displayData.highestBid} SG Points`);
      return;
    }

    try {
      setBidLoading(true);
      setBidError(null);

      console.log('Submitting bid with data:', {
        productId: displayData.id,
        amount: parseInt(bidAmount)
      });

      const response = await axiosInstance.post('/api/bids', {
        productId: displayData.id,
        amount: parseInt(bidAmount)
      });

      console.log('Bid response:', response.data);

      // Show success message and close modal
      setIsBidModalVisible(false);
      setBidAmount('');

      // Refresh product details to show updated bid
      fetchProductDetail();

      // Show success message
      Toast.show({
          type: "success",
          text1: "Your bid has been placed successfully!"
        })
    } catch (err) {
      // console.error('Error placing bid:', err);
      // Log the full error response
      if (err.response) {
        Toast.show({
          type: "error",
          text1: err.response.data.message
        })
        // console.error('Error response:', err.response.data);
      }
      // Handle specific error messages from the backend
      const errorMessage = err.response?.data?.message || 'Failed to place bid. Please try again.';
      setBidError(errorMessage);
    } finally {
      setBidLoading(false);
    }
  };

  const handlePurchaseRequest = () => {
    setPurchaseModalVisible(true);
  };

  // Add this function to check if bidding is allowed
  const isBiddingAllowed = () => {
    if (!displayData?.isSGPoints || !displayData?.isBidding) return false;
    if (displayData?.bidEndTime && new Date(displayData.bidEndTime) < new Date()) return false;
    if (displayData?.bidStartTime && new Date(displayData.bidStartTime) > new Date()) return false;
    if (displayData?.sellerId === user?.id) return false;
    return true;
  };

  // Add this function to check if user is seller
  const isUserSeller = () => {
    return displayData?.sellerId === user?.id;
  };

  return (
    <KeyboardAwareScrollView style={styles.ProductDetailcontainer} contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(15) }} keyboardShouldPersistTaps="handled">
      <View style={styles.NavBarContainer}>
        <View style={styles.BackArrowContainer}>
          <BackArrowIcon />
        </View>
        <View style={styles.NavBarWrapper}>
          <NavBar />
        </View>
      </View>

      <View style={styles.HeaderContainer}>
        <Text style={styles.title}>{displayData.title}</Text>
        <View style={styles.PriceContainer}>
          {displayData.isSGPoints ? <BlackBitIcon width={25} height={26} /> : <CashIcon width={25} height={26} />}

          <Text style={styles.price}>
            {displayData.isSGPoints ? displayData.minBid : displayData.price}
          </Text>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.middleTopContainer}>
          <View>
            <FlatList
              data={displayData.images ? displayData.images.split(',') : images}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={(event) => {
                const offsetX = event.nativeEvent.contentOffset?.x ?? 0;
                const index = Math.round(offsetX / width);
                setActiveIndex(index);
              }}
              style={styles.imageSlider}
              renderItem={({ item: imageUrl }) => (
                <Image
                  source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                  style={styles.productImage}
                />
              )}
            />
            <View style={styles.dotContainer}>
              {displayData.images ?
                displayData.images.split(',').map((_, index) => (
                  <View key={index} style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]} />
                ))
                :
                images.map((_, index) => (
                  <View key={index} style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]} />
                ))
              }
            </View>
            <View style={styles.FeaturedContainer}>
              <Text style={styles.featuredText}>Featured</Text>
              <View style={styles.IconContainer}>
                <TouchableOpacity onPress={handleLikePress}>
                  <LikesIcon stroke={colors.white} fill={isLiked ? colors.white : 'none'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavoritePress}>
                  <LikesIcon stroke={colors.white} fill={isFavorite ? colors.white : 'none'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSharePress}>
                  <ShareIcon stroke={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.middleTopDescriptionContainer}>
            <Text>{displayData.description}</Text>
            <Text style={styles.condition}>
              Condition: {getDisplayCondition(displayData.condition)}
            </Text>
          </View>

          {displayData.isSGPoints && (
            <>
              <View style={styles.linecontainer}>
                <View style={styles.circle} />
                <View style={styles.dottedLine} />
                <View style={styles.circle} />
              </View>

              <View style={styles.middleTopBottomContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(20) }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
                    <SpeakerIcon />
                    <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold }}>Place a bid</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
                    <TimeIcon stroke={colors.black} width={12} height={12} />
                    <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterSemiBold }}>Bid duration</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(15) }}>
                  <View style={{ height: Metrix.VerticalSize(48), width: Metrix.HorizontalSize(100), borderWidth: 1, borderColor: "#E6E6E6", justifyContent: "center", alignItems: "center", borderRadius: Metrix.VerticalSize(3) }}>
                    <Text style={{ fontSize: Metrix.FontLarge, fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                      {displayData.highestBid || displayData.minBid}
                    </Text>
                  </View>

                  <View style={styles.timerRow}>
                    {[
                      { label: "Days", value: days },
                      { label: "Hours", value: hours },
                      { label: "Minutes", value: minutes },
                      { label: "Seconds", value: seconds },
                    ].map((timeItem, index) => (
                      <View key={index} style={styles.inputContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Text style={styles.input}>
                            {String(timeItem.value).padStart(2, '0')}
                          </Text>
                          {index < 3 && <Text style={styles.separator}>:</Text>}
                        </View>
                        <Text style={styles.label}>{timeItem.label}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </>
          )}

          <View style={{ paddingHorizontal: Metrix.HorizontalSize(15), marginTop: Metrix.VerticalSize(18) }}>
            {(displayData.isSGPoints || displayData.isBidding) ? (
              <CustomButton
                title={isUserSeller() ? "YOU ARE THE SELLER" : (isBiddingAllowed() ? "PLACE BID" : "BIDDING ENDED")}
                height={Metrix.VerticalSize(46)}
                width={"100%"}
                borderRadius={Metrix.VerticalSize(3)}
                fontSize={Metrix.FontSmall}
                onPress={() => setIsBidModalVisible(true)}
                disabled={!isBiddingAllowed() || isUserSeller()}
                backgroundColor={isBiddingAllowed() && !isUserSeller() ? colors.buttonColor : colors.grey}
              />
            ) : (
              <CustomButton
                title={isUserSeller() ? "YOU ARE THE SELLER" : "I WANT TO PURCHASE THIS"}
                height={Metrix.VerticalSize(46)}
                width={"100%"}
                borderRadius={Metrix.VerticalSize(3)}
                fontSize={Metrix.FontSmall}
                onPress={handlePurchaseRequest}
                disabled={isUserSeller()}
                backgroundColor={isUserSeller() ? colors.grey : colors.buttonColor}
              />
            )}
          </View>
        </View>

        <View style={styles.middleMidContainer}>
          {displayData.isSGPoints ? (
            <>
              <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                Total Bids: <Text style={{ color: colors.black }}>{displayData._count?.bids || 0}</Text>
              </Text>
              <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                Highest Bid: <Text style={{ color: colors.black }}>{displayData.highestBid || 0}</Text>
              </Text>
              {/* <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                Status: <Text style={{ color: colors.black }}>{displayData.status || 'Active'}</Text>
              </Text> */}
            </>
          ) : (
            <>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <TouchableOpacity 
                  onPress={isUserSeller() ? handleShowLikes : null}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Metrix.VerticalSize(5) }}
                >
                  <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                    Total Views: <Text style={{ color: colors.black }}>{productStats.views || displayData.viewCount || 0}</Text>
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={isUserSeller() ? handleShowLikes : null}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Metrix.VerticalSize(5) }}
                >
                  <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                    Likes: <Text style={{ color: colors.black }}>{productStats.likes || 0}</Text>
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={isUserSeller() ? handleShowShares : null}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Metrix.VerticalSize(5) }}
                >
                  <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                    Shares: <Text style={{ color: colors.black }}>{productStats.shares || 0}</Text>
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={isUserSeller() ? handleShowFavorites : null}
                  style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Metrix.VerticalSize(5) }}
                >
                  <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                    Saves: <Text style={{ color: colors.black }}>{productStats.favorites || 0}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.middleBottomContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
            {displayData.seller?.profileImage ? (
              <Image
                source={{ uri: displayData.seller.profileImage }}
                style={{ width: Metrix.HorizontalSize(64), height: Metrix.HorizontalSize(64), borderRadius: Metrix.HorizontalSize(32) }}
              />
            ) : (
              <View style={{
                width: Metrix.HorizontalSize(64),
                height: Metrix.HorizontalSize(64),
                borderRadius: Metrix.HorizontalSize(32),
                backgroundColor: '#E8F3FF', // Light blue background
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{
                  fontSize: Metrix.FontExtraLarge,
                  fontFamily: fonts.InterBold,
                  color: colors.buttonColor, // Using your theme's button color
                }}>
                  {getInitialLetter(displayData.seller?.firstName)}
                </Text>
              </View>
            )}
            <View>
              <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>
                Posted by | SG Member
              </Text>
              <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterRegular, color: colors.buttonColor }}>
                {`${displayData.seller?.firstName || ''} ${displayData.seller?.lastName || ''}`}
              </Text>
              <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}>
                Published on {new Date(displayData.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ChatDetail', {
              chatUser: {
                id: displayData.seller?.id,
                name: displayData.seller?.name || 'Seller',
                image: displayData.seller?.profileImage
              },
              productInfo: productDetail
              //  {
              //   id: displayData.id,
              //   title: displayData.title,
              //   price: displayData.price,
              //   image: displayData.images?.[0]
              // }
            })}
          >
            <NotificationIcon />
          </TouchableOpacity>

        </View>
      </View>


      <Modal
        visible={isModalVisible} transparent animationType="fade"
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <CrossIcon />
          </TouchableOpacity>

          <HandShakeIcon />

          <Text style={styles.modalTitle}>Thank you for your interest.</Text>

          <Text style={styles.modalText}>
            You can make payment and Pick up arrangements by contacting seller via chat
          </Text>

          <CustomButton
            title="START CHAT"
            height={Metrix.VerticalSize(46)}
            width={"100%"}
            borderRadius={Metrix.VerticalSize(3)}
            fontSize={Metrix.FontSmall}
            // onPress={handleStartChat}
            icon={<NotificationIcon stroke="#fff" style={{ marginLeft: 10 }} />}
            iconPosition="right"
          />

          <Text style={styles.modalFooter}>
            Thanks for using <Text style={styles.brandText}>ShareGarden</Text>.
          </Text>
        </View>
      </Modal>

      <Modal
        visible={isBidModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsBidModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setIsBidModalVisible(false);
                setBidAmount('');
                setBidError(null);
              }}
            >
              <CrossIcon />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Place Your Bid</Text>

            {bidError && (
              <Text style={styles.errorText}>{bidError}</Text>
            )}

            <TextInput
              style={[
                styles.bidInput,
                bidError && styles.bidInputError
              ]}
              value={bidAmount}
              onChangeText={(text) => {
                setBidAmount(text);
                setBidError(null);
              }}
              keyboardType="numeric"
              placeholder="Enter bid amount"
              placeholderTextColor={colors.grey}
            />

            <CustomButton
              title={bidLoading ? "PLACING BID..." : "BID NOW"}
              height={Metrix.VerticalSize(46)}
              width={"100%"}
              borderRadius={Metrix.VerticalSize(3)}
              fontSize={Metrix.FontSmall}
              onPress={handleBidSubmit}
              disabled={bidLoading}
              backgroundColor={bidLoading ? colors.grey : colors.buttonColor}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={purchaseModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPurchaseModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPurchaseModalVisible(false)}
            >
              <CrossIcon />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <HandShakeIcon />
              <Text style={styles.modalTitle}>Alert sent to seller!</Text>
            </View>

            <Text style={styles.modalText}>
              You can make payment and pickup arrangements by contacting seller via chat
            </Text>

            <CustomButton
              title="START CHAT"
              height={Metrix.VerticalSize(46)}
              width={"100%"}
              borderRadius={Metrix.VerticalSize(3)}
              fontSize={Metrix.FontSmall}
              onPress={() => {
                setPurchaseModalVisible(false);
                navigation.navigate('ChatDetail', {
                  chatUser: {
                    id: displayData.seller?.id,
                    name: displayData.seller?.name || 'Seller',
                    image: displayData.seller?.profileImage
                  },
                  productInfo: productDetail
                  // {
                  //   id: displayData.id,
                  //   title: displayData.title,
                  //   price: displayData.price,
                  //   image: displayData.images?.[0]
                  // }
                });
              }}
              icon={<NotificationIcon stroke="#fff" style={{ marginLeft: 10 }} />}
              iconPosition="right"
            />
          </View>
        </View>
      </Modal>


      {/* Activity Modals */}
      <ProductActivityModal
        visible={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        productId={productId}
        activityType="like"
        title="Who Liked This Product"
      />

      <ProductActivityModal
        visible={showSharesModal}
        onClose={() => setShowSharesModal(false)}
        productId={productId}
        activityType="share"
        title="Who Shared This Product"
      />

      <ProductActivityModal
        visible={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        productId={productId}
        activityType="favorite"
        title="Who Saved This Product"
      />
    </KeyboardAwareScrollView>
  );
};

export default ProductDetail;