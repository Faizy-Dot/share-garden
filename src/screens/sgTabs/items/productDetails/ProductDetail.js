import React, { useState } from 'react';
import { View, Text, Image, FlatList, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Images, Metrix } from '../../../../config';
import styles from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';

const ProductDetail = () => {
  const route = useRoute();
  const { item } = route.params;

  console.log("bit=>>>", item.bit)

  const [activeIndex, setActiveIndex] = useState(0);
  const [days, setDays] = useState(12);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(50);
  const images = [Images.homePopularListing, Images.homeProfile, Images.homePopularListing,]

  const { width } = Dimensions.get('window');

  const myPosts = [
    { id: 1, post: "Single bed in Toronto" },
    { id: 2, post: "Audi A6 in Toronto" },
    { id: 3, post: "Sofa Set in Toronto" }
  ];

  const renderMyPosts = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.postBox}>
      <Image source={Images.homePostVector} style={{ width: Metrix.VerticalSize(14), height: Metrix.VerticalSize(14) }} />
      <Text style={{ fontSize: Metrix.customFontSize(10), fontFamily: fonts.InterLight }}>{item.post}</Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.PriceContainer}>
          <Image source={ item.bit ?  Images.bitLogoBig : Images.dollarLogoBig} style={styles.bitLogo} />
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.middleTopContainer}>
          <View>
            <FlatList
              data={images}
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
              renderItem={({ item }) => {
                return (
                  <Image source={item} style={styles.productImage} />
                )
              }}
            />
            <View style={styles.dotContainer}>
              {images.map((_, index) => (
                <View key={index} style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]} />
              ))}
            </View>
            <View style={styles.FeaturedContainer}>
              <Text style={styles.featuredText}>Featured</Text>
              <View style={styles.IconContainer}>
                <Image source={Images.likeWhiteIcon} />
                <Image source={Images.shareWhiteIcon} />
              </View>
            </View>
          </View>

          <View style={styles.middleTopDescriptionContainer}>
            <Text>Comfortable 7-seater sofa set for sale!
              - Sturdy wooden frame
              - High-density foam cushions
              - Premium fabric upholstery
              - Ideal for large families or social gatherings
              - Excellent condition, minimal usage
              - Negotiable price

              Contact us for more details and viewing!"</Text>
          </View>
          {
            item.bit &&
            <>
              <View style={styles.linecontainer}>
                <View style={styles.circle} />
                <View style={styles.dottedLine} />
                <View style={styles.circle} />
              </View>

              <View style={styles.middleTopBottomContainer}>

                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(20) }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
                    <Image source={Images.soundIcon} style={{ width: Metrix.HorizontalSize(14), height: Metrix.HorizontalSize(14) }} />
                    <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold }}>Place a bid</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
                    <Image source={Images.homePostVector} style={{ width: Metrix.HorizontalSize(14), height: Metrix.HorizontalSize(14) }} />
                    <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterSemiBold }}>Bid ends</Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(15) }}>
                  <View style={{ height: Metrix.VerticalSize(48), width: Metrix.HorizontalSize(100), borderWidth: 1, borderColor: "#E6E6E6", justifyContent: "center", alignItems: "center", borderRadius: Metrix.VerticalSize(3) }}>
                    <Text style={{ fontSize: Metrix.FontLarge, fontFamily: fonts.InterBold, color: colors.buttonColor }}>2000</Text>
                  </View>


                  <View style={styles.timerRow}>
                    {[
                      { label: "Days", value: days, setter: setDays },
                      { label: "Hours", value: hours, setter: setHours },
                      { label: "Minutes", value: minutes, setter: setMinutes },
                      { label: "Seconds", value: seconds, setter: setSeconds },
                    ].map((item, index) => (
                      <View key={index} style={styles.inputContainer}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="00"
                            placeholderTextColor="#000"
                            value={item.value}
                            onChangeText={(text) => handleInput(text, item.setter)}
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
            </>

          }
          <View style={{ paddingHorizontal: Metrix.HorizontalSize(15), marginTop: Metrix.VerticalSize(18) }}>
            <CustomButton title={item.bit ? "PLACE BID" : "I WANT PURCHASE THIS"}
              height={Metrix.VerticalSize(46)}
              width={"100%"}
              borderRadius={Metrix.VerticalSize(3)}
              fontSize={Metrix.FontSmall} />
          </View>
        </View>


        <View style={styles.middleMidContainer} >
          {
            item.bit ?(

              <>
                <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Total Bid : <Text style={{ color: colors.black }}>11</Text></Text>
                <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Highest Bid :<Text style={{ color: colors.black }}>2000</Text></Text>
                <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Status :<Text style={{ color: colors.black }}>Active</Text></Text>
              </>
            )
              :
              <>
                <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Total Views:<Text style={{ color: colors.black }}>11</Text></Text>
                <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Status :<Text style={{ color: colors.black }}>Available</Text></Text>
              </>
          }

        </View>


        <View style={styles.middleBottomContainer} >

          <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
            <Image source={Images.homeProfile} style={{ width: Metrix.HorizontalSize(64), height: Metrix.HorizontalSize(64) }} />
            <View>
              <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.bit ? "Bid by" : "Posted by | SG Member"}</Text>
              <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterRegular, color: colors.buttonColor }}>Trey Lance</Text>
              <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}>Published on 24 April 2024</Text>
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
    </KeyboardAwareScrollView>
  );
};

export default ProductDetail;