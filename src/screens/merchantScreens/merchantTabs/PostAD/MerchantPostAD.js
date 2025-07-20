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
import DropdownComponent from '../../../../components/dropDown/DropDownInput';
import fonts from '../../../../config/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from '../../../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import axiosInstance from '../../../../config/axios';

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

  const { user } = useSelector((state) => state.login)



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
  const inputRef = useRef(null);

  const navigation = useNavigation()


  const fetchCategories = async () => {
    try {
      const response = await Axios.get(
        'https://api.sharegarden.ca/api/categories/getCategories',
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const formattedCategories = response.data.map(cat => ({
        label: cat.name,
        value: cat.id,
        icon: cat.icon,
        slug: cat.slug,
        _count: cat._count
      }));

      setCategories(formattedCategories);



    } catch (error) {
      console.error('Error fetching categories:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load categories',
      });
    }
  };

  useEffect(() => { fetchCategories() }, [])

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

    try {

      const response = await axiosInstance.post(
        '/api/ads',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log( "response first api ==>>",response.data)

      if(response.status === 201){
       const responsePublish = await axiosInstance.patch(`api/ads/${response.data.id}/publish`)
      console.log("reponse from second api==>>",responsePublish.data)
      }


      Toast.show({
        type: 'success',
        text1: 'Ad Published',
        text2: 'Your ad has been successfully posted!',
      });

      // optionally reset form or navigate
      setTitle('');
      setDescription('');
      setImage(null);
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
          <DropdownComponent placeholder={"Select Category*"}
            data={categories}
            value={selectedCategory}
            onChange={item => {
              setSelectedCategory(item.value);
              setSelectedCategoryName(item.label);
            }} />

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
            <DropdownComponent placeholder={"Discount type"} />

            <View style={styles.percentageRow}>
              <TextInput style={[styles.inputs, styles.flex1]} placeholder='Enter Percentage Value' />
              <TextInput style={[styles.inputs, styles.flex1]} placeholder='Fixed Amount Value' />
            </View>

            <Text style={styles.offerText}>
              Your are offering: 30% OFF with this ad / Your are offering: $30 off with this Ad
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
                <TextInput style={[styles.inputs, styles.redeemInput]} />
                <Text style={styles.checkBoxText}>Points</Text>
              </View>
            </View>

            <TextInput style={styles.inputs} placeholder='Coupon Code' />
            <TextInput style={styles.inputs} placeholder='Expiry Date' />
            <TextInput style={styles.inputs} placeholder='Disclaimer' />
          </View>
        )}

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
                image: image,
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
