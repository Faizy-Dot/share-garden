import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles';
import { Metrix, Colors } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import CustomButton from '../../../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CameraIcon } from '../../../assets/svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../../../config/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../redux/Actions/authActions/loginAction';
import axiosInstance from '../../../config/axios';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-picker';

export default function MerchantProfile({ navigation }) {

    const { user } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    // State for form fields
    const [businessName, setBusinessName] = useState(user?.businessName || '');
    const [businessAddress, setBusinessAddress] = useState(user?.businessAddress || '');
    const [businessWebsite, setBusinessWebsite] = useState(user?.businessWebsite || '');
    const [businessPhone, setBusinessPhone] = useState(user?.businessPhone || '');
    const [profileImage, setProfileImage] = useState(user?.profileImage || null);
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const handleImagePick = async () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            includeBase64: false,
        };

        Alert.alert(
            'Select Image',
            'Choose an option to select a profile picture.',
            [
                {
                    text: 'Take Photo',
                    onPress: async () => {
                        try {
                            const result = await ImagePicker.launchCamera(options);
                            if (!result.didCancel && result.assets) {
                                handleImageUpload(result.assets[0]);
                            }
                        } catch (error) {
                            console.error('Camera error:', error);
                        }
                    },
                },
                {
                    text: 'Choose from Gallery',
                    onPress: async () => {
                        try {
                            const result = await ImagePicker.launchImageLibrary(options);
                            if (!result.didCancel && result.assets) {
                                handleImageUpload(result.assets[0]);
                            }
                        } catch (error) {
                            console.error('Gallery error:', error);
                        }
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );
    };

    const handleImageUpload = async (imageFile) => {
        setImageLoading(true);
        try {
            const formData = new FormData();
            formData.append('profileImage', {
                uri: imageFile.uri,
                type: imageFile.type || 'image/jpeg',
                name: imageFile.fileName || 'image.jpg',
            });

            const response = await axiosInstance.post(
                '/api/auth/upload-profile-image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                console.log("Profile image uploaded:", response.data.imageUrl);
                setProfileImage(response.data.imageUrl);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Profile image updated successfully',
                });
            }
        } catch (error) {
            console.error('Image upload error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to upload image',
            });
        } finally {
            setImageLoading(false);
        }
    };

    const handleSave = async () => {
        if (!businessName || !businessAddress) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Store name and address are required!',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.put('/api/auth/profile', {
                firstName: user.firstName,
                lastName: user.lastName,
                profileImage: profileImage || user.profileImage,
                businessName: businessName,
                businessAddress: businessAddress,
                businessWebsite: businessWebsite,
                businessPhone: businessPhone,
                phoneNumber: businessPhone, // Also update phone number
            });

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message || 'Profile updated successfully',
                });

                // Update Redux store
                const updatedUser = {
                    ...user,
                    businessName: businessName,
                    businessAddress: businessAddress,
                    businessWebsite: businessWebsite,
                    businessPhone: businessPhone,
                    profileImage: profileImage || user.profileImage,
                    phoneNumber: businessPhone,
                };
                dispatch(updateUserProfile(updatedUser));

                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Profile update error:', error.response?.data || error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.response?.data?.message || 'Error updating profile!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ gap: Metrix.VerticalSize(11) }}>
                    <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15) }}>
                        <BackArrowIcon />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: Metrix.HorizontalSize(18),
                        alignItems: "center"
                    }}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                        <CustomButton
                            width={Metrix.HorizontalSize(81)}
                            height={Metrix.VerticalSize(36)}
                            title={loading ? "Saving..." : "Save"}
                            borderRadius={Metrix.VerticalSize(4)}
                            onPress={handleSave}
                            disabled={loading}
                        />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        gap: Metrix.HorizontalSize(20),
                        paddingHorizontal: Metrix.HorizontalSize(20),
                        alignItems: "center"
                    }}>
                        <TouchableOpacity style={styles.imagePickerContainer} onPress={handleImagePick}>
                            <View style={styles.profileContainer}>
                                {
                                    profileImage ?
                                        <Image
                                            source={{ uri: profileImage }}
                                            style={styles.profileImage}
                                            resizeMode="cover"
                                        />
                                        :
                                        <Text style={styles.profileFistLetter}>
                                            {user?.firstName?.charAt(0).toUpperCase()}
                                        </Text>
                                }
                                <View style={styles.camerIconConatiner}>
                                    <CameraIcon />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{ gap: 10, flex: 1 }}>
                            <Text style={[styles.userName, { fontSize: Metrix.FontSmall }]}>Enter your Store Name*</Text>
                            <TextInput 
                                style={styles.inputs} 
                                value={businessName}
                                onChangeText={setBusinessName}
                                placeholder="Enter store name"
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: Metrix.VerticalSize(7), paddingHorizontal: Metrix.HorizontalSize(15) }}>
                        <Text style={{
                            fontSize: Metrix.normalize(8),
                            fontFamily: fonts.InterLight,
                        }}>JPG, JPEG, PNG Min: 400px, Max: 1024px</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(30) }}>
                    <View style={styles.topInputContainer}>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <View>
                                <Text style={styles.userName}>Store Address*</Text>
                                <Text style={[styles.userName, { fontFamily: fonts.InterRegular }]}>e.g "23 Ridge Way Plaza, Mississauga, ON"</Text>
                            </View>
                            <TextInput 
                                style={styles.inputs} 
                                value={businessAddress}
                                onChangeText={setBusinessAddress}
                                placeholder="Enter store address"
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>{"Website (if any)"}</Text>
                            <TextInput 
                                style={styles.inputs} 
                                value={businessWebsite}
                                onChangeText={setBusinessWebsite}
                                placeholder="https://www.yourstore.com"
                                keyboardType="url"
                            />
                        </View>

                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Email</Text>
                            <TextInput style={styles.inputs} value={user.email} editable={false} />
                            <Text style={{
                                fontSize: Metrix.FontSmall,
                                fontFamily: fonts.InterRegular
                            }}>
                                This email will be useful to keep in touch. we don't share your private email address with other SG users
                            </Text>
                        </View>

                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Phone Number</Text>
                            <TextInput 
                                style={styles.inputs} 
                                value={businessPhone}
                                onChangeText={setBusinessPhone}
                                placeholder="Enter phone number"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    <View style={[styles.borderLineContainer, { marginTop: Metrix.VerticalSize(30) }]}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.connectionContainer}>
                        <Text style={styles.contactInformationText}>Optional Information</Text>
                        <View style={styles.connectionBoxes}>
                            <View>
                                <CustomButton
                                    width={"100%"}
                                    height={Metrix.VerticalSize(40)}
                                    backgroundColor={Colors.white}
                                    borderColor={Colors.black}
                                    borderWidth={1}
                                    borderRadius={Metrix.VerticalSize(3)}
                                    icon={<Icon name="facebook" color="#1B70D4" style={styles.socialButtonIcon} />}
                                    title="Connect"
                                    color={Colors.black}
                                    fontSize={Metrix.FontSmall}
                                    fontFamily={fonts.InterBold}
                                />
                                <Text style={{
                                    fontSize: Metrix.FontExtraSmall,
                                    fontFamily: fonts.InterRegular,
                                    marginTop: Metrix.VerticalSize(5),
                                    flex: 1
                                }}>Sign in with Facebook and discover your trusted connections to buyers</Text>
                            </View>

                            <View>
                                <CustomButton
                                    width={"100%"}
                                    height={Metrix.VerticalSize(40)}
                                    backgroundColor={Colors.white}
                                    borderColor={Colors.black}
                                    borderWidth={1}
                                    borderRadius={Metrix.VerticalSize(3)}
                                    icon={<Icon name="google" color="#F8443E" style={styles.socialButtonIcon} />}
                                    title="Connect"
                                    color={Colors.black}
                                    fontSize={Metrix.FontSmall}
                                    fontFamily={fonts.InterBold}
                                />
                                <Text style={{
                                    fontSize: Metrix.FontExtraSmall,
                                    fontFamily: fonts.InterRegular,
                                    marginTop: Metrix.VerticalSize(5)
                                }}>Sign in with Gmail and discover your trusted connections to buyers</Text>
                            </View>

                            <View>
                                <CustomButton
                                    width={"100%"}
                                    height={Metrix.VerticalSize(40)}
                                    backgroundColor={Colors.white}
                                    borderColor={Colors.black}
                                    borderWidth={1}
                                    borderRadius={Metrix.VerticalSize(3)}
                                    icon={<Icon name="apple" color={Colors.black} style={styles.socialButtonIcon} />}
                                    title="Connect"
                                    color={Colors.black}
                                    fontSize={Metrix.FontSmall}
                                    fontFamily={fonts.InterBold}
                                />
                                <Text style={{
                                    fontSize: Metrix.FontExtraSmall,
                                    fontFamily: fonts.InterRegular,
                                    marginTop: Metrix.VerticalSize(5)
                                }}>Sign in with Apple and discover your trusted connections to buyers</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
