import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, Platform, PermissionsAndroid, TextInput, Switch, StyleSheet } from 'react-native';
import MerchantNavbar from '../../../../components/navBar/MerchantNavbar';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Metrix } from '../../../../config';
import colors from '../../../../config/Colors';
import { UploadImgIcon } from '../../../../assets/svg';
import Toast from "react-native-toast-message";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import DropDownInput from '../../../../components/dropDown/DropDownInput.jsx';
import fonts from '../../../../config/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from '../../../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../config/axios';
import Axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

export default function MerchantPostAD() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [addCoupon, setAddCoupon] = useState(false)
  const [checkOnline, setCheckOnline] = useState(false)
  const [checkInStore, setCheckInStore] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountType, setDiscountType] = useState(null);
  const [percentageValue, setPercentageValue] = useState('');
  const [fixedValue, setFixedValue] = useState('');

  const { user } = useSelector((state) => state.login)
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const discountTypes = [
    { label: 'PERCENTAGE', value: 'PERCENTAGE' },
    { label: 'FIXED', value: 'FIXED' }
  ];

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take product photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePicker = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option to add Ad image',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            const hasPermission = await requestCameraPermission();
            if (hasPermission) {
              try {
                const result = await launchCamera({
                  mediaType: 'photo',
                  quality: 0.8,
                });

                if (!result.didCancel && result.assets?.length > 0) {
                  const newImageUri = result.assets[0].uri;
                  setImage(newImageUri);
                }
              } catch (error) {
                console.error('Camera error:', error);
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: 'Failed to take photo',
                });
              }
            } else {
              Toast.show({
                type: 'error',
                text1: 'Permission Denied',
                text2: 'Camera permission is required',
              });
            }
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            try {
              const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
                selectionLimit: 1,
              });

              if (!result.didCancel && result.assets?.length > 0) {
                const newImageUri = result.assets[0].uri;
                setImage(newImageUri);
              }
            } catch (error) {
              console.error('Gallery error:', error);
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to pick image from gallery',
              });
            }
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen focused, checking user:', user);
      if (!user) {
        navigation.navigate("Login")
        Toast.show({
          type: 'error',
          text1: 'Login Required',
          text2: 'Please login first',
        });
        return;
      }
      console.log('Fetching categories...');
      fetchCategories();
    }, [user, navigation])
  );

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      console.log('User token:', user?.token);
      console.log('Making API call to get categories...');
      const response = await axiosInstance.get('/api/categories/getCategories');

      console.log('Raw API response:', response);
      console.log('Categories data:', response.data);

      // Transform categories for dropdown while preserving all data
      const formattedCategories = response.data.map(cat => ({
        label: cat.name,
        value: cat.id,
        icon: cat.icon,
        slug: cat.slug,
        _count: cat._count
      }));

      console.log('Formatted categories:', formattedCategories);
      setCategories(formattedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load categories',
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  const handlePublish = async () => {
    if (!image || !title || !selectedCategory || !description) {
      return Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill all required fields',
      });
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categoryId', selectedCategory);
    formData.append('images', {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    // Attach coupon fields if user opted to add coupon
    if (addCoupon) {
      formData.append('addCoupon', 'true');
      if (discountType) formData.append('discountType', discountType);
      // Only one redeemBy supported by API: ONLINE or ON_STORE
      const redeemBy = checkOnline ? 'ONLINE' : (checkInStore ? 'ON_STORE' : 'ONLINE');
      formData.append('redeemBy', redeemBy);
      if (couponCode) formData.append('couponCode', couponCode);
      if (expiryDate) formData.append('expiryDate', new Date(expiryDate).toISOString());
      if (title) formData.append('couponTitle', title); // use ad title as coupon title if no separate field
      if (discountType === 'PERCENTAGE' && percentageValue) {
        formData.append('percentageValue', String(percentageValue));
      }
      if (discountType === 'FIXED' && fixedValue) {
        formData.append('fixedAmountValue', String(fixedValue));
      }
      // Optional: disclaimer if present (reuse description if no separate field exists)
      formData.append('disclaimer', description || '');
    } else {
      formData.append('addCoupon', 'false');
    }

    try {
      const response = await axiosInstance.post(
        '/api/ads',
        formData
      );
      
      console.log("response first api ==>>", response.data);

      if(response.status === 201){
        const responsePublish = await axiosInstance.patch(`/api/ads/${response.data.id}/publish`);
        console.log("response from second api==>>", responsePublish.data);
      }

      Toast.show({
        type: 'success',
        text1: 'Ad Published',
        text2: 'Your ad has been successfully posted!',
      });

      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
      setSelectedCategory(null);
      setSelectedCategoryName('');
      setDiscountType(null);
      setPercentageValue('');
      setFixedValue('');
      setAddCoupon(false);
      setCheckOnline(false);
      setCheckInStore(false);
      setCouponCode('');
      setExpiryDate(new Date());

      // Navigate to MerchantItems screen
      navigation.navigate('MerchantItems');
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: 'Please try again later',
      });
    }
  };






  return (
    <View style={styles.merchantPostContainer}>
      <MerchantNavbar title="Create an Ad" />

      <KeyboardAwareScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.8} style={styles.uploadButton}>
              <UploadImgIcon width={30} height={30} />
              <Text style={styles.uploadText}>Upload an Ad Image</Text>
            </TouchableOpacity>

            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} resizeMode="cover" />
            ) : (
              <View style={styles.uploadedImage}></View>
            )}
          </View>

          <TextInput onChangeText={setTitle} value={title} style={styles.inputs} placeholder="Ad Title*" />
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Category*</Text>
            {console.log('Rendering dropdown with categories:', categories)}
            <DropDownInput 
              data={categories}
              value={selectedCategory}
              onChange={item => {
                console.log('Selected category:', item);
                setSelectedCategory(item.value);
                setSelectedCategoryName(item.label);
              }}
              placeholder="Select category"
              fontSize={Metrix.FontSmall}
              fontFamily={fonts.InterRegular}
            />
          </View>

          <TouchableOpacity activeOpacity={1} style={styles.fakeInputWrapper} onPress={() => inputRef.current?.focus()}>
            {description === '' ? (
              <View>
                <Text style={styles.label}>Describe Your Offerings</Text>
                <Text style={styles.placeholderLine}>1. Describe your ad,</Text>
                <Text style={styles.placeholderLine}>2. Website address if online</Text>
                <Text style={styles.placeholderLine}>3. Physical location of the store</Text>
              </View>
            ) : null}

            <TextInput
              ref={inputRef}
              style={[styles.hiddenTextInput, description !== '' && { color: 'black' }]}
              multiline
              value={description}
              onChangeText={setDescription}
              textAlignVertical="top"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Would you like to Add a Coupon with you Post?</Text>
          <Switch
            value={addCoupon}
            onValueChange={() => setAddCoupon(!addCoupon)}
            thumbColor={addCoupon ? "#F8443E" : "gray"}
            trackColor={{ false: '#ccc', true: 'gray' }}
          />
        </View>

        {addCoupon && (
          <View style={styles.couponSection}>
            <TextInput style={styles.inputs} placeholder='Coupon Title*' />
            <DropDownInput 
              placeholder={"Discount type"}
              data={discountTypes}
              value={discountType}
              onChange={item => {
                setDiscountType(item.value);
                // Reset values when type changes
                setPercentageValue('');
                setFixedValue('');
              }}
            />

            <View style={styles.percentageRow}>
              {discountType === 'PERCENTAGE' ? (
                <TextInput 
                  style={[styles.inputs, styles.flex1]} 
                  placeholder='Enter Percentage Value'
                  value={percentageValue}
                  onChangeText={(text) => {
                    // Only allow numbers and limit to 100
                    const numValue = text.replace(/[^0-9]/g, '');
                    if (numValue === '' || (parseInt(numValue) <= 100)) {
                      setPercentageValue(numValue);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={3}
                />
              ) : discountType === 'FIXED' ? (
                <TextInput 
                  style={[styles.inputs, styles.flex1]} 
                  placeholder='Fixed Amount Value'
                  value={fixedValue}
                  onChangeText={(text) => {
                    // Only allow numbers
                    const numValue = text.replace(/[^0-9]/g, '');
                    setFixedValue(numValue);
                  }}
                  keyboardType="numeric"
                />
              ) : (
                <View style={[styles.inputs, styles.flex1, { justifyContent: 'center', alignItems: 'center' }]}>
                  <Text style={{ color: '#6E6E6E' }}>Select discount type first</Text>
                </View>
              )}
            </View>

            <Text style={styles.offerText}>
              {discountType === 'PERCENTAGE' && percentageValue ? 
                `You are offering: ${percentageValue}% OFF with this ad` :
                discountType === 'FIXED' && fixedValue ?
                `You are offering: $${fixedValue} off with this Ad` :
                'Select discount type and enter value'
              }
            </Text>

            <View style={styles.redeemRow}>
              <Text style={styles.checkBoxText}>Redeem by</Text>

              <View style={styles.redeemOptions}>
                <TouchableOpacity
                  onPress={() => setCheckOnline(!checkOnline)}
                  activeOpacity={1}
                  style={styles.checkBoxWrapper}
                >
                  <View style={styles.checkBox} />
                  {checkOnline && (
                    <Icon name="check" size={25} color="black" style={styles.checkIcon} />
                  )}
                  <Text style={styles.checkBoxText}>Online</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCheckInStore(!checkInStore)}
                  activeOpacity={1}
                  style={styles.checkBoxWrapper}
                >
                  <View style={styles.checkBox} />
                  {checkInStore && (
                    <Icon name="check" size={25} color="black" style={styles.checkIcon} />
                  )}
                  <Text style={styles.checkBoxText}>In Store</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.redeemValueRow}>
              <Text style={styles.checkBoxText}>Redemption Value</Text>
              <View style={styles.redeemInputWrap}>
                <TextInput style={[styles.inputs, styles.redeemInput]}  keyboardType="numeric" />
                <Text style={styles.checkBoxText}>Points</Text>
              </View>
            </View>

            <TextInput 
              style={styles.inputs} 
              placeholder='Coupon Code'
              value={couponCode}
              onChangeText={(text) => setCouponCode(text.toUpperCase())}
              autoCapitalize="characters"
              maxLength={15}
            />
            <TouchableOpacity 
              style={styles.inputs} 
              onPress={() => setOpenDatePicker(true)}
            >
              <Text style={[styles.dateText, !expiryDate && { color: '#6E6E6E' }]}>
                {expiryDate ? expiryDate.toLocaleDateString() : 'Expiry Date'}
              </Text>
            </TouchableOpacity>
            <TextInput style={styles.inputs} placeholder='Disclaimer' />
          </View>
        )}

        <DatePicker
          modal
          open={openDatePicker}
          date={expiryDate}
          mode="date"
          minimumDate={new Date()}
          onConfirm={(date) => {
            setOpenDatePicker(false)
            setExpiryDate(date)
          }}
          onCancel={() => {
            setOpenDatePicker(false)
          }}
        />

        <View style={styles.buttonRow}>
          <CustomButton
            flex={1}
            title={"PREVIEW"}
            height={Metrix.VerticalSize(42)}
            borderRadius={4}
            color={colors.black}
            backgroundColor={colors.white}
            borderColor={"#D0D0D0"}
            fontSize={Metrix.FontSmall}
            borderWidth={1}
          onPress={() =>
              navigation.navigate("MerchantPreviewADScreen", {
                image,
                title,
                description,
                categoryName: selectedCategoryName,
                addCoupon,
                discountType,
                percentageValue,
                fixedValue,
                couponCode,
                redeemByOnline: checkOnline,
                redeemByInStore: checkInStore,
                expiryDate: expiryDate ? new Date(expiryDate).toISOString() : null,
              })
            }
          />
          <CustomButton flex={1} title={"PUBLISH"}
            height={Metrix.VerticalSize(42)}
            borderRadius={4}
            fontSize={Metrix.FontSmall}
            onPress={handlePublish} />
        </View>
      </KeyboardAwareScrollView>

    </View>
  );
}
