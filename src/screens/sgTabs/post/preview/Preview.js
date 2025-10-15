import React, { useEffect, useState } from "react";
import { Image, Modal, Switch, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import BackArrowIcon from "../../../../components/backArrowIcon/BackArrowIcon";
import colors from "../../../../config/Colors";
import NavBar from "../../../../components/navBar/NavBar";
import { Images, Metrix } from "../../../../config";
import styles from "./style";
import fonts from "../../../../config/Fonts";
import CustomButton from "../../../../components/Button/Button";
import ApiCaller from '../../../../config/ApiCaller';
import axiosInstance from '../../../../config/axios';
import { BlackBitIcon, CashIcon, CrossIcon, ModalInfoIcon, ModalSuccessLogo, SgTipsIcon, TimeIcon, TipsTabIcon } from "../../../../assets/svg";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { updateUserProfile } from "../../../../redux/Actions/authActions/loginAction";


export default function PostTabScreen({ navigation, route }) {
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [publish, setPublish] = useState(false)
  const [draft, setDraft] = useState(false)
  const [loading, setLoading] = useState(false);
  const [timeErrors, setTimeErrors] = useState({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  });
  const [navigateTimeout, setNavigateTimeout] = useState(null);

  const { user } = useSelector((state) => state.login)
  const dispatch = useDispatch();

  const {
    title,
    pointOrCashValue,
    description,
    images,
    isSGPoints,
    isCash,
    condition,
    categoryId,
    categoryName,
    onSuccess,
    activeButton,
    forDraft
  } = route.params;

  console.log("fordraft==>>", forDraft)


  const handleInput = (text, setter, field) => {
    const numericText = text.replace(/[^0-9]/g, ""); // Allow only numbers

    // Clear previous error for this field
    setTimeErrors(prev => ({ ...prev, [field]: '' }));

    if (field === 'days') {
      if (parseInt(numericText) > 14) {
        setTimeErrors(prev => ({ ...prev, days: 'Maximum 14 days allowed' }));
        return;
      }
    }

    if (numericText.length <= 2) {
      setter(numericText);

      // Additional validations
      if (field === 'hours') {
        if (parseInt(numericText) > 23) {
          setTimeErrors(prev => ({ ...prev, hours: 'Hours cannot exceed 23' }));
          return;
        }
      }
      if (field === 'minutes' || field === 'seconds') {
        if (parseInt(numericText) > 59) {
          setTimeErrors(prev => ({
            ...prev,
            [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed 59`
          }));
          return;
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login")
      Toast.show({
        type: 'error',
        text1: 'Login or Signup',
        text2: 'First Login plz',
      });
    }
  }, [user, navigation]);

  if (!user) {
    return null;
  }

  const handlePublish = async (isDraft = false) => {
    // Reset all errors
    setTimeErrors({
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    });

    // Convert to numbers for comparison
    const daysNum = Number(days) || 0;
    const hoursNum = Number(hours) || 0;
    const minutesNum = Number(minutes) || 0;
    const secondsNum = Number(seconds) || 0;

    // Calculate total seconds
    const totalSeconds = (daysNum * 24 * 60 * 60) +
      (hoursNum * 60 * 60) +
      (minutesNum * 60) +
      secondsNum;

    if (isSGPoints) {
      // First validate the bid value
      if (!pointOrCashValue || pointOrCashValue <= 0) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Bid Value',
          text2: 'Please enter a valid minimum bid value',
        });
        return;
      }

      // Validate time inputs - ensure they're not empty or invalid
      if (!days && !hours && !minutes && !seconds) {
        Toast.show({
          type: 'error',
          text1: 'Missing Duration',
          text2: 'Please set a bid duration',
        });
        return;
      }

      // If days is 0, hours must not be 0
      if (daysNum === 0 && hoursNum === 0) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Duration',
          text2: 'Hours must not be 0 when days is 0',
        });
        return;
      }

      if (totalSeconds === 0) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Duration',
          text2: 'Bid duration cannot be zero',
        });
        return;
      }

      // Check if any time field has validation errors
      if (Object.values(timeErrors).some(error => error !== '')) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Time',
          text2: 'Please correct the time inputs',
        });
        return;
      }
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // Required fields
      formData.append('title', title);
      formData.append('description', description);
      formData.append('categoryId', categoryId);
      formData.append('condition', condition);
      formData.append('isSGPoints', isSGPoints.toString());
      formData.append('isPublished', (!isDraft).toString());
      formData.append('status', 'ACTIVE')

      // Conditional fields based on payment type
      if (isSGPoints) {
        formData.append('minBid', pointOrCashValue.toString());
        formData.append('bidDuration', totalSeconds.toString());
      } else {
        formData.append('price', pointOrCashValue.toString());
      }

      // Append images
      images.filter(img => img !== null).forEach((image, index) => {
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });
      formData.append('existingImages', "");
      // Debug logs
      console.log('Form Data Contents:', {
        title,
        description,
        categoryId,
        condition,
        isSGPoints,
        isPublished: !isDraft,
        ...(isSGPoints ? {
          minBid: pointOrCashValue,
          bidDuration: totalSeconds
        } : {
          price: pointOrCashValue
        }),
        imageCount: images.filter(img => img !== null).length
      });


      if (forDraft?.id) {
        console.log("Updating existing product with ID:", forDraft.id)

        const response = await ApiCaller.PutFormData(
          `/api/products/${forDraft.id}`,
          formData,
          {
            Authorization: `Bearer ${user?.token}`,
          }
        );

        console.log('API Response:', response);

        if (response.status === 200) {
          setModalVisible(true);
          if (isDraft) {
            setDraft(true);
            setPublish(false);
          } else {
            setDraft(false);
            setPublish(true);
          }

          const timeout = setTimeout(() => {
            setModalVisible(false);
            resetPreviewForm();
            onSuccess();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'PostList',
                  params: { refresh: true }
                }
              ],
            });
          }, 7000);

          setNavigateTimeout(timeout);
        }

      } else {
        const response = await ApiCaller.Post(
          `/api/products/createProduct`,
          formData,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          }
        );

        console.log('API Response:', response.data);

        if (response.status === 201) {
          setModalVisible(true);
          if (isDraft) {
            setDraft(true);
            setPublish(false);
          } else {
            setDraft(false);
            setPublish(true);
          }

          const timeout = setTimeout(() => {
            setModalVisible(false);
            resetPreviewForm();
            onSuccess();
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'PostList',
                  params: { refresh: true }
                }
              ],
            });
          }, 7000);

          setNavigateTimeout(timeout);
        }

      }

    } catch (error) {
      console.log('Create product error:', error?.status, error?.data);
      const errorMessage = error?.data?.message || 'Failed to create product';
      Toast.show({ type: 'error', text1: 'Error', text2: errorMessage });
    } finally {
      setLoading(false);
    }
  };


  const handlePublishSGTip = async (isDraft = false) => {
    try {
      setLoading(true);
      let response;

      if (forDraft) {
        const formData = new FormData();

        // Required fields for SG Tip
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('status', isDraft ? 'DRAFT' : 'PUBLISHED');
        formData.append('existingImages', `${images[0] || null} ,${images[1] || null} ,${images[2] || null} , `); // If you want to keep specific images
        images.filter(img => img !== null).forEach((image, index) => {
          formData.append('images', {
            uri: image,
            type: 'image/jpeg',
            name: `image${index}.jpg`,
          });
        });
        response = await ApiCaller.Post(
          `/api/sgtips/update-sgtip/${forDraft.id}`,
          formData,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          }
        );

        console.log('updated SG Tip API Response:', response);
      } else {
        const formData = new FormData();

        // Required fields for SG Tip
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('status', isDraft ? 'DRAFT' : 'PUBLISHED');
        // Append images
        images.filter(img => img !== null).forEach((image, index) => {
          formData.append('images', {
            uri: image,
            type: 'image/jpeg',
            name: `image${index}.jpg`,
          });
        });
        response = await ApiCaller.Post(
          '/api/sgtips',
          formData,
          {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user?.token}`,
          }
        );

        console.log('New SG Tip API Response:', response.data);
      }


      if (response.status === 201 || response.status === 200) {
        dispatch(updateUserProfile({ sgPoints: (user?.sgPoints || 0) + 100 }));
        setModalVisible(true);
        if (isDraft) {
          setDraft(true);
          setPublish(false);
        } else {
          setDraft(false);
          setPublish(true);
        }

        const timeout = setTimeout(() => {
          setModalVisible(false);
          resetPreviewForm();
          onSuccess();
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'PostList',
                params: { refresh: true }
              }
            ],
          });
        }, 7000);

        setNavigateTimeout(timeout);
      }
    } catch (error) {
      console.error('Error creating SG Tip:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to create SG Tip',
      });
    } finally {
      setLoading(false);
    }
  };

  const getDisplayCondition = (apiCondition) => {
    switch (apiCondition) {
      case 'FAIRLY_USED':
        return 'Fairly Used';
      case 'GOOD':
        return 'Good';
      case 'EXCELLENT':
        return 'Excellent';
      default:
        return 'Not specified';
    }
  };

  // Clean up timeout when component unmounts or on error
  useEffect(() => {
    return () => {
      if (navigateTimeout) {
        clearTimeout(navigateTimeout);
      }
    };
  }, [navigateTimeout]);

  // Reset Preview form fields
  const resetPreviewForm = () => {
    setDays('');
    setHours('');
    setMinutes('');
    setSeconds('');
    setTimeErrors({
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    });
  };

  // Update handleModalClose to reset both forms
  const handleModalClose = () => {
    if (navigateTimeout) {
      clearTimeout(navigateTimeout);
    }
    setModalVisible(false);
    setDraft(false);
    setPublish(false);
    resetPreviewForm();
    onSuccess();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'PostList',
          params: { refresh: true }
        }
      ],
    });
  };

  return (
    <KeyboardAwareScrollView style={styles.postContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      <View style={{ padding: Metrix.VerticalSize(10) }}>

        <View>
          <BackArrowIcon />
        </View>

        <View>
          <NavBar title={activeButton === "SG Tip" ? "Publish SG Tips" : (forDraft?.id ? "Edit Post" : "Create a Post")}
            fontSize={Metrix.FontRegular}
          />
        </View>
      </View>

      {
        activeButton === "SG Item" ?
          <View style={styles.middleContainer}>
            <Text style={styles.middleHeading}>ITEMS PREVIEW</Text>
            <View style={styles.middleBox}>
              <View style={{ paddingHorizontal: Metrix.HorizontalSize(20) }}>
                <Text style={styles.middleTitle}>{title}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={styles.imageContainer}>
                    {
                      images[0] &&
                      <Image source={{ uri: images[0] }} style={styles.updateImage} />
                    }
                  </View>
                  <View style={styles.imageContainer}>
                    {
                      images[1] &&
                      <Image source={{ uri: images[1] }} style={styles.updateImage} />
                    }
                  </View>
                  <View style={styles.imageContainer}>
                    {
                      images[2] &&
                      <Image source={{ uri: images[2] }} style={styles.updateImage} />
                    }
                  </View>
                </View>
              </View>

              <View style={styles.sameMiddleBox}>
                <Text style={styles.middleDescription}>{description}</Text>
              </View>

              <View style={styles.sameMiddleBox}>
                <Text style={styles.itemConditionText}>Category : <Text style={{ fontFamily: fonts.InterRegular }}>{categoryName}</Text></Text>
              </View>

              <View style={[styles.sameMiddleBox, { flexDirection: "row", gap: Metrix.HorizontalSize(5), }]}>
                <Text style={styles.itemConditionText}>
                  Item Condition : <Text style={{ fontFamily: fonts.InterRegular }}>
                    {getDisplayCondition(condition)}
                  </Text>
                </Text>
              </View>

              <View style={[styles.sameMiddleBox, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(10) }}>
                  {isSGPoints ? <BlackBitIcon width={32} height={32} /> : <CashIcon width={32} height={32} />}
                  <Text style={[styles.itemConditionText, { fontFamily: fonts.InterBold }]}>
                    {isSGPoints ? 'Bid in SG Pts' : 'Price'}
                  </Text>
                </View>
                <Text style={styles.bidsValue}>{isCash && "$  "}{pointOrCashValue}</Text>
              </View>
              {
                isSGPoints &&
                <>

                  <View style={[styles.sameMiddleBox, { flexDirection: "row", gap: Metrix.HorizontalSize(29) }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(15) }}>
                      <TimeIcon width={12} height={12} stroke="#5A5A5A" />
                      <Text style={styles.bidEndsText}>Bid duration</Text>
                    </View>

                    <View style={styles.timerRow}>
                      {[
                        { label: "Days", value: days, setter: setDays, field: 'days' },
                        { label: "Hours", value: hours, setter: setHours, field: 'hours' },
                        { label: "Minutes", value: minutes, setter: setMinutes, field: 'minutes' },
                        { label: "Seconds", value: seconds, setter: setSeconds, field: 'seconds' },
                      ].map((item, index) => (
                        <View key={index} style={styles.inputContainer}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput
                              style={[
                                styles.input,
                                timeErrors[item.field] ? styles.inputError : null
                              ]}
                              keyboardType="numeric"
                              placeholder="00"
                              placeholderTextColor="#000"
                              value={item.value}
                              onChangeText={(text) => handleInput(text, item.setter, item.field)}
                              maxLength={2}
                            />
                            {index < 3 && <Text style={styles.separator}>:</Text>}
                          </View>
                          <Text style={styles.label}>{item.label}</Text>
                          {timeErrors[item.field] && (
                            <Text style={styles.errorText}>{timeErrors[item.field]}</Text>
                          )}
                        </View>
                      ))}
                    </View>

                  </View>
                </>
              }



            </View>
          </View>
          :
          <View>

            <View style={{ paddingHorizontal: Metrix.HorizontalSize(10), gap: Metrix.HorizontalSize(25) }}>
              <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Preview</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(10) }}>
                <TipsTabIcon width={24} height={24} color={colors.buttonColor} />
                <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold }}>{title}</Text>
              </View>
            </View>

            <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.borderColor, paddingHorizontal: Metrix.HorizontalSize(15), paddingVertical: Metrix.VerticalSize(15), marginTop: Metrix.VerticalSize(10) }}>
              <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold }}>Category: {"           "}<Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>{categoryName}</Text></Text>
            </View>

            <View style={{ paddingHorizontal: Metrix.HorizontalSize(10), gap: Metrix.VerticalSize(10), marginTop: Metrix.VerticalSize(7) }}>
              <View style={{ borderWidth: 1, borderColor: colors.borderColor, padding: Metrix.VerticalSize(20), borderRadius: Metrix.VerticalSize(3) }}>
                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}>{description}</Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Metrix.VerticalSize(15) }}>
                  <View style={styles.SGTipimageContainer}>
                    {
                      images[0] &&
                      <Image source={{ uri: images[0] }} style={styles.SGTipupdateImage} />
                    }
                  </View>
                  <View style={styles.SGTipimageContainer}>
                    {
                      images[1] &&
                      <Image source={{ uri: images[1] }} style={styles.SGTipupdateImage} />
                    }
                  </View>
                  <View style={styles.SGTipimageContainer}>
                    {
                      images[2] &&
                      <Image source={{ uri: images[2] }} style={styles.SGTipupdateImage} />
                    }
                  </View>
                </View>

              </View>

              <View style={{ borderWidth: 1, borderColor: colors.borderColor, padding: Metrix.VerticalSize(20), borderRadius: Metrix.VerticalSize(3), flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(10) }}>
                {
                  user.profileImage ?
                    <Image source={{ uri: user?.profileImage }} style={{ width: Metrix.HorizontalSize(64), height: Metrix.HorizontalSize(64), borderRadius: 32 }} />
                    :
                    <FontAwesomeIcon name="user-circle" size={Metrix.HorizontalSize(64)} color="#ccc" />
                }
                <View>
                  <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>Posted by | SG Member</Text>
                  <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterRegular, color: colors.buttonColor }}>{user.firstName + " " + user.lastName}</Text>
                  <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}> Published on {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
                </View>
              </View>

            </View>

          </View>
      }



      <View style={styles.bottomButtons}>
        <CustomButton
          height={Metrix.VerticalSize(42)}
          title={loading ? "SAVING..." : "SAVE DRAFT"}
          backgroundColor={colors.white}
          color={colors.black}
          borderWidth={1}
          borderColor={colors.borderColor}
          borderRadius={Metrix.VerticalSize(4)}
          flex={1}
          disabled={loading}
          onPress={() => activeButton === "SG Tip" ? handlePublishSGTip(true) : handlePublish(true)}
        />

        <CustomButton
          height={Metrix.VerticalSize(42)}
          title={loading ? (forDraft?.id ? "UPDATING..." : "PUBLISHING...") : (forDraft?.id ? "UPDATE" : "PUBLISH")}
          backgroundColor={colors.buttonColor}
          borderRadius={Metrix.VerticalSize(4)}
          flex={1}
          disabled={loading}
          onPress={() => activeButton === "SG Tip" ? handlePublishSGTip(false) : handlePublish(false)}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleModalClose}
            >
              <CrossIcon />
            </TouchableOpacity>
            <ModalSuccessLogo />
            {draft ? (
              <Text style={styles.modalTitle}>
                Your {activeButton === "SG Tip" ? "SG Tip" : "SG item"} has been saved in drafts
              </Text>
            ) : (
              <Text style={styles.modalTitle}>
                {activeButton === "SG Item" ? (
                  forDraft?.id ? (
                    <>Your SG item has been updated on <Text style={{ color: colors.buttonColor }}>SG marketplace</Text></>
                  ) : (
                    <>Your SG item has been posted on <Text style={{ color: colors.buttonColor }}>SG marketplace</Text></>
                  )
                ) : (
                  forDraft?.id ? "Your SG Tip has been updated" : "Your SG Tip has been posted"
                )}
              </Text>
            )}

            <View style={styles.bottomModalContainer}>
              <ModalInfoIcon />
              <Text style={styles.modalDescription}>
                You can access your {publish ? "posted" : "drafts"} {activeButton === "SG Tip" ? "tip" : "item"} under <Text style={{ color: colors.redColor }}>Profile {">"} My {activeButton === "SG Tip" ? "SG Tips" : "posted items"}.</Text>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}
