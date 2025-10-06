import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../../config';
import { BlackBitIcon, CrossIcon, ModalInfoIcon, ModalSuccessLogo, NotificationIcon } from '../../../../assets/svg';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';
import axiosInstance from '../../../../config/axios';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Add custom styles for completed trade
const customStyles = StyleSheet.create({
  completedTradeContainer: {
    marginTop: Metrix.VerticalSize(20),
    backgroundColor: '#fff',
    borderRadius: Metrix.VerticalSize(8),
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: Metrix.VerticalSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  successMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: Metrix.VerticalSize(20),
  }
});

export default function BidsReview() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.login);

  // Log the entire route object to see what we're getting
  console.log("Full route object:", JSON.stringify(route, null, 2));
  console.log("Route params:", JSON.stringify(route.params, null, 2));

  // Destructure with default values and logging
  const { productId, bidId } = route.params || {};
  console.log("Destructured params - productId:", productId, "bidId:", bidId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [bidDetail, setBidDetail] = useState(null);
  const [verifiedTrade, setVerifiedTrade] = useState(null);

  const [modalVisible, setModalVisible] = useState(false)
  const [tradeProceed, setTradeProceed] = useState(false)
  const [buyProceed, setBuyProceed] = useState(false)
  const [transferSgPointsModal, setTransferSgPointsModal] = useState(false)
  const [tradeResponse, setTradeResponse] = useState(null)
  const [tradeLoading, setTradeLoading] = useState(false)
  const [tradeCompleted, setTradeCompleted] = useState(false)
  const [completedTrades, setCompletedTrades] = useState([])
  const [hasUnreviewedTrades, setHasUnreviewedTrades] = useState(false)

console.log("trade id from bids==>>" , tradeResponse?.tradeId)
console.log("bid deatil==>>" , bidDetail)

  const resetStates = useCallback(() => {
    setBuyProceed(false);
  }, []);

  // Check for completed trades that need reviews
  const checkForUnreviewedTrades = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/trades');
      const trades = response.data;
      
      // Filter for completed trades where user is the buyer
      const userCompletedTrades = trades.filter(trade => 
        trade.status === 'COMPLETED' && 
        trade.buyerId === user?.id
      );
      
      setCompletedTrades(userCompletedTrades);
      
      // Check if any completed trades don't have reviews yet
      const unreviewedTrades = [];
      
      for (const trade of userCompletedTrades) {
        try {
          // Check if a review already exists for this trade
          const reviewResponse = await axiosInstance.get(`/api/reviews/product/${trade.productId}`);
          const existingReviews = reviewResponse.data;
          
          // Check if current user has already reviewed this product/trade
          const hasReviewed = existingReviews.some(review => 
            review.reviewerId === user?.id && 
            review.tradeId === trade.id
          );
          
          if (!hasReviewed) {
            unreviewedTrades.push(trade);
          }
        } catch (reviewError) {
          // If we can't check reviews, assume it needs a review
          console.log('Could not check existing reviews for trade:', trade.id);
          unreviewedTrades.push(trade);
        }
      }
      
      setHasUnreviewedTrades(unreviewedTrades.length > 0);
      
      console.log('Completed trades:', userCompletedTrades.length);
      console.log('Unreviewed trades:', unreviewedTrades.length);
      
    } catch (error) {
      console.error('Error checking for unreviewed trades:', error);
    }
  }, [user?.id]);

  // Refresh review check when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      checkForUnreviewedTrades();
    }, [checkForUnreviewedTrades])
  );

  useEffect(() => {
    // console.log("useEffect triggered");
    // console.log("Current route params:", JSON.stringify(route.params, null, 2));

    resetStates();
    checkForUnreviewedTrades(); // Check for completed trades that need reviews

    // Check if we have the required parameters
    if (!route.params) {
      console.log("No route params found");
      setError('Navigation parameters are missing');
      setLoading(false);
      return;
    }


    if (productId && bidId) {
      console.log("Starting to fetch details...");
      fetchDetails();
    } else {
      // console.log("Missing required parameters:", { productId, bidId });
      setError('Missing required parameters');
      setLoading(false);
    }
  }, [resetStates, route.params]);


  const startTrade = async () => {
    try {
      setTradeLoading(true);
      const response = await axiosInstance.post('/api/trades', { bidId: bidDetail.id });
      console.log('Trade response:', response.data);
      // Save the entire response
      setTradeResponse(response.data);
      setTradeLoading(false);
      setTradeProceed(true);
      setModalVisible(false)

    } catch (error) {
      console.error('Error starting trade:', error);
      setTradeLoading(false);
      // Handle error
    }
  }

  const fetchDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching product details for ID:", productId);
      // Fetch product details
      const productResponse = await axiosInstance.get(`/api/products/${productId}`);
      setProductDetail(productResponse.data);

      console.log("productResponse==>>", productResponse.data)
      if (!productResponse.data.activeTrade) {
        setTradeProceed(false)
        setBuyProceed(false)
      }
      if (productResponse.data.activeTrade && productResponse.data.activeTrade?.status === "PENDING") {
        setTradeProceed(true)
      }
      if (productResponse.data.activeTrade && productResponse.data.activeTrade?.status === "VERIFIED") {
        setBuyProceed(true)
        setTradeProceed(true)
      }

      const completedTradeCheck = productResponse.data.bids.map((bid) => {
        if (bid.id == bidId && bid.trades[0]?.status === "COMPLETED") {
          setTradeCompleted(true)
        }
      })

      // Instead of fetching individual bid, get all user bids and find the matching one
      console.log("Fetching user bids to find bid:", bidId);
      const bidsResponse = await axiosInstance.get('/api/bids/user');
      console.log("All bids response:", bidsResponse.data);

      // Find the bid that matches both the bidId and productId
      const matchingBid = bidsResponse.data.find(bid =>
        bid.id === bidId &&
        bid.product?.id === productId
      );

      // console.log("Matching bid search:", {
      //   bidId,
      //   productId,
      //   found: !!matchingBid,
      //   allBids: bidsResponse.data.map(b => ({
      //     id: b.id,
      //     productId: b.product?.id,
      //     amount: b.amount,
      //     status: b.status
      //   }))
      // });

      if (!matchingBid) {
        throw new Error(`Your bid for this product was not found`);
      }

      console.log("Found matching bid:", matchingBid);
      setBidDetail(matchingBid);

    } catch (err) {
      console.error('Error fetching details:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);

      let errorMessage = 'Failed to load details. Please try again later.';
      if (err.response?.status === 404) {
        errorMessage = 'Product or bid not found.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.BidsReviewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.buttonColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.BidsReviewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.redColor, fontFamily: fonts.InterRegular }}>
          {error}
        </Text>
      </View>
    );
  }

  if (!productDetail || !bidDetail) {
    return (
      <View style={[styles.BidsReviewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.redColor, fontFamily: fonts.InterRegular }}>
          No details found
        </Text>
      </View>
    );
  }

  const getInitialLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };


  return (
    <View style={styles.BidsReviewContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <NavBar title={"My Bids"} />
      </View>

      <View style={styles.bidHeader}>
        {
          tradeProceed && !tradeCompleted &&
          <View style={styles.pendingLogo}>
            <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold, color: colors.white }}>Pending to pickup</Text>
          </View>
        }
        <View style={styles.bidHeaderLeft}>
          {productDetail.seller?.profileImage ? (
            <Image
              source={{ uri: productDetail.seller.profileImage }}
              style={styles.profileImage}
            />
          ) : (
            <View style={[styles.profileImage, {
              backgroundColor: '#E8F3FF',
              justifyContent: 'center',
              alignItems: 'center'
            }]}>
              <Text style={{
                fontSize: Metrix.FontLarge,
                fontFamily: fonts.InterBold,
                color: colors.buttonColor,
              }}>
                {getInitialLetter(productDetail.seller?.firstName)}
              </Text>
            </View>
          )}
          <View style={{ flex: 1, marginLeft: Metrix.HorizontalSize(10), marginRight: Metrix.HorizontalSize(10) }}>
            <Text style={styles.titleText} numberOfLines={1}>{productDetail.title}</Text>
            <Text style={styles.subtitleText} numberOfLines={1}>By {productDetail.seller?.firstName} {productDetail.seller?.lastName}</Text>
            <Text style={styles.publishDateText} numberOfLines={1}>
              Published on {new Date(productDetail.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={[styles.bidHeaderRight, { minWidth: Metrix.HorizontalSize(80) }]}>
          <BlackBitIcon width={24} height={24} />
          <Text style={[styles.bitValue, { marginLeft: Metrix.HorizontalSize(5) }]}>{bidDetail.amount}</Text>
        </View>
      </View>

      {/* Review Button for Completed Trades */}
      {hasUnreviewedTrades && completedTrades.length > 0 && (
        <View style={styles.reviewButtonContainer}>
          <CustomButton
            title={`Review ${completedTrades.length} Completed Trade${completedTrades.length > 1 ? 's' : ''}`}
            height={Metrix.VerticalSize(40)}
            width={Metrix.HorizontalSize(280)}
            borderRadius={Metrix.VerticalSize(20)}
            fontSize={Metrix.FontSmall}
            onPress={() => {
              // Navigate to the most recent completed trade for review
              const mostRecentTrade = completedTrades[0];
              navigation.navigate("SubmitReview", {
                tradeId: mostRecentTrade.tradeId || mostRecentTrade.id,
              });
            }}
          />
        </View>
      )}

      <View style={styles.chatContainer}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', gap: Metrix.HorizontalSize(10) }}
          onPress={() => navigation.navigate('ChatDetail', {
            chatUser: {
              id: productDetail.seller?.id,
              name: `${productDetail.seller?.firstName} ${productDetail.seller?.lastName}`,
              image: productDetail.seller?.profileImage
            },
            productInfo: {
              id: productDetail.id,
              title: productDetail.title,
              price: bidDetail.amount,
              image: productDetail.images?.[0]
            }
          })}
        >
          <NotificationIcon />
          <Text style={styles.chatText}>
            Chat With <Text style={styles.redText}>{productDetail.seller?.firstName} {productDetail.seller?.lastName}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bidInfo}>
        <Text style={styles.myBidText}>
          My Bid: <Text style={[
            styles.myBidAcceptedText,
            bidDetail.status === 'REJECTED' && { color: colors.redColor }
          ]}>
            {bidDetail.amount}
          </Text>
        </Text>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.myBidAcceptedText,
            bidDetail.status === 'REJECTED' && { color: colors.redColor }
          ]}>
            {bidDetail.status}
          </Text>
          {bidDetail.status === 'ACCEPTED' && (
            <ModalSuccessLogo width={39} height={39} checkColor={colors.buttonColor} />
          )}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {!tradeCompleted ? (
          <>
            <View style={[styles.buttonWrapper, buyProceed && { backgroundColor: colors.buttonColor, borderWidth: 0 }]}>
              {
                tradeProceed && !tradeCompleted ?
                  <>
                    <Text style={[styles.tradeProgress, buyProceed && { color: colors.white }]}>Trade in Progress...</Text>
                    <View style={styles.infoWrapper}>
                      <ModalInfoIcon IstrokeColor={buyProceed ? colors.white : colors.black} outerStroke={buyProceed ? colors.white : colors.black} />
                      <Text style={[styles.infoText, buyProceed && { color: colors.white }]}>
                        {bidDetail.amount} SG points are on hold. {buyProceed && "until confirm"}
                      </Text>
                    </View>
                  </>
                  :
                  <>
                    <CustomButton
                      title={"Start Trade"}
                      width={Metrix.HorizontalSize(202)}
                      height={Metrix.VerticalSize(44)}
                      borderRadius={Metrix.VerticalSize(25)}
                      fontSize={Metrix.FontLarge}
                      fontFamily={fonts.InterBold}
                      onPress={() => setModalVisible(true)}
                      disabled={bidDetail.status !== 'ACCEPTED' || tradeLoading}
                      backgroundColor={bidDetail.status === 'ACCEPTED' ? colors.buttonColor : colors.grey}
                      color={bidDetail.status === 'ACCEPTED' ? colors.white : '#AFAFAF'}
                    />
                    <View style={styles.infoWrapper}>
                      <ModalInfoIcon IstrokeColor={colors.black} />
                      <Text style={[styles.infoText, { flex: 1, }]} numberOfLines={2}>
                        {bidDetail.status === 'ACCEPTED'
                          ? "Click to start the trade process"
                          : "Your bid is pending. Wait for seller's acceptance."}
                      </Text>
                    </View>
                  </>
              }
            </View>

            <View style={[styles.confirmWrapper, buyProceed && { backgroundColor: "#EEEDEF" }]}>
              {
                !buyProceed ?
                  <>
                    <CustomButton
                      title={"Confirm Buy"}
                      width={Metrix.HorizontalSize(202)}
                      height={Metrix.VerticalSize(44)}
                      borderRadius={Metrix.VerticalSize(25)}
                      fontSize={Metrix.FontLarge}
                      fontFamily={fonts.InterBold}
                      backgroundColor={verifiedTrade ? colors.buttonColor : "#D2D2D2"}
                      color={verifiedTrade ? colors.white : '#AFAFAF'}
                      disabled={!verifiedTrade}
                      onPress={() => {
                        setBuyProceed(true)
                        setModalVisible(true)
                      }}
                    />
                    <View style={styles.confirmInfoWrapper}>
                      <ModalInfoIcon IstrokeColor={!verifiedTrade ? "#646464" : colors.black} outerStroke={!verifiedTrade ? "#646464" : colors.black} />
                      {
                        !verifiedTrade ?
                          <Text style={[styles.confirmInfoText, { color: "#646464" }]}>
                            You need a verified trade to proceed with your purchase.
                          </Text>
                          :
                          <Text style={[styles.confirmInfoText, { width: "90%" }]}>
                            You need to confirm buy to share your Trade ID with seller to transfer points & then pick up your item.
                          </Text>
                      }
                    </View>
                  </>
                  :
                  <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                    <View>
                      <Text style={{ fontSize: Metrix.FontLarge, fontFamily: fonts.InterBold, color: colors.buttonColor, textAlign: "center" }}>Confirm Buy</Text>
                      <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, }}>I have got this Share Trade ID# </Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(7), alignItems: "center" }}>
                      <ModalInfoIcon outerStroke="#646464"
                        IstrokeColor='#646464' />
                      <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, color: "#646464" }}>You need to confirm buy to transfer points & then pick up your item.</Text>
                    </View>
                  </TouchableOpacity>
              }
            </View>
          </>
        ) : (
          <View style={customStyles.completedTradeContainer}>
            <View style={customStyles.successMessageContainer}>
              <ModalSuccessLogo width={50} height={50} checkColor={colors.buttonColor} />
              <Text style={{ fontSize: Metrix.FontLarge, fontFamily: fonts.InterBold, color: colors.buttonColor, textAlign: "center", marginTop: Metrix.VerticalSize(10) }}>
                Trade Completed
              </Text>
              <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular, textAlign: "center", marginTop: Metrix.VerticalSize(5) }}>
                {bidDetail.amount} SG points have been transferred to the seller.
              </Text>
              <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular, color: "#646464", textAlign: "center", marginTop: Metrix.VerticalSize(15) }}>
                Trade ID: <Text style={{ fontFamily: fonts.InterBold }}>{tradeResponse?.tradeId}</Text>
              </Text>
            </View>
          </View>
        )}
      </View>


      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <CrossIcon />
            </TouchableOpacity>

            <View style={styles.modalContentWrapper}>
              <BlackBitIcon width={64} height={64} />
              <Text style={styles.modalSmallText}>Upon Clicking Proceed</Text>
              {!buyProceed ? (
                <>
                  <View>
                    <Text style={styles.modalRegularText}>Your {bidDetail.amount} SG Points</Text>
                    <Text style={styles.modalSmallBoldText}>
                      will be placed on hold, Until you confirm buy
                    </Text>
                  </View>

                  <Text style={styles.tradeIdText}>
                    Trade ID# <Text style={styles.tradeIdHighlight}>{productDetail.activeTrade?.tradeId || 'Loading...'}</Text>
                  </Text>

                  <CustomButton
                    title={"PROCEED"}
                    backgroundColor={colors.yellowColor}
                    height={Metrix.VerticalSize(36)}
                    width={Metrix.HorizontalSize(193)}
                    borderRadius={Metrix.VerticalSize(35)}
                    fontSize={Metrix.FontSmall}
                    fontFamily={fonts.InterBold}
                    onPress={startTrade}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.tradeIdText}>
                    Trade ID# <Text style={styles.tradeIdHighlight}>{productDetail.activeTrade?.tradeId || 'Loading...'}</Text>
                  </Text>

                  <Text style={styles.modalCenterText}>
                    will be sent to the Seller which the seller will use to claim
                    the {bidDetail.amount} SG point that are on hold.
                  </Text>

                  <CustomButton
                    title={"PROCEED"}
                    backgroundColor={colors.yellowColor}
                    height={Metrix.VerticalSize(36)}
                    width={Metrix.HorizontalSize(193)}
                    borderRadius={Metrix.VerticalSize(35)}
                    fontSize={Metrix.FontSmall}
                    fontFamily={fonts.InterBold}
                    onPress={async () => {
                      try {
                        setTradeLoading(true);
                        // Get the trade ID from either tradeResponse or productDetail.trades
                        const tradeId = tradeResponse?.id || (productDetail.trades && productDetail.trades.length > 0 && productDetail.trades[0].id);

                        if (!tradeId) {
                          console.error('No trade ID found to complete trade');
                          setTradeLoading(false);
                          return;
                        }

                        // Call the complete trade API
                        const response = await axiosInstance.post(`/api/trades/${tradeId}/complete`);
                        console.log('Trade completion response:', response.data);

                        // Update the UI state
                        setTradeCompleted(true);
                        setModalVisible(false);
                        setTransferSgPointsModal(true);

                        // Refresh product details to show updated status
                        fetchDetails();

                        setTradeLoading(false);
                      } catch (error) {
                        console.error('Error completing trade:', error);
                        setTradeLoading(false);
                        // Handle error
                      }
                    }}
                    disabled={tradeLoading}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal 2 */}
      <Modal visible={transferSgPointsModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, styles.modalGap]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setTransferSgPointsModal(!transferSgPointsModal)}
            >
              <CrossIcon />
            </TouchableOpacity>

            <ModalSuccessLogo checkColor={colors.buttonColor} />
            <View>
              <Text style={styles.transferText}>
                SG Points <Text style={styles.tradeIdHighlight}>{bidDetail.amount}</Text>
              </Text>
              <Text style={styles.modalSmallCenterText}>
                Transferred to Seller.
              </Text>
              <Text style={styles.thanksText}>
                Thanks you for using <Text style={styles.thanksTextInner}>ShareGarden.</Text>
              </Text>
            </View>

            <Text style={styles.tradeIdText}>
              Trade ID# <Text style={styles.tradeIdHighlight}>{productDetail.activeTrade?.tradeId || 'Loading...'}</Text>
            </Text>

            <CustomButton
              title={"Rate & Reviews Seller"}
              height={Metrix.VerticalSize(36)}
              width={Metrix.HorizontalSize(261)}
              borderRadius={Metrix.VerticalSize(35)}
              fontSize={Metrix.FontSmall}
              onPress={() => {
                console.log("=== BidsReview Navigation Debug ===");
                console.log("tradeResponse:", tradeResponse);
                console.log("tradeResponse?.tradeId:", tradeResponse?.tradeId);
                console.log("tradeResponse?.id:", tradeResponse?.id);
                console.log("productDetail.activeTrade:", productDetail.activeTrade);
                console.log("productDetail.activeTrade?.tradeId:", productDetail.activeTrade?.tradeId);
                console.log("productDetail.activeTrade?.id:", productDetail.activeTrade?.id);
                console.log("===================================");
                
                // Use the active trade from productDetail if tradeResponse doesn't have tradeId
                const tradeIdToPass = tradeResponse?.tradeId || 
                                   tradeResponse?.id || 
                                   productDetail.activeTrade?.tradeId || 
                                   productDetail.activeTrade?.id;
                
                console.log("Final tradeId being passed:", tradeIdToPass);
                
                if (!tradeIdToPass) {
                  Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Trade ID not found. Cannot submit review.'
                  });
                  return;
                }
                
                navigation.navigate("SubmitReview", {
                  tradeId: tradeIdToPass,
                });
              }}

            />
          </View>
        </View>
      </Modal>
    </View>


  );
}

