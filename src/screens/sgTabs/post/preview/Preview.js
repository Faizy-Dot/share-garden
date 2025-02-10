import React, { useEffect, useState } from "react";
import { Image, Modal, Switch, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import BackArrowIcon from "../../../../components/backArrowIcon/BackArrowIcon";
import colors from "../../../../config/Colors";
import NavBar from "../../../../components/navBar/NavBar";
import { Images, Metrix } from "../../../../config";
import styles from "./style";
import fonts from "../../../../config/Fonts";
import CustomButton from "../../../../components/Button/Button";
import Axios from 'axios';


export default function PostTabScreen({ navigation, route }) {
  const [days, setDays] = useState(12);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(50);
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
    onSuccess 
  } = route.params;

  console.log("checked==>>>",images)
  console.log('Received isSGPoints:', isSGPoints);
  

  const handleInput = (text, setter, field) => {
    const numericText = text.replace(/[^0-9]/g, ""); // Allow only numbers
    
    // Clear previous error for this field
    setTimeErrors(prev => ({ ...prev, [field]: '' }));

    if (field === 'days') {
        if (parseInt(numericText) > 3) {
            setTimeErrors(prev => ({ ...prev, days: 'Maximum 3 days allowed' }));
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

    if (isSGPoints) {
        const totalSeconds = (Number(days) * 24 * 60 * 60) + (Number(hours) * 60 * 60) + 
                           (Number(minutes) * 60) + Number(seconds);

        // Validation for empty duration
        if (totalSeconds === 0) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Duration',
                text2: 'Please set a valid bid duration',
            });
            return;
        }

        // If days is empty (0), hours must not be empty
        if (Number(days) === 0 && Number(hours) === 0) {
            setTimeErrors(prev => ({ ...prev, hours: 'Hours required when days is 0' }));
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

    if (isSGPoints && (!pointOrCashValue || totalSeconds === 0)) {
        Toast.show({
            type: 'error',
            text1: 'Missing Fields',
            text2: 'Please enter minimum bid value and bid duration',
        });
        return;
    }

    if (!isSGPoints && !pointOrCashValue) {
        Toast.show({
            type: 'error',
            text1: 'Missing Fields',
            text2: 'Please enter price value',
        });
        return;
    }

    setLoading(true);
    try {
        const totalSeconds = (Number(days) * 24 * 60 * 60) + (Number(hours) * 60 * 60) + 
                           (Number(minutes) * 60) + Number(seconds);

        const formData = new FormData();
        
        // Required fields
        formData.append('title', title);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('condition', condition);
        formData.append('isSGPoints', isSGPoints.toString()); // Convert boolean to string
        formData.append('isPublished', (!isDraft).toString()); // Convert boolean to string

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

        // Debug log
        console.log('Sending FormData:', {
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

        const response = await Axios.post(
            'https://api.sharegarden.ca/api/products/createProduct',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        if (response.status === 201) {
            setModalVisible(true);
            if (isDraft) {
                setDraft(true);
                setPublish(false);
            } else {
                setDraft(false);
                setPublish(true);
            }

            // Set timeout to navigate after 2 seconds
            const timeout = setTimeout(() => {
                setModalVisible(false);
                resetPreviewForm();
                onSuccess(); // Reset Post screen form
                navigation.navigate('Items');
            }, 2000);

            setNavigateTimeout(timeout);
        }
    } catch (error) {
        console.log("Full error object:", error);
        console.log("Error response data:", error.response?.data);
        console.log("Error status:", error.response?.status);
        
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error.response?.data?.error || 'Failed to create product',
        });
    } finally {
        setLoading(false);
    }
};

const getDisplayCondition = (apiCondition) => {
    switch(apiCondition) {
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
    onSuccess(); // Reset Post screen form
    navigation.navigate('Items');
};

  return (
    <KeyboardAwareScrollView style={styles.postContainer} showsVerticalScrollIndicator={false}>
      <View>
        <BackArrowIcon />
      </View>

      <View>
        <NavBar title={"Create a Post"}
          fontSize={Metrix.FontRegular}
        />
      </View>

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
              <Image source={isSGPoints ? Images.bitLogoBig : Images.dollarLogoBig} style={styles.bitLogo} />
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
                  <Image source={Images.homePostVector} style={styles.timeIcon} />
                  <Text style={styles.bidEndsText}>Bid Ends</Text>
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
          onPress={() => handlePublish(true)}
        />

        <CustomButton
          height={Metrix.VerticalSize(42)}
          title={loading ? "PUBLISHING..." : "PUBLISH"}
          backgroundColor={colors.buttonColor}
          borderRadius={Metrix.VerticalSize(4)}
          flex={1}
          disabled={loading}
          onPress={() => handlePublish(false)}
        />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity 
                style={styles.closeButton} 
                onPress={handleModalClose}
            >
              <Image source={Images.crossIcon} />
            </TouchableOpacity>
            <Image source={Images.successIcon} style={styles.successIcon} />
            {
              draft ?
                <Text style={styles.modalTitle}>Your SG item has been saved in drafts</Text>
                :
                <Text style={styles.modalTitle}>Your SG item has been posted on <Text style={{ color: colors.buttonColor }}>SG marketplace</Text></Text>
            }

            <View style={styles.bottomModalContainer}>
              <Image source={Images.infoIcon} />
              <Text style={styles.modalDescription}>You can access your {publish ? "posted" : "drafts"} item under <Text style={{ color: colors.redColor }}>Profile {">"} My posted items.</Text></Text>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}
