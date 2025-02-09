import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, PermissionsAndroid, Platform, Modal } from 'react-native';
import styles from './styles';
import { Colors, Images, Metrix } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios';
import fonts from '../../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { updateUserProfile } from '../../../redux/Actions/authActions/loginAction';
import Icon from 'react-native-vector-icons/FontAwesome';


var baseUrl = 'https://api.sharegarden.ca';


export default function EditProfile({ navigation }) {
    const { user } = useSelector((state) => state.login);
    const [fname, setFname] = useState(user?.firstName);
    const [lname, setLname] = useState(user?.lastName);
    const [about, setAbout] = useState(user?.about || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [gender, setGender] = useState(user?.gender);
    const [imageUri, setImageUri] = useState(null);
    const [date, setDate] = useState(new Date()); // Current date
    const [formattedDate, setFormattedDate] = useState(user?.dateOfBirth);
    const [open, setOpen] = useState(false); // Modal visibility
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const config = {
        headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }
    }

    console.log("user from edit profile==>>>", user.token)


    const handleSubmit = async () => {
        if (!fname || !lname || !phoneNumber) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Some fields are required!',
            });
            return;
        }
        setLoading(true)
        try {
            const response = await Axios.put(
                `${baseUrl}/api/auth/profile`,
                {
                    firstName: fname,
                    lastName: lname,
                    profileImage: imageUri ? imageUri : user.profileImage,
                    about,
                    gender: gender,
                    dateOfBirth: formattedDate,
                    phoneNumber: phoneNumber,
                    // email: user.emailaddress,
                    // userId: user.userid,
                },
                config
            );


            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message,
                });
                const updatedUser = {
                    ...user,
                    firstName: fname,
                    lastName: lname,
                    profileImage: imageUri ? imageUri : user.profileImage,
                    about,
                    phoneNumber,
                };
                dispatch(updateUserProfile(updatedUser));
                navigation.navigate('Profile');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error(error.response?.status, error.response?.data);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error updating profile!',
            });
        } finally {
            setLoading(false)
        }
    };



    const data = [
        { label: 'Male', value: 0 },
        { label: 'Female', value: 1 },

    ];

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };



    const handleConfirm = (selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
        const formatted = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        setFormattedDate(formatted);
    };


    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera to take photos.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
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
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        // Show action sheet with options
        Alert.alert(
            'Select Image',
            'Choose an option to select a profile picture.',
            [
                {
                    text: 'Camera',
                    onPress: async () => {
                        const hasPermission = await requestCameraPermission();
                        if (hasPermission) {
                            openCamera();
                        } else {
                            Alert.alert('Permission Denied', 'Camera permission is required.');
                        }
                    },
                },
                { text: 'Gallery', onPress: openGallery },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true },
        );
    };

    const openCamera = () => {
        launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorCode) {
                console.log('Camera error: ', response.errorMessage);
            } else {
                uploadProfileImage(response.assets[0])
            }
        });
    };

    const openGallery = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled gallery');
            } else if (response.errorCode) {
                console.log('Gallery error: ', response.errorMessage);
            } else {
                uploadProfileImage(response.assets[0])
            }
        });
    };


    const uploadProfileImage = async (selectedFile) => {
        const file = new FormData();
        file.append('profileImage', {
            uri: selectedFile.uri,
            type: selectedFile.type || 'image/jpeg',
            name: selectedFile.fileName || 'uploaded_image.jpg',
        });

        console.log("file=>>>", file)

        try {
            const response = await Axios.post(`${baseUrl}/api/auth/upload-profile-image`, file, {
                headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                setImageUri(response.data.imageUrl);
                Toast.show({
                    type: 'success',
                    text1: response.data.message,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: response.data.message,
                });
            }
        } catch (error) {
            console.error('Error uploading profile image:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error uploading profile image.',
            });
        }
    };

    // console.log("image====>>" , imageUri)


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ gap: Metrix.VerticalSize(11) }}>
                    <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15), }}>
                        <BackArrowIcon />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Metrix.HorizontalSize(18), alignItems: "center" }}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                        <CustomButton width={Metrix.HorizontalSize(81)}
                            height={Metrix.VerticalSize(36)}
                            title={loading ? "Save..." : "Save"}
                            borderRadius={Metrix.VerticalSize(4)}
                            onPress={handleSubmit} />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        gap: Metrix.HorizontalSize(20), paddingHorizontal: Metrix.HorizontalSize(20),
                        alignItems: "center"
                    }}>
                        <TouchableOpacity activeOpacity={0.8} style={styles.profileContainer} onPress={handleImagePicker}>
                            {
                                user.profileImage ?
                                    <Image source={{ uri:imageUri ? imageUri :  user.profileImage }} style={styles.profileImage} />
                                    :
                                    <Icon name="user-circle" size={Metrix.HorizontalSize(80)} color="#ccc" />

                            }
                            <View style={styles.cameraPicker}>
                                <Image source={Images.cameraIcon} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ gap: 10, flex: 1 }}>
                            <Text style={[styles.userName, { fontSize: Metrix.FontExtraLarge, }]}>{user?.firstName + " " + user?.lastName}</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: Metrix.VerticalSize(7),
                        paddingHorizontal: Metrix.HorizontalSize(15)
                    }}>
                        <Text style={{
                            fontSize: Metrix.normalize(8),
                            fontFamily: fonts.InterLight,
                        }}>JPG, JPEG, PNG Min: 400px, Max: 1024px</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(30) }}>

                    <View style={styles.topInputContainer}>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>First Name</Text>
                            <TextInput style={styles.inputs}
                                value={fname}
                                onChangeText={setFname} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Last Name</Text>
                            <TextInput style={styles.inputs}
                                onChangeText={setLname}
                                value={lname} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Something about you</Text>
                            <TextInput style={styles.inputs}
                                onChangeText={setAbout}
                                value={about} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Gender</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                renderItem={renderItem}
                                onChange={item => {
                                    setGender(item.value);
                                }}
                                value={gender}
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Date of birth</Text>
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <TextInput
                                    style={[styles.inputs]}
                                    placeholder="YYYY-MM-DD"
                                    value={formattedDate}
                                    editable={false} // Prevent manual input
                                />
                            </TouchableOpacity>

                            {/* Date Picker Modal */}
                            <Modal transparent={true} visible={open} animationType="slide">
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                                    <DatePicker
                                        date={date}
                                        mode="date"
                                        onDateChange={setDate}
                                        onConfirm={handleConfirm}
                                        onCancel={() => setOpen(false)}
                                        maximumDate={new Date()}
                                        textColor={colors.white}

                                    />
                                    <CustomButton title={"X"}
                                        onPress={() => handleConfirm(date)} />
                                </View>
                            </Modal>
                        </View>
                    </View>

                    <View style={styles.borderLineContainer}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.bottomInputContainer}>
                        <Text style={styles.contactInformationText}>Contact Information</Text>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Phone Number</Text>
                            <TextInput style={styles.inputs}
                                keyboardType="numeric" // Opens a numeric keypad
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9]/g, '');
                                    setPhoneNumber("+" + numericValue);
                                }}
                                value={phoneNumber} />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>This is the number of buyers, reminder, and other notification.</Text>
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Email</Text>
                            <TextInput style={styles.inputs}
                                value={user?.email}
                                editable={false}
                                selectTextOnFocus={false}
                                disableFullscreenUI={true}
                            />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>This email will be useful to keep in touch. we dont share your private email address with other SG users</Text>
                        </View>

                    </View>

                    <View style={[styles.borderLineContainer, { marginTop: Metrix.VerticalSize(30) }]}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.connectionContainer}>
                        <Text style={styles.contactInformationText}>Optional Information</Text>
                        <View style={styles.connectionBoxes}>
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="facebook" color="#1B70D4" style={styles.socialButtonIcon} />}
                                    title={"Disconnect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5), flex: 1 }}>Sign in with Facebook and discover your trusted connections to buyers</Text>
                            </View>
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="google" color="#F8443E" style={styles.socialButtonIcon} />}
                                    title={"Connect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5) }}>Sign in with Gmail and discover your trusted connections to buyers</Text>
                            </View>
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="apple" color={colors.black} style={styles.socialButtonIcon} />}
                                    title={"Connect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5) }}>Sign in with Apple and discover your trusted connections
                                    to buyers</Text>
                            </View>
                        </View>

                    </View>


                </KeyboardAwareScrollView>



            </View>


        </View>
    );
}

