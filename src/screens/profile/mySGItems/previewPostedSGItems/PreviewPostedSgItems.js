import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal } from 'react-native';
import { styles } from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { BlackBitIcon, CrossIcon, DownArrowIcon, LikesIcon, ModalInfoIcon, NotificationIcon, RightArrowIcon, ShareIcon, TimeIcon, ViewsIcon } from '../../../../assets/svg';
import { Colors, Images, Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';
import CustomInput from '../../../../components/customInput/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axiosInstance from '../../../../config/axios';
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ToastAndroid, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';



const requestBuyData = [
  {
    name: "Terry Lance",
    amount: 2000
  },
  {
    name: "Pushpa jhukega nh sala",
    amount: 1800
  },
  {
    name: "Ghajni",
    amount: 1600
  },
]

export default function PreviewPostedSgItems({ navigation, route }) {

  const { item } = route.params

  const [viewItemsDetails, setViewItemsDetails] = useState(false)
  const [viewBidsDetails, setViewBidsDetails] = useState(false)
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [acceptState, setAcceptState] = useState({})
  const [declineState, setDeclineState] = useState({});
  const [tradeId, setTradeId] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productDetail, setProductDetail] = useState([])
  const [productInfo, setProductInfo] = useState(null)
  const [sgId, setSgId] = useState('')
  const [bidTradeMap, setBidTradeMap] = useState({}) // Map to track which bids have trades


  console.log("tradeid==>>",tradeId)

  const calculateTimeRemaining = (bidEndTime) => {
    const now = new Date();
    const endTime = new Date(bidEndTime);
    const difference = endTime - now;

    if (difference <= 0) {
      return {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days: days.toString().padStart(2, '0'),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const updateTimer = useCallback(() => {
    if (productInfo?.bidEndTime) {
      const timeRemaining = calculateTimeRemaining(productInfo.bidEndTime);
      setDays(timeRemaining.days);
      setHours(timeRemaining.hours);
      setMinutes(timeRemaining.minutes);
      setSeconds(timeRemaining.seconds);
    }
  }, [productInfo?.bidEndTime]);

  // useEffect(() => {
  //   updateTimer();
  //   const timer = setInterval(updateTimer, 1000);
  //   return () => clearInterval(timer);
  // }, [updateTimer]);

  const fetchProductDetail = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/api/products/${item.id}`);
      // Store both product info and bids
      setProductInfo(response.data);
      setProductDetail(response.data.bids);

      // Create a map of bidId to trade for quick lookup
      if (response.data.trades && response.data.trades.length > 0) {
        const tradeMap = {};
        response.data.trades.forEach(trade => {
          tradeMap[trade.bidId] = trade;
        });
        setBidTradeMap(tradeMap);


      }
      if(response.data.trades[0]?.tradeId){
        setTradeId(true)
      }else{
        setTradeId(false)
      }

      console.log("Product Detail Bid response", response.data);
      // console.log("Trades response:", response.data.trades);
      console.log("Bid End Time:", response.data.bidEndTime);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch product details and update time
  useEffect(() => {
    fetchProductDetail();
  }, [item.id]);

  const handleDeclinePress = async (idx) => {
    setDeclineState((prevState) => ({
      ...prevState,
      [idx]: true,
    }));

    try {
      const response = await axiosInstance.post(`/api/bids/${productDetail[idx].id}/reject`);
      console.log("reject bid ==>>", response.data);
      // Fetch updated product details after successful decline
      await fetchProductDetail();
    } catch (error) {
      console.error("Error rejecting bid:", error);
      // Reset decline state on error
      setDeclineState((prevState) => ({
        ...prevState,
        [idx]: false,
      }));
    }
  }



  const handleAcceptPress = async (idx) => {

    setAcceptState((prevState) => ({
      ...prevState,
      [idx]: true,
    }));
    // console.log("====>>>", productDetail[idx].bidderId)
    try {
      const response = await axiosInstance.post(`/api/bids/${productDetail[idx].id}/accept`);
      console.log("accept bid ==>>", response.data)
      return response.data; // Handle the response as needed
    } catch (error) {
      console.error("Error accepting bid:", error);
      throw error; // Re-throw the error to handle it later if necessary
    }

  };

  const renderRequestBitData = (item, index) => {
    // Check if there's a trade for this bid
    const matchingTrade = bidTradeMap[item.id];
    const hasTrade = !!matchingTrade;
    const tradeIsPending = hasTrade && matchingTrade.status === 'PENDING';

    return (
      <View key={index} style={[styles.container, item.status === "ACCEPTED" || acceptState[index] ? styles.containerAccepted : null]}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {item.bidder.profileImage ?
              <Image source={{ uri: item.bidder.profileImage }} style={styles.profileImage} />
              :
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
                  {item.bidder.firstName ? item.bidder.firstName.charAt(0).toUpperCase() : '?'}
                </Text>
              </View>
            }
            <View>
              <Text style={styles.bidText}>Bid by</Text>
              <Text style={styles.bidName}>{item.bidder.firstName}{" "}{item.bidder.lastName} </Text>
            </View>
          </View>

          <View style={styles.notificationContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', {
              chatUser: {
                id: item.bidder.id,
                name: `${item.bidder.firstName} ${item.bidder.lastName}`,
                image: item.bidder.profileImage
              },
              productInfo: {
                title: productInfo?.title || item.title,
                price: productInfo?.minBid || item.minBid,
                image: productInfo?.images?.split(',')[0] || item.images?.split(',')[0]
              }
            })}>
              <NotificationIcon stroke={colors.buttonColor} width={24} height={24} />
            </TouchableOpacity>
            <View style={styles.bidAmountContainer}>
              <BlackBitIcon width={24} height={24} />
              <Text style={styles.bidAmount}>{item.amount}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.actionContainer, acceptState[index] && styles.actionContainerAccepted]}>
          {item.status === 'REJECTED' || declineState[index] ? (
            <CustomButton
              height={Metrix.VerticalSize(36)}
              flex={1}
              borderRadius={Metrix.VerticalSize(4)}
              title={"DECLINED"}
              backgroundColor={colors.redColor}
              fontSize={Metrix.FontSmall}
            />
          ) : (
            <>
              {item.status === 'ACCEPTED' || acceptState[index] ? (
                <View style={styles.statusContainer}>
                  <Text style={styles.bidStatus}>
                    Bid Status: <Text style={styles.statusAccepted}>Accepted</Text>
                  </Text>
                  <CustomButton
                    title={"COPY TRADE ID"}
                    fontSize={Metrix.FontSmall}
                    fontFamily={fonts.InterBold}
                    color={hasTrade ? colors.white : '#A39696'}
                    width={Metrix.HorizontalSize(144)}
                    height={Metrix.VerticalSize(36)}
                    backgroundColor={hasTrade ? colors.yellowColor : "#C4C4C4"}
                    borderRadius={Metrix.VerticalSize(4)}
                    disabled={!hasTrade || !tradeIsPending}
                    onPress={() => {
                      console.log("check==>>",item.trades[0].tradeId)
                      if (item.trades.length > 0) {
                        Clipboard.setString(item.trades[0].tradeId);
                        if (Platform.OS === 'android') {
                          ToastAndroid.show('Trade ID copied!', ToastAndroid.SHORT);
                        }
                        console.log("Trade ID copied:", item.trades[0].tradeId);
                      } else {
                        console.log("No Trade ID to copy");
                      }
                    }}
                  />
                </View>
              ) : (
                <>
                  <CustomButton
                    height={Metrix.VerticalSize(36)}
                    flex={1}
                    borderRadius={Metrix.VerticalSize(4)}
                    title={"DECLINE"}
                    backgroundColor={colors.yellowColor}
                    fontSize={Metrix.FontSmall}
                    onPress={() => handleDeclinePress(index)}
                  />
                  <CustomButton
                    height={Metrix.VerticalSize(36)}
                    flex={1}
                    borderRadius={Metrix.VerticalSize(4)}
                    title={"ACCEPT"}
                    fontSize={Metrix.FontSmall}
                    onPress={() => {
                      handleAcceptPress(index);
                    }}
                  />
                </>
              )}
            </>
          )}
        </View>

        {item.status === 'ACCEPTED' || acceptState[index] ? (
          <View style={styles.acceptedInfoContainer}>
            <ModalInfoIcon width={24} height={24} outerStroke={colors.redColor} />
            {hasTrade ? (
              matchingTrade.status === 'COMPLETED' ? (
                // No message when trade is completed
                null
              ) : matchingTrade.status === 'VERIFIED' ? (
                // Message when trade is verified but not completed
                <Text style={styles.awaitingText}>Awaiting for the buyer to Confirm Buy and close the trade.</Text>
              ) : (
                // Show trade ID when pending
                <Text style={styles.awaitingText}>Trade ID: <Text style={{ fontFamily: fonts.InterBold }}>{matchingTrade.tradeId}</Text></Text>
              )
            ) : (
              // No trade available yet
              <Text style={styles.awaitingText}>Awaiting for the buyer to share trade id with you.</Text>
            )}
          </View>
        ):null}
      </View>
    );
  };
  // i want in this code remove in line css and give name styles.somthing   and also give me style sheet css of these css names and nothing change in my code
  // console.log("item==>>>", item)

  return (
    <View style={styles.previewPostedSgItemsConatiner}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <NavBar title={"My Posted SG Items "}
          fontSize={Metrix.FontMedium} />
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{productInfo?.title || item.title}</Text>
          <View style={styles.iconRow}>
            <BlackBitIcon width={16} height={16} />
            <Text style={styles.minBidText}>{productInfo?.minBid || item.minBid}</Text>
          </View>
        </View>

        <View style={styles.middleToBottomContainer}>
          <View style={styles.topMiddleContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.iconRow}>
                <ViewsIcon width={16} height={10} />
                <Text style={styles.iconText}>{productInfo?.views || item.views || 0}</Text>
              </View>
              <View style={styles.iconRow}>
                <LikesIcon width={14} height={12} />
                <Text style={styles.iconText}>{productInfo?.likes || item.likes || 0}</Text>
              </View>
              <View style={styles.iconRow}>
                <ShareIcon width={14} height={17} />
                <Text style={styles.iconText}>{productInfo?.shares || item.shares || 0}</Text>
              </View>
            </View>

            <CustomButton
              title={"MARK AS SOLD"}
              fontSize={Metrix.FontSmall}
              fontFamily={fonts.InterBold}
              color={tradeId ? colors.white : '#A39696'}
              width={Metrix.HorizontalSize(144)}
              height={Metrix.VerticalSize(36)}
              backgroundColor={!tradeId ? "#C4C4C4" : colors.buttonColor}
              borderRadius={Metrix.VerticalSize(4)}
              disabled={productInfo?.status === 'SOLD' || (tradeId ? false : true)}
              onPress={async () => {
                if (productInfo?.isBidding) {
                  setModalVisible(true);
                } else {
                  try {
                    const response = await axiosInstance.post(`/api/products/${item.id}/mark-sold`);
                    fetchProductDetail(); // Refresh product details
                  } catch (error) {
                    console.error('Error marking product as sold:', error);
                  }
                }
              }}
            />
          </View>


          {
            Object.values(acceptState).some(value => value) && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5), flex: 1 }}>
                <ModalInfoIcon outerStroke={colors.redColor} height={24} width={24} />
                <Text style={{ fontSize: Metrix.normalize(10), fontFamily: fonts.InterSemiBold, color: "#646464", flex: 1 }}>
                  To claim SG Points you need to "
                  <Text style={{ fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                    Mark As Sold
                  </Text>" using the SG Id sent by buyer.
                </Text>
              </View>
            )
          }

          <View style={[!viewItemsDetails ? styles.closedBox : styles.openBox]}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => setViewItemsDetails(!viewItemsDetails)}>
                {viewItemsDetails ? <DownArrowIcon stroke={colors.buttonColor} /> : <RightArrowIcon stroke={colors.white} />}
              </TouchableOpacity>
              <Text style={[styles.headerText, viewItemsDetails && styles.headerTextBlack]}>View item details</Text>
            </View>

            {viewItemsDetails && (
              <View style={styles.itemDetailsContainer}>
                <Image
                  source={item.images ? { uri: item.images.split(',')[0] } : Images.homePopularListing}
                  style={styles.itemImage}
                />
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            )}
          </View>

          <View style={[!viewBidsDetails ? styles.closedBox : styles.openBox]}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={styles.arrowButton} activeOpacity={0.8} onPress={() => setViewBidsDetails(!viewBidsDetails)}>
                {viewBidsDetails ? <DownArrowIcon stroke={colors.buttonColor} /> : <RightArrowIcon stroke={colors.white} />}
              </TouchableOpacity>
              <Text style={[styles.headerText, viewBidsDetails && styles.headerTextBlack]}>Bidding Details</Text>
            </View>

            {viewBidsDetails && (
              <View style={styles.bidDetailsContainer}>
                <View style={styles.bidSummaryBox}>
                  <Text style={styles.bidSummaryText}>Total Bid: <Text style={styles.bidValue}>{productDetail.length}</Text></Text>
                  <Text style={styles.bidSummaryText}>Highest Bid: <Text style={styles.bidValue}>{Math.max(...productDetail.map(bid => bid.amount))}</Text></Text>
                  <Text style={styles.bidSummaryText}>Status: <Text style={styles.bidValue}>{productInfo?.status || 'Active'}</Text></Text>
                </View>

                <View style={styles.sameMiddleBox}>
                  <View style={styles.timeRow}>
                    <TimeIcon width={12} height={12} stroke="#5A5A5A" />
                    <Text style={styles.bidEndsText}>Bid Ends</Text>
                  </View>

                  <View style={styles.timerRow}>
                    {[
                      { label: "Days", value: days, setter: setDays },
                      { label: "Hours", value: hours, setter: setHours },
                      { label: "Minutes", value: minutes, setter: setMinutes },
                      { label: "Seconds", value: seconds, setter: setSeconds },
                    ].map((item, index) => (
                      <View key={index} style={styles.inputContainer}>
                        <View style={styles.timeInputRow}>
                          <TextInput
                            style={styles.input}
                            value={item.value}
                            keyboardType="numeric"
                            placeholder="00"
                            placeholderTextColor="#000"
                            editable={false}
                            selectTextOnFocus={false}
                            maxLength={2}
                          />
                          {index < 3 && <Text style={styles.separator}>:</Text>}
                        </View>
                        <Text style={styles.label}>{item.label}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}
          </View>



          {/* <FlatList
                    data={requestBuyData}
                    renderItem={renderRequestBitData}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ gap: Metrix.VerticalSize(7) }}
                /> */}

          {
            loading ?
              <ActivityIndicator style={{ marginTop: Metrix.VerticalSize(50) }} />
              :
              !productDetail.length ?
                <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterLight, textAlign: "center", marginTop: Metrix.VerticalSize(50) }}>No Bids Available</Text>
                :
                productDetail.map((item, index) => {
                  return (
                    renderRequestBitData(item, index)
                  )
                })
          }


        </View>

      </KeyboardAwareScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
  <View style={styles.modalContainer}>
    <View style={styles.modalBox}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          setModalVisible(false);
          setSgId('');
        }}
      >
        <CrossIcon />
      </TouchableOpacity>

      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Kindly enter SG ID, to mark as sold.</Text>
        <View style={styles.modalInputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.modalLabel}>SG ID:</Text>
            <TextInput
              style={styles.modalInput}
              value={sgId}
              onChangeText={setSgId}
              placeholder="Enter SG ID"
            />
          </View>
          <CustomButton
            title={"SUBMIT"}
            width={Metrix.HorizontalSize(144)}
            height={Metrix.VerticalSize(36)}
            borderRadius={Metrix.VerticalSize(35)}
            fontSize={Metrix.FontSmall}
            onPress={async () => {
              if (sgId.trim()) {
                try {
                  const response = await axiosInstance.post('/api/trades/verify', {
                    tradeId: sgId.trim()
                  });
                  console.log('Trade verification response:', response.data);

                  setModalVisible(false);
                  setSgId('');
                  fetchProductDetail();
                } catch (error) {
                  console.error('Error verifying trade:', error);
                }
              }
            }}
            disabled={!sgId.trim()}
          />
        </View>
        <View style={styles.infoContainer}>
          <ModalInfoIcon outerStroke={colors.redColor} width={24} height={24} />
          <Text style={styles.infoText}>Go back to your trade screen and copy trade Id to submit here</Text>
        </View>
      </View>
    </View>
  </View>
</Modal>


    </View>
  );
}
