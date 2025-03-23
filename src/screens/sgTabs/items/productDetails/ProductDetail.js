import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Dimensions, TextInput, TouchableOpacity, Linking, StyleSheet } from 'react-native';
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


const ProductDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize time states with 0
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false)

  const images = [Images.homePopularListing, Images.homeProfile, Images.homePopularListing,]

  const { width } = Dimensions.get('window');

  const myPosts = [
    { id: 1, post: "Single bed in Toronto" },
    { id: 2, post: "Audi A6 in Toronto" },
    { id: 3, post: "Sofa Set in Toronto" }
  ];

  const { user } = useSelector((state) => state.login);

  const renderMyPosts = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.postBox}>
      <TimeIcon width={12} height={12} stroke={colors.black} />
      <Text style={{ fontSize: Metrix.customFontSize(10), fontFamily: fonts.InterLight }}>{item.post}</Text>
    </TouchableOpacity>
  );

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
    const days = Math.floor(durationInSeconds / (24 * 60 * 60));
    const hours = Math.floor((durationInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60);
    const seconds = durationInSeconds % 60;
    return { days, hours, minutes, seconds };
  };

  // Fetch product details and update time
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/products/${item.id}`);
        setProductDetail(response.data);

        console.log("Product Detail response", response.data);

        // Update time if it's a bidding product
        if (response.data.isSGPoints && response.data.bidDuration) {
          const timeRemaining = calculateTimeRemaining(response.data.bidDuration);
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

    fetchProductDetail();
  }, [item.id]);

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
        // Only increment view if viewer is not the seller
        if (user?.id !== route.params?.sellerId) {
          await axiosInstance.post(
            `/api/products/${route.params?.id}/views`
          );
        }
      } catch (error) {
        console.error('Error incrementing view:', error);
      }
    };

    if (user && route.params?.id) {
      incrementProductView();
    }
  }, [user, route.params?.id, route.params?.sellerId]);

  return (
    <KeyboardAwareScrollView style={styles.ProductDetailcontainer} contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(15) }}>
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
                <LikesIcon stroke={colors.white} />
                <ShareIcon stroke={colors.white} />
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
                    <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterSemiBold }}>Bid ends</Text>
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
            <CustomButton
              title={displayData.isSGPoints ? "PLACE BID" : "I WANT TO PURCHASE THIS"}
              height={Metrix.VerticalSize(46)}
              width={"100%"}
              borderRadius={Metrix.VerticalSize(3)}
              fontSize={Metrix.FontSmall}
            />
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
              <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                Status: <Text style={{ color: colors.black }}>{displayData.status || 'Active'}</Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                Total Views: <Text style={{ color: colors.black }}>{displayData.views || 0}</Text>
              </Text>
              <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                Status: <Text style={{ color: colors.black }}>{displayData.status || 'Available'}</Text>
              </Text>
            </>
          )}
        </View>

        <View style={styles.middleBottomContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
            <Image
              source={displayData.seller?.profileImage ? { uri: displayData.seller.profileImage } : Images.homeProfile}
              style={{ width: Metrix.HorizontalSize(64), height: Metrix.HorizontalSize(64), borderRadius: Metrix.HorizontalSize(32) }}
            />
            <View>
              <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>
                {displayData.isSGPoints ? "Bid by" : "Posted by | SG Member"}
              </Text>
              <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterRegular, color: colors.buttonColor }}>
                {`${displayData.seller?.firstName || ''} ${displayData.seller?.lastName || ''}`}
              </Text>
              <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}>
                Published on {new Date(displayData.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>

          <Image source={Images.homeMessageIcon} />
          <Image source={Images.callIcon} />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterRegular, color: colors.buttonColor }}>Most Recent  Search</Text>

        <FlatList
          data={myPosts}
          renderItem={renderMyPosts}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.myPost}
        />
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
    </KeyboardAwareScrollView>
  );
};

export default ProductDetail;